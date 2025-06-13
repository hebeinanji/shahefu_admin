<script setup>
import { useRoute, useRouter } from 'vue-router'
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui'

const route = useRoute()
const router = useRouter()

const paths = route.path.split('/').filter(p => p)
</script>

<template>
  <n-breadcrumb style="margin-bottom: 12px;">
    <n-breadcrumb-item @click="router.push('/')">首页</n-breadcrumb-item>
    <n-breadcrumb-item v-for="(p, index) in paths" :key="index">{{ p }}</n-breadcrumb-item>
  </n-breadcrumb>
</template>