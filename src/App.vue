<script setup lang="ts">
import { NConfigProvider } from 'naive-ui'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import Layout from './views/layout/index.vue'
import { NaiveProvider } from '@/components/common'
import { useTheme } from '@/hooks/useTheme'
import { useLanguage } from '@/hooks/useLanguage'
import { useUserStore } from '@/store'

const {
  theme,
  themeOverrides,
} = useTheme()
const { language } = useLanguage()
const router = useRouter()
const userStore = useUserStore()
router.beforeEach((to, from, next) => {
  if (to.name === 'Login') {
    next()
  }
  else {
    const { userInfo } = userStore
    const { name, token, password } = userInfo
    const flag = name && (password || token)
    if (flag) {
      next()
    }
    else {
      next({
        name: 'Login',
      })
    }
  }
})
const isLogin = computed(() => router.currentRoute.value.name === 'Login')
</script>

<template>
  <NConfigProvider
    class="h-full"
    :theme="theme"
    :theme-overrides="themeOverrides"
    :locale="language"
  >
    <NaiveProvider>
      <Layout v-if="!isLogin" />
      <RouterView />
    </NaiveProvider>
  </NConfigProvider>
</template>
