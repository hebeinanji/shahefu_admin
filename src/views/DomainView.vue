<template>
  <n-card>
    <n-table class="w-full h-full" :bordered="false" :single-line="false">
      <thead>
      <tr>
        <th>序列号</th>
        <th>域名</th>
        <th>查看证书列表</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>1</td>
        <td>file.shahefu.cn</td>
        <td><RouterLink to="/ssl?host=file.shahefu.cn">
          <n-button strong secondary type="primary">
            查看证书
          </n-button>
        </RouterLink></td>
      </tr>
      <tr>
        <td>2</td>
        <td>harbor.shahefu.com</td>
        <td><RouterLink to="/ssl?host=harbor.shahefu.com">
          <n-button strong secondary type="primary">
            查看证书
          </n-button>
        </RouterLink></td>
      </tr>
      <tr>
        <td>3</td>
        <td>tool.shahefu.cn</td>
        <td><RouterLink to="/ssl?host=tool.shahefu.cn">
          <n-button strong secondary type="primary">
            查看证书
          </n-button>
        </RouterLink></td>
      </tr>
      <tr>
        <td>4</td>
        <td>mylog.shahefu.cn</td>
        <td><RouterLink to="/ssl?host=mylog.shahefu.com">
          <n-button strong secondary type="primary">
            查看证书
          </n-button>
        </RouterLink></td>
      </tr>
      <tr>
        <td>5</td>
        <td>admin.shahefu.cn</td>
        <td><RouterLink to="/ssl?host=admin.shahefu.com">
          <n-button strong secondary type="primary">
            查看证书
          </n-button>
        </RouterLink></td>
      </tr>
      </tbody>
    </n-table>
  </n-card>
</template>
<script>
import { defineComponent } from 'vue'
import { NButton,NTable } from 'naive-ui'
import { RouterLink } from 'vue-router'

export default defineComponent({
  components: {
    RouterLink,
    NButton,
    NTable,
  }
})
</script>