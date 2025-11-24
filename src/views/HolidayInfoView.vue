<template>
  <n-card>
    <n-space vertical size="large" style="padding: 20px; max-width: 800px; margin: auto;">
      <!-- 菜谱名字 -->
      <n-form-item label="节日">
        <n-select v-model:value="name" :options="options"  class="w-2/4" />
      </n-form-item>
      <n-form-item label="节日范围">
        <n-date-picker
          v-model:value="range"
          type="daterange"
          :is-date-disabled="isRangeDateDisabled"
          clearable
        />
      </n-form-item>
      <n-form-item label="是否是中国节日">
        <n-switch v-model:value="is_chinese" />
      </n-form-item>
      <n-form-item label="是否是休息日">
        <n-switch v-model:value="is_rest" />
      </n-form-item>
      <n-form-item label="是否要调休">
        <n-switch v-model:value="is_adjustment" />
      </n-form-item>

      <!-- 保存按钮 -->
      <n-flex>
        <n-form-item>
          <n-button type="success" @click="saveHoliday">保存</n-button>
        </n-form-item>
        <n-form-item>
          <n-button type="success" @click="newHoliday">新增</n-button>
        </n-form-item>
      </n-flex>
    </n-space>
  </n-card>
</template>

<script>
import { useRoute,useRouter } from 'vue-router'
import { useMessage,useDialog } from 'naive-ui'
import {HideImageOutlined} from '@vicons/material'
import request from '@/utils/request.js'
import { startOfDay } from "date-fns";
import dayjs from 'dayjs'

export default {
  components:{
    HideImageOutlined,
  },
  data() {
    return {
      route:useRoute(),
      router:useRouter(),
      message:useMessage(),
      name:"",
      range:[dayjs().startOf('day').valueOf(),dayjs().startOf('day').valueOf()],
      is_chinese:true,
      is_rest:true,
      is_adjustment:false,
      dialog:useDialog(),
      options:[
        {
          label: '元旦假期',
          value: '元旦假期'
        },
        {
          label: '春节假期',
          value: '春节假期'
        },
        {
          label: '清明节假期',
          value: '清明节假期'
        },
        {
          label: '劳动节假期',
          value: '劳动节假期'
        },
        {
          label: '端午节假期',
          value: '端午节假期'
        },{
          label: '中秋节假期',
          value: '中秋节假期'
        },{
          label: '国庆节假期',
          value: '国庆节假期'
        }
      ],
    };
  },
  mounted() {
    this.fetchData()
  },
  computed:{

  },
  methods: {
    isRangeDateDisabled(ts, type, range){
      if (this.route.query.id==="0"){
        return false
      }
      if (type === "start" && range !== null) {
        return startOfDay(range[1]).valueOf() - startOfDay(ts).valueOf() > 86400000;
      }
      if (type === "end" && range !== null) {
        return startOfDay(ts).valueOf() - startOfDay(range[0]).valueOf() > 86400000;
      }
      return false;
    },
    fetchData(){
      if (this.route.query.id==="0"){
        return
      }
      request.get("/admin/holiday/info", {
        params: {
         id:this.route.query.id,
        },
      }).then(res => {
        console.log(res);
        if (res.errno === 0) {
          this.name = res.data.info.name
          this.range = res.data.info.range
          this.year = res.data.info.year
          this.is_chinese = res.data.info.is_chinese === 1
          this.is_rest = res.data.info.is_rest === 1
          this.is_adjustment = res.data.info.is_adjustment === 1
        }
      }).catch(error => {
        console.log(error);
      }).finally(() => {

        }
      );
    },
    saveHoliday() {
      const input = {
        id:Number(this.route.query.id),
        name: this.name,
        range: this.range,
        is_chinese:this.is_chinese===true?1:0,
        is_adjustment:this.is_adjustment===true?1:0,
        is_rest:this.is_rest===true?1:0,
      }
      request.post("/admin/holiday/edit",input).then(res => {
        console.log(res);
        if (res.errno === 0) {
          this.message.success("已保存");
        }else{
          this.message.error("保存失败");
        }
      }).catch(error => {
        console.log(error);
      }).finally(() => {

        }
      );
    },
    newHoliday(){
      this.router.push("/holiday_info?id=0")
      this.name =""
      this.range = [dayjs().startOf('day').valueOf(),dayjs().startOf('day').valueOf()]
      this.year = 0
      this.is_chinese = true
      this.is_rest = true
      this.is_adjustment = false
    },
  },
};
</script>

<style scoped>
</style>