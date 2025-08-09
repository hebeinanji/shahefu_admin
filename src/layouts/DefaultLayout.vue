<script setup>
import {
  NLayout,
  NLayoutSider,
  NMenu,
  NLayoutHeader,
  NLayoutContent,
  darkTheme,
  lightTheme,
  zhCN,dateZhCN,
  NButton,
  NIcon
} from 'naive-ui'
import { useRouter, RouterView } from 'vue-router'
import { ref } from 'vue'
import Nav from '../components/Nav.vue';
import { Moon, Sun } from '@vicons/fa'

const emit = defineEmits(['change-theme'])

const collapsed = ref(false)
let isDark = ref(true)
const router = useRouter()

const menuOptions = [
  { label: '首页', key: '/',href: '/' },
  { label: '关于', key: '/about',href: '/about' },
  { label: '域名列表', key: '/domain',href: '/domain' },
  { label: '证书列表', key: '/ssl',href: '/ssl' },
  { label: '菜谱列表', key: '/recipe',href: '/recipe' },
]

function changeTheme(dark) {
  localStorage.setItem("isDark", dark);
  isDark = dark;
}

</script>

<template>
  <n-layout position="absolute">
    <n-layout-header
      bordered
      style="height: 64px; padding: 0 24px; background-color: #fff;"
      position="absolute">
      <Nav :isDark="isDark" @change-theme="changeTheme" />
    </n-layout-header>
    <n-layout-content
      position="absolute"
      style="top: 64px; bottom: 0; background-color: #f5f5f5;">

      <n-layout has-sider>
        <n-layout-sider
          bordered
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          :collapsed="collapsed"
          show-trigger
          @collapse="collapsed = true"
          @expand="collapsed = false"
        >
          <n-menu
            :collapsed="collapsed"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuOptions"
          />
        </n-layout-sider>
        <n-layout>
          <router-view v-slot="{ Component }">
              <component :is="Component" />
          </router-view>
        </n-layout>
      </n-layout>
    </n-layout-content>
  </n-layout>
</template>

<style scoped>
</style>