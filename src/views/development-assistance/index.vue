<script setup lang="ts">
import { NAvatar, NDivider, NEllipsis, NInput, NModal, NTag, useMessage } from 'naive-ui'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useChatStore } from '@/store'
import type { ITagTool } from '@/constants'
import { otherTools, toolConfig } from '@/constants'
const message = useMessage()
const showModal = ref(false)
const value = ref('')
const selectedItem = ref({} as SQLQueryDefinition)
const chatStore = useChatStore()

const tageType = ['default', 'primary', 'info', 'success', 'warning', 'error']

// 生成一个start到end之间的随机整数
function random(start: number, end: number) {
  return Math.floor(Math.random() * (end - start) + start)
}

const router = useRouter()

interface SQLQueryInput {
  key: string
  placeholder: string
  title: string
  type: string
}

interface SQLQueryDefinition {
  desc: string
  example: string
  icon: string
  id: string
  input: SQLQueryInput[]
  prompt: string
  text: string
  type: number
}

const handleClick = (item: SQLQueryDefinition) => {
  selectedItem.value = item

  showModal.value = true
}

function onNegativeClick() {
  message.success('Cancel')
  showModal.value = false
}
function onPositiveClick() {
  const text = selectedItem.value.prompt.replace(`${selectedItem.value?.input?.[0]?.key}`, value.value)
  router.push({
    name: 'Chat',
    params: { uuid: chatStore.active },
    query: {
      text,
    },
  })
  showModal.value = false
}

const title = computed(() => {
  return selectedItem?.value?.input?.[0]?.title || ''
})

const placeholder = computed(() => {
  return selectedItem?.value?.input?.[0]?.placeholder || ''
})
const handleTagClick = (tag: ITagTool) => {
  // windows.open(tag.url)
  window.open(tag.url, '_blank')
}
</script>

<template>
  <div class="p-16 flex flex-wrap ">
    <div v-for="item in toolConfig" :key="item.id" class="flex p-4 border rounded-lg m-3  items-center w-[450px] cursor-pointer" @click="() => handleClick(item)">
      <NAvatar
        round
        :size="120"
        :src="item.icon"
      />
      <div class="pl-4">
        <div class="font-bold text-xl">
          {{ item.text }}
        </div>
        <NEllipsis class="text-gray-400 mt-4" :line-clamp="1">
          {{ item.desc }}
        </NEllipsis>
      </div>
    </div>
  </div>
  <NDivider />
  <div class="pl-10 pr-10 flex flex-wrap">
    <div v-for="(item) in otherTools" :key="item.id" class="cursor-pointer">
      <NTag class="m-2 tag-text" :type="tageType[random(0, 6)]" size="large" @click="() => handleTagClick(item)">
        {{ item.text }}
      </NTag>
    </div>
  </div>
  <NModal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    :title="title"
    positive-text="确认"
    @positive-click="onPositiveClick"
    @negative-click="onNegativeClick"
  >
    <NInput
      v-model:value="value"
      class="h-[130px]"
      type="textarea"
      :placeholder="placeholder"
      clearable
    />
    <div class="p-3">
      {{ selectedItem.example }}
    </div>
  </NModal>
</template>

<style scoped>
.tag-text {
	cursor: pointer;
}
</style>
