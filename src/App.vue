<script>
import { darkTheme, lightTheme, zhCN, dateZhCN, NIcon } from 'naive-ui'
import { NConfigProvider } from 'naive-ui'
import Nav from './components/Nav.vue';
import { useRouter,RouterLink } from 'vue-router'
import {h} from "vue";
import { Home16Regular,PersonFeedback24Regular,Book24Regular,Beach20Filled} from '@vicons/fluent'
import { IosNavigate} from '@vicons/ionicons4'
import { DomainFilled,AdminPanelSettingsOutlined,SupervisedUserCircleSharp} from '@vicons/material'
import LoginView from '@/views/LoginView.vue'
export default {
  components: {
    LoginView,
    zhCN,
    dateZhCN,
    NConfigProvider,
    Nav,
  },
  data() {
   function renderIcon(icon) {
      return () => h(NIcon, null, { default: () => h(icon) });
    }
    return {
      collapsed:false,
      isDark: localStorage.getItem("isDark") === "true",
      route:useRouter(),
      menuOptions : [
        {
          label: () => h(
            RouterLink,
            {
              to: {
                name: "home",
                params: {
                }
              }
            },
            { default: () => "数据总揽" }
          ),
          key: "go-back-home",
          icon: renderIcon(Home16Regular)
        },
        {
          label: () => h(
            RouterLink,
            {
              to: {
                name: "domain",
                params: {
                }
              }
            },
            { default: () => "域名列表" }
          ),
          key: "domain",
          icon: renderIcon(DomainFilled)
        },
        {
          label: () => h(
            RouterLink,
            {
              to: {
                name: "holiday",
                params: {
                }
              }
            },
            { default: () => "节假日列表" }
          ),
          key: "holiday",
          icon: renderIcon(Beach20Filled)
        },
        {
          label: () => h(
            RouterLink,
            {
              to: {
                name: "recipe",
                params: {
                }
              }
            },
            { default: () => "菜谱列表" }
          ),
          key: "recipe",
          icon: renderIcon(Book24Regular)
        },
        {
          label: () => h(
            RouterLink,
            {
              to: {
                name: "feedback",
                params: {
                }
              }
            },
            { default: () => "反馈列表" }
          ),
          key: "feedback",
          icon: renderIcon(PersonFeedback24Regular)
        },
        {
          label: () => h(
            RouterLink,
            {
              to: {
                name: "user_admin",
                params: {
                }
              }
            },
            { default: () => "管理员列表" }
          ),
          key: "user_admin",
          icon: renderIcon(AdminPanelSettingsOutlined)
        },
        {
          label: () => h(
            RouterLink,
            {
              to: {
                name: "user",
                params: {
                }
              }
            },
            { default: () => "用户列表" }
          ),
          key: "user",
          icon: renderIcon(SupervisedUserCircleSharp)
        },
        {
          label: () => h(
            RouterLink,
            {
              to: {
                name: "nav_site",
                params: {
                }
              }
            },
            { default: () => "站内导航" }
          ),
          key: "nav_site",
          icon: renderIcon(IosNavigate)
        }
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
    curRoute() {
      return this.$route
    }
  },
  created()
  {
  },
  mounted() {
  },
  methods: {
    changeTheme(isDark) {
      localStorage.setItem("isDark", isDark);
      this.isDark = isDark;
    },
  }
}
</script>

<template>
  <n-config-provider class="m0" :theme="theme" :locale="zhCN">
    <n-message-provider>
      <n-dialog-provider>
      <n-layout v-if="curRoute.name !== 'login'" position="absolute">
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
              :width="160"
              :collapsed="collapsed"
              show-trigger
              @collapse="collapsed = true"
              @expand="collapsed = false"
            >
              <n-menu
                responsive
                :collapsed="collapsed"
                :collapsed-width="64"
                :collapsed-icon-size="30"
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
        <router-view v-else v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>


<style scoped>
</style>