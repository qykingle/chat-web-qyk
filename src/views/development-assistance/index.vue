<script setup lang="ts">
import { NAvatar, NEllipsis, NInput, NModal, useMessage } from 'naive-ui'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useChatStore } from '@/store'
import { toolConfig } from '@/constants'
const message = useMessage()
const showModal = ref(false)
const value = ref('')
const selectedItem = ref({} as SQLQueryDefinition)
const chatStore = useChatStore()

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
</script>

<template>
  <div class="p-16 flex flex-wrap justify-center">
    <div v-for="item in toolConfig" :key="item.id" class="flex p-4 border rounded-lg m-3  items-center w-[400px] cursor-pointer" @click="() => handleClick(item)">
      <NAvatar
        round
        :size="100"
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

</style>
