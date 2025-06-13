<script setup>
import { NConfigProvider, NMessageProvider, darkTheme } from 'naive-ui'
import DefaultLayout from './layouts/DefaultLayout.vue'
import { ref, watchEffect } from 'vue'

const isDark = ref(localStorage.getItem('theme'))

// 自动保存到 localStorage
watchEffect(() => {
  localStorage.setItem('theme', isDark)
})

// 主题自定义（可省略）
const themeOverrides = {
  common: {
    primaryColor: '#18a058'
  }
}
</script>

<template>
  <n-config-provider class="m0" :theme="isDark ? darkTheme : null" :theme-overrides="themeOverrides">
    <n-message-provider>
      <DefaultLayout class="full-width-container" :is-dark-ref="isDark" @toggle-theme="() => (isDark=!isDark)" />
    </n-message-provider>
  </n-config-provider>
</template>


<style scoped>
.full-width-container {
  margin: 0;
  margin-top: 0;
  width: 100vw; /* 占满视口宽度 */
  max-width: 100vw;
  overflow-x: hidden; /* 可选：防止横向滚动条 */
}
</style>