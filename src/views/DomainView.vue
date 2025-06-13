<template>
  <n-card title="卡片">
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
        <td>shahefu.cn</td>
        <td><RouterLink to="/ssls?host=shahefu.cn">查看</RouterLink></td>
      </tr>
      <tr>
        <td>2</td>
        <td>shahefu.com</td>
        <td><RouterLink to="/ssls?host=shahefu.com">查看</RouterLink></td>
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