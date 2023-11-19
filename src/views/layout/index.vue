<script setup lang="ts">
import type { Component } from 'vue'
import { h, ref, watch } from 'vue'
import { NAvatar, NIcon, NMenu } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import {
  ChatboxEllipsesOutline,
  ColorPaletteOutline,
  ColorWandSharp,
} from '@vicons/ionicons5'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const activeKey = ref<string>('chat')

// function updateActiveKeyByRouter() {
//   const { name } = useRouter().currentRoute.value
//   if (name)
//     activeKey.value = name
// }

watch(
  () => router.currentRoute.value.name,
  (value) => {
    activeKey.value = value
  },
  { immediate: true },
)

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'Chat',
            params: {
            },
          },
        },
        { default: () => '聊天' },
      ),
    key: 'Chat',
    icon: renderIcon(ChatboxEllipsesOutline),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'Draw',
            params: {
            },
          },
        },
        { default: () => '画图' },
      ),
    key: 'Draw',
    icon: renderIcon(ColorPaletteOutline),
  },
  {
    label: '工具',
    key: 'Tools',
    icon: renderIcon(ColorWandSharp),
  },
]
</script>

<template>
  <div class="p-1.5 shadow flex justify-between items-center">
    <NMenu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
    <div class="flex align-center mr-4">
      <NAvatar size="small" round src="https://avatars.githubusercontent.com/u/17662844?v=4" />
    </div>
  </div>
</template>
