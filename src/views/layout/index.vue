<script setup lang="ts">
import type { Component } from 'vue'
import { h, onBeforeMount, ref, watch } from 'vue'
import { NAvatar, NDropdown, NIcon, NMenu, useMessage } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import {
  Build,
  BulbOutline,
  ChatboxEllipsesOutline,
  ColorWandSharp,
  LanguageOutline,
  LogOutOutline,
} from '@vicons/ionicons5'
import { RouterLink, useRouter } from 'vue-router'
import type { UserInfo } from '@/store/modules/user/helper'
import { t } from '@/locales'

import { useUserStore } from '@/store'

const userStore = useUserStore()
const ms = useMessage()

const router = useRouter()

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const activeKey = ref<string>('chat')

const options = [{
  label: '退出登录',
  key: 'logout',
  icon: renderIcon(LogOutOutline),
}]

// function updateActiveKeyByRouter() {
//   const { name } = useRouter().currentRoute.value
//   if (name)
//     activeKey.value = name
// }

onBeforeMount(() => {
  const { userInfo } = userStore
  const { name, token, password } = userInfo
  const flag = name && (password || token)
  if (!flag)
    router.push({ name: 'Login' })
})

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
            params: {},
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
            name: 'DevelopmentAssistance',
            params: {},
          },
        },
        { default: () => '程序猿专用' },
      ),
    key: 'DevelopmentAssistance',
    icon: renderIcon(BulbOutline),
  },
  {
    label: '工具',
    key: 'Tools',
    icon: renderIcon(Build),
    children: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: 'CodeTransform',
                params: {},
              },
            },
            { default: () => '代码转换' },
          ),
        key: 'CodeTransform',
        icon: renderIcon(ColorWandSharp),
      }, {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: 'LangTransform',
                params: {},
              },
            },
            { default: () => '翻译' },
          ),
        key: 'LangTransform',
        icon: renderIcon(LanguageOutline),
      },
    ],
  },
]

function updateUserInfo(options: Partial<UserInfo>) {
  userStore.updateUserInfo(options)
  ms.success(t('common.success'))
}

function handleSelect(key: string) {
  switch (key) {
    case 'logout':
      updateUserInfo({
        name: '',
        password: '',
      })
      router.push({ name: 'Login' })
      break
  }
}
</script>

<template>
  <div class="p-1.5 shadow flex justify-between items-center">
    <NMenu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
    <div class="flex align-center justify-center mr-4 cursor-pointer">
      <NDropdown :options="options" @select="handleSelect">
        <NAvatar size="medium" round src="https://avatars.githubusercontent.com/u/17662844?v=4" />
      </NDropdown>
    </div>
  </div>
</template>
