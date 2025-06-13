<template>
  <div class="login-container">
    <h2>登录</h2>
    <input v-model="username" placeholder="用户名" />
    <input v-model="password" type="password" placeholder="密码" />
    <button @click="login">登录</button>
  </div>
</template>

<script setup>
import { useMessage } from 'naive-ui'
window.$message = useMessage()
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const username = ref('')
const password = ref('')

function login() {
  // 模拟登录校验
  if (username.value && password.value) {
    localStorage.setItem('token', 'your-mock-token')
    router.push('/') // 登录后跳转主页
  } else {
    window.$message.error('请输入用户名和密码')
  }
}
</script>