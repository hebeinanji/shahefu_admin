<script>
import { defineComponent, h, ref, toRef, computed, onMounted } from 'vue'
import { MdCash } from "@vicons/ionicons4";
import { ModeNightOutlined} from "@vicons/material";
import { Sun } from "@vicons/fa";
import { NIcon } from "naive-ui";
import { useRouter } from 'vue-router';
import foolishLogo from '@/assets/foolish-logo.png'

export default defineComponent({
  methods: {},
  computed: {
    foolishLogo() {
      return foolishLogo
    }
  },
  props: [
    'curRouterName',
      'isDark'
  ],
  components: {
    ModeNightOutlined,
    Sun,
    foolishLogo,
  },
  emits: ['changeTheme'],
  setup(props,{ emit }) {
    const curRouterName = toRef(props, "curRouterName");
    const isDark = toRef(props, "isDark");
    const router = useRouter();
    const menuShow = toRef(false)
    const pathInfos = computed({
      get() {
        for (let routerKey in router.options.routes) {
          if(curRouterName.value === router.options.routes[routerKey].name) {
            let paths = router.options.routes[routerKey].pathName.split("/")
            let pathInfos =[]
            for (let i = 0; i < paths.length; i++) {
              if(i===paths.length-1){
                pathInfos.push(
                    {
                      "name": paths[i],
                      "href": "",
                    }
                );
              }else{
                pathInfos.push(
                    {
                      "name": paths[i],
                      "href": router.options.routes[routerKey].parentHref
                    }
                );
              }

            }
            return pathInfos
          }
        }
      }
    });
    const darkOpen = isDark.value=== true ? ref(true) : ref(false);
    // 获取路由配置
    onMounted(() => {
      document.body.style.overflow = 'auto'
      document.documentElement.style.overflow = 'auto'
    })
    function emitUpdate2Parent() {
      darkOpen.value = !darkOpen.value;
      emit('changeTheme', darkOpen.value);
    }

    return {
      menuShow,
      emitUpdate2Parent,
      darkOpen,
      pathInfos,
      ModeNightOutlined,
      Sun,
      MdCash,
      curRouterName:props.curRouterName,
      activeKey: ref(null),
    };
  }
});
</script>
<template>
  <div class="bg-amber-100">
    <n-flex class="mx-6" justify="space-between" >
      <n-space :size="[0,0]">
        <n-image
          width="70"
          :src="foolishLogo"
          preview-disabled
        />
        <n-gradient-text class="pt-2" :size="33" type="success">
          沙河福后台管理
        </n-gradient-text>
      </n-space>
      <n-switch  class="pt-8" size="large" @update:value="emitUpdate2Parent" :round="false" v-model:value="darkOpen">
        <template #checked-icon>
          <n-icon :component="ModeNightOutlined" />
        </template>
        <template #checked>
          暗夜
        </template>
        <template #unchecked>
          <n-text class="border-black">白昼</n-text>
        </template>
        <template #unchecked-icon>
          <n-icon :component="Sun" />
        </template>
      </n-switch>
    </n-flex>
  </div>

</template>