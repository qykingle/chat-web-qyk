<script setup lang="ts">
import { NButton, NGradientText, NInput, NInputGroup, NInputGroupLabel, useMessage } from 'naive-ui'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { UserInfo } from '@/store/modules/user/helper'
import { t } from '@/locales'
import { useUserStore } from '@/store'

const router = useRouter()
const userStore = useUserStore()
const ms = useMessage()

const value = ref('QianYongKang')
const password = ref('')
const loading = ref(false)

function goChat() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    const isValidPassword = (/^[A-Za-z0-9\-]+$/).test(password.value)
    if (!isValidPassword) {
      ms.error(t('common.passwordError'))
      return
    }
    updateUserInfo({
      name: value.value,
      password: password.value,
    })
    router.push({
      path: '/chat',
    })
  }, 400)
}

function updateUserInfo(options: Partial<UserInfo>) {
  userStore.updateUserInfo(options)
  ms.success(t('common.success'))
}
</script>

<template>
  <div class="h-full login-main">
    <div class="h-full ml-[60%] flex justify-center items-center flex-col">
      <div class="flex items-center mb-4">
        <img class="h-12 w-12" src="/favicon.svg">
        <NGradientText
          class="text-[32px] ml-4" :gradient="{
            from: 'rgb(85, 85, 85)',
            to: 'rgb(170, 170, 170)',
          }"
        >
          登录
        </NGradientText>
      </div>
      <div class="w-[60%]">
        <NInputGroup>
          <NInputGroupLabel size="large">
            用户
          </NInputGroupLabel>
          <NInput v-model:value="value" size="large" placeholder="请输入用户名" />
        </NInputGroup>
        <NInputGroup class="mt-4 mb-4">
          <NInputGroupLabel size="large">
            密码
          </NInputGroupLabel>
          <NInput
            v-model:value="password" size="large" type="password" placeholder="请输入OpenAI API Key"
            show-password-on="mousedown"
          />
        </NInputGroup>
        <NButton :loading="loading" size="large" class="button" type="primary" @click="goChat">
          登录
        </NButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-main {
	background: url("/login.svg") no-repeat left center;
}

.button {
	width: 100% !important;
}
</style>
