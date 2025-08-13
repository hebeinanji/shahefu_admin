<script setup>
</script>

<template>
  <div class="h-96">
    <n-flex vertical class="m-4">
      <n-flex>
        <n-text class="text-2xl">
          欢迎来到沙河福管理后台👏
        </n-text>
      </n-flex>
      <n-flex>
        <n-space>
          <n-card title="用户数量">
            用户总数、今天新增的用户数
          </n-card>
          <n-card title="反馈数量">
            反馈总数、今天新增的反馈数据、未处理的反馈数据
          </n-card>
          <n-card title="菜谱总数">
            菜谱总数、菜谱今日新增数、未处理菜谱数
          </n-card>
          <n-card title="证书数量">
            证书总数量、证书快要过期数（10天内过期）
          </n-card>
          <n-card title="限制资源监控">
            天气接口数据
          </n-card>
          <n-card title="页面访问数据">
            各页面访问的数据，使用的数据
          </n-card>
        </n-space>
      </n-flex>
    </n-flex>
  </div>

</template>
