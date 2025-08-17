<template>
  <div class="login-page w-screen h-screen">
    <n-card class="login-card" title="后台管理系统">
      <n-form
        ref="formRef"
        :model="formValue"
        :rules="rules"
      >
        <n-form-item path="username" label="用户名">
          <n-input v-model:value="formValue.username" placeholder="请输入用户名" />
        </n-form-item>
        <n-form-item path="password" label="密码">
          <n-input
            v-model:value="formValue.password"
            type="password"
            placeholder="请输入密码"
            show-password-on="click"
          />
        </n-form-item>
      </n-form>
      <template #action>
        <div class="login-button-container">
          <n-button
            type="primary"
            block
            :loading="loading"
            @click="handleLogin"
          >
            登录
          </n-button>
        </div>
      </template>
    </n-card>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { NCard, NForm, NFormItem, NInput, NButton, useMessage } from 'naive-ui';

export default defineComponent({
  components: {
    NCard,
    NForm,
    NFormItem,
    NInput,
    NButton
  },
  data() {
    return {
      formValue: {
        username: '',
        password: ''
      },
      rules: {
        username: {
          required: true,
          message: '用户名不能为空',
          trigger: 'blur'
        },
        password: {
          required: true,
          message: '密码不能为空',
          trigger: 'blur'
        }
      },
      loading: false,
    };
  },
  setup() {
    const message = useMessage();
    const formRef = ref(null);
    return {
      message,
      formRef
    };
  },
  methods: {
    handleLogin() {
      // 表单验证
      this.formRef.validate((errors) => {
        if (!errors) {
          this.loading = true; // 开启加载状态
          this.message.success('登录成功');

          // 模拟异步登录请求
          setTimeout(() => {
            this.loading = false; // 关闭加载状态
            // 这里可以处理登录成功后的路由跳转
            // this.$router.push('/dashboard');
          }, 2000);

        } else {
          this.message.error('请填写完整的登录信息');
        }
      });
    }
  }
});
</script>

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