<script setup lang="ts">
import { NButton, NGradientText, NInput, NInputGroup, NInputGroupLabel } from 'naive-ui'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const value = ref('QianYongKang')
const loading = ref(false)

function goChat() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    router.push({
      path: '/chat',
    })
  }, 400)
}
</script>

<template>
  <div class="h-full login-main">
    <div class="h-full ml-[60%] flex justify-center items-center flex-col">
      <div class="flex items-center mb-4">
        <img class="h-12 w-12" src="/favicon.svg">
        <NGradientText class="text-[32px] ml-4" type="info">
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
            v-model:value="value" size="large" type="password" placeholder="请输入密码"
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
