<script>
import { useMessage } from 'naive-ui'
import axios from 'axios';
import useAuthStore from "/src/utils/auth";
import {useRouter} from "vue-router";
export default {
  data(){
    return{
      username: '',
      totp: '',
      loading: false,
      message:useMessage(),
      route:useRouter(),
    }
  },
  methods: {
    handleLogin(){
      if(this.username.length===0 || this.totp.length===0){
        this.message.warning("请填写用户名和临时码")
        return
      }
      this.loading = true; // 开启加载状态
      axios.post('/api/login', {"username":this.username,"otp_code":this.totp}).then(res=>{
        if(res.data.errno===0){
          this.message.success("登录成功")
          useAuthStore().login(res.data.data.jwt, res.data.data.username);
          setTimeout(() => {
            // 这里可以处理登录成功后的路由跳转
            this.route.push('/');
          }, 1000);
        }else{
          this.message.warning(res.data.err_msg)
        }
      }).catch(error => {
        // 请求失败，处理错误
        console.error('There was an error!', error);
      })
      this.loading = false; // 关闭加载状态
    }

  }

}
</script>
<template>
  <div class="login-page w-screen h-screen">
    <n-card class="login-card" title="后台管理系统">
      <n-form>
        <n-form-item path="username" label="用户名">
          <n-input  v-model:value="username" placeholder="请输入用户名" />
        </n-form-item>
        <n-form-item path="totp" label="密码">
          <n-input
            v-model:value="totp"
            placeholder="请输入密码"
          />
        </n-form-item>
      </n-form>
      <template #action>
        <div class="login-button-container">
          <n-button
            type="primary"
            block
            :loading="loading"
            @click="handleLogin">
            登录
          </n-button>
        </div>
      </template>
    </n-card>
  </div>
</template>
<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.login-card {
  width: 380px;
  max-width: 90%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.login-button-container {
  margin-top: 20px;
}
</style>