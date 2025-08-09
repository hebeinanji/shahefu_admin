<script>
import { darkTheme, lightTheme, zhCN,dateZhCN } from 'naive-ui'
import { NConfigProvider } from 'naive-ui'
import Nav from './components/Nav.vue';
import { useRouter } from 'vue-router'
import {h} from "vue";
export default {
  components: {
    zhCN,
    dateZhCN,
    NConfigProvider,
    Nav,
  },
  data() {
    return {
      collapsed:true,
      isDark: localStorage.getItem("isDark") === "true",
      route:useRouter(),
      menuOptions : [
        { label: '首页', key: '/',href: '/' },
        { label: '域名列表', key: '/domain',href: '/domain'   },
        { label: '证书列表', key: '/ssl',href: '/ssl'   },
        { label: '菜谱列表', key: '/recipe',href: '/recipe'   },
      ]
    }
  },
  computed: {
    zhCN() {
      return zhCN
    },
    theme() {
      return this.isDark ? darkTheme : lightTheme
    },
  },
  created()
  {
  },
  mounted() {
  },
  methods: {
    handleMenuClick(key) {
      this.route.push(key)
    },
    dateZhCN() {
      return dateZhCN
    },
    changeTheme(isDark) {
      localStorage.setItem("isDark", isDark);
      this.isDark = isDark;
    },
    renderMenuLabel(option) {
      if ('href' in option) {
        return h(
          'a',
          { href: option.href, target: '_self' },
          option.label,
      )
      }
      return option.label
    }
  }
}
</script>

<template>
  <n-config-provider class="m0" :theme="theme" :locale="zhCN">
    <n-message-provider>
      <n-layout position="absolute">
        <n-layout-header
          bordered
          style="height: 100px; padding: 0 0; background-color: #fff;"
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
                :render-label="renderMenuLabel"
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