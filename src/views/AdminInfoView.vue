<template>
  <n-card>
    <n-space vertical size="large" style="padding: 20px; max-width: 800px; margin: auto;">
      <!-- 菜谱名字 -->
      <n-form-item label="用户名">
        <n-input v-model:value="admin.username" placeholder="请输入管理员用户名" />
      </n-form-item>
      <n-form-item v-if="admin.totp_url.length>0" label="totp码">
        <n-qr-code :size="230" :value="admin.totp_url" />
      </n-form-item>
      <!-- 保存按钮 -->
      <n-form-item>
        <n-button type="success" @click="save">保存</n-button>
      </n-form-item>
    </n-space>
  </n-card>
</template>

<script>
import { useRoute } from 'vue-router'
import {HideImageOutlined} from '@vicons/material'
import request from '@/utils/request.js'
import { useMessage } from 'naive-ui'

export default {
  components:{
    HideImageOutlined,
  },
  data() {
    return {
      route:useRoute(),
      admin: {
        id:0,
        username:"",
        totp_url:"",
      },
      message:useMessage(),
    };
  },
  mounted() {
  this.fetchData()
  },
  methods: {
    fetchData(){
      if(this.route.query.id==="0"){
        return
      }
      request.get("http://127.0.0.1:8080/api/useradmin/info", {
        params: {
         id:this.route.query.id,
        },
      }).then(res => {
        console.log(res);
        if (res.errno === 0) {
          this.admin = res.data.info
        }
      }).catch(error => {
        console.log(error);
      }).finally(() => {

        }
      );
    },
    save() {
      this.admin.id = this.route.query.id
      console.log("保存的用户：", this.admin);
      request.post("http://127.0.0.1:8080/api/useradmin/edit", this.admin).then(res => {
        console.log(res);
        if (res.errno === 0) {
          this.message.success("保存成功")
        }
      }).catch(error => {
        console.log(error);
      }).finally(() => {

        }
      );
    },
  },
};
</script>

<style scoped>
</style>