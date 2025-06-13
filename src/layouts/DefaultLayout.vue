<script setup>
import {
  NLayout,
  NLayoutSider,
  NMenu,
  NLayoutHeader,
  NLayoutContent,
  NButton,
  NIcon
} from 'naive-ui'
import { useRouter, RouterView } from 'vue-router'
import { ref } from 'vue'
import { Moon, Sun } from '@vicons/fa'

const props = defineProps({
  isDarkRef: {
    type: Boolean,
    required: true
  }
})
const emit = defineEmits(['toggle-theme'])

const collapsed = ref(false)
const router = useRouter()

const menuOptions = [
  { label: '首页', key: '/' },
  { label: '关于', key: '/about' },
  { label: '域名列表', key: '/domain' },
  { label: '证书列表', key: '/ssl' }
]

function handleMenuClick(key) {
  router.push(key)
}
</script>

<template>
  <n-layout has-sider>
    <!-- 左侧菜单栏 -->
    <n-layout-sider :collapsed="collapsed" collapse-mode="width" :width="200" show-trigger>
      <n-menu
        :options="menuOptions"
        :collapsed="collapsed"
        :default-value="router.currentRoute.value.path"
        @update:value="handleMenuClick"
      />
    </n-layout-sider>

    <!-- 主区域 -->
    <n-layout>
      <n-layout-header
        style="
          height: 64px;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--n-border-color);
        "
      >
        <div style="display: flex; align-items: center; gap: 10px;">
          <h2 style="margin: 0;">管理后台</h2>
          <n-button tertiary size="tiny" @click="collapsed = !collapsed">
            {{ collapsed ? '展开菜单' : '收起菜单' }}
          </n-button>
        </div>

        <n-button text @click="emit('toggle-theme')">
          <n-icon size="20">
            <component :is="props.isDarkRef ? Moon:Sun" />
          </n-icon>
        </n-button>
      </n-layout-header>

      <n-layout-content style="padding: 20px;">
        <RouterView/>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style scoped>
h2 {
  color: var(--n-text-color);
}
.full-width-container {
  width: 100vw; /* 占满视口宽度 */
  max-width: 100vw;
  overflow-x: hidden; /* 可选：防止横向滚动条 */
}
</style>