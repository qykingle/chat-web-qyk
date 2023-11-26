<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { NButton, NSelect, useMessage } from 'naive-ui'
import { copyToClip } from '@/utils/copy'
import { createPrompt } from '@/utils/utils'
import { fetchChatAPIProcess } from '@/api'
import { useUserStore } from '@/store'
import { languages } from '@/constants'

const transformFromCode = ref('const a = 1;')
const transformToCode = ref('')
const transformFrom = ref('JavaScript')
const transformTo = ref('TypeScript')

const options = languages

const extensions = [javascript(), oneDark]
const message = useMessage()
const loading = ref(false)

// Codemirror EditorView instance ref
const view = shallowRef()

const userStore = useUserStore()

// Status is available at all times via Codemirror EditorView

const fetchChatAPIOnce = async (prompt: string) => {
  const controller = new AbortController()
  await fetchChatAPIProcess<Chat.ConversationResponse>({
    prompt,
    options: {},
    openAPIKey: userStore.userInfo.password,
    signal: controller.signal,
    onDownloadProgress: ({ event }) => {
      const xhr = event.target
      const { responseText } = xhr
      // Always process the final line
      const lastIndex = responseText.lastIndexOf('\n', responseText.length - 2)
      let chunk = responseText
      if (lastIndex !== -1)
        chunk = responseText.substring(lastIndex)

      try {
        const data = JSON.parse(chunk)
        if (data.text)
          transformToCode.value = data.text
      }
      catch (error) {
        message.error('转换失败。')
      }
    },
  })
}

const handleTransform = async () => {
  const maxCodeLength = 6000
  const inputLanguage = transformFrom.value
  const outputLanguage = transformTo.value
  const from = transformFromCode.value
  const to = transformToCode.value

  if (inputLanguage === outputLanguage) {
    message.info('请选择不同的语言进行转换。')
    return
  }
  if (!from) {
    message.info('请输入代码。')
    return
  }

  if (from.length > maxCodeLength) {
    message.info(`代码长度不能超过 ${maxCodeLength}。您的代码长度为 ${from.length}。`)
    return
  }

  loading.value = true
  transformToCode.value = ''

  const prompt = createPrompt(inputLanguage, outputLanguage, from)
  await fetchChatAPIOnce(prompt).catch(() => {
    message.error('转换失败。')
  })
  // await fetchChatAPI(body)
  loading.value = false
}

const handleCopy = () => {
  copyToClip(transformToCode.value)
  message.success('复制成功')
}
</script>

<template>
  <div class="mt-10 flex flex-col items-center justify-center sm:mt-20">
    <div class="flex flex-col text-4xl font-bold">
      <div class="mb-4">
        AI Code Translator
      </div>
      <NButton :loading="loading" :on-click="handleTransform" class="w-10" size="large" type="primary">
        开始转换
      </NButton>
    </div>
    <div class="w-[80%] flex">
      <div class="w-[50%]">
        <div class="text-center text-xl font-bold">
          Input
        </div>
        <NSelect v-model:value="transformFrom" filterable class="mb-4 mt-4" :options="options" />
        <Codemirror
          v-model="transformFromCode"
          placeholder="Code goes here..."
          :style="{ height: '600px' }"
          :autofocus="true"
          :indent-with-tab="true"
          :tab-size="2"
          :extensions="extensions"
        />
      </div>
      <div class="w-[50%] ml-4">
        <div class="text-center text-xl font-bold">
          Output
        </div>
        <NSelect v-model:value="transformTo" filterable class="mb-4 mt-4" :options="options" />
        <div class="relative">
          <div
            class="absolute right-0 top-0 z-30"
          >
            <NButton
              :disabled="!transformToCode"
              size="small"
              type="info"
              :on-click="handleCopy"
            >
              复制
            </NButton>
          </div>
          <Codemirror
            v-model="transformToCode"
            placeholder="代码输出..."
            :style="{ height: '600px' }"
            :autofocus="false"
            :indent-with-tab="true"
            :tab-size="2"
            :extensions="extensions"
          />
        </div>
      </div>
    </div>
  </div>
</template>
