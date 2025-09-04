<template>
  <n-card>
  <n-spin :show="loadShow" class="mt-[0.15rem]">
  <n-data-table
    remote
    striped
    :columns="columns"
    :data="tableData"
    :pagination=pagination
    :bordered="false"
    @update:page="updatePageNum"
    @update:page-size="updatePageSize"
  />
  </n-spin>
  </n-card>
</template>

<script>
import request from "/src/utils/request";
import {Ban} from "@vicons/ionicons5"
import {Edit20Regular} from "@vicons/fluent"
import {NewReleasesOutlined} from "@vicons/material"
import { NButton,useMessage,useDialog } from 'naive-ui'
import {h} from "vue";
import { useRouter } from 'vue-router'

export default {
  components:{
    NButton,
    Ban,
    Edit20Regular,
  },
  data() {
    window.$message = useMessage()
    window.$dialog = useDialog()
    window.$fetchData = this.fetchData
    window.$loadStart = this.loadStart
    window.$loadEnd = this.loadEnd
    window.$route = useRouter()
    return {
      loadShow:false,
      title_q:"",
      remote:true,
      message: useMessage(),
      dialog:useDialog(),
      pageCount:1,
      tableData:[],
      columns:this.createColumns({
      }),
      page:1,
      pageSize:10,
    }
  },
  mounted() {
    this.fetchData()
  },
  computed:{
    pagination(){
      return {
        page:this.page,
        pageSize:this.pageSize,
        pageCount:this.pageCount,
        pageSlot:7,
        showQuickJumper:true,
        size:"large",
        showSizePicker:true,
      }
    }
  },
  methods: {
    loadStart(){
      this.loadShow = true
    },
    loadEnd(){
      this.loadShow = false
    },
    createColumns() {
      return [
        {
          title: "ID",
          key: "id",
        },
        {
          title: "用户名",
          key: "name",
        },
        {
          title: "邮箱",
          key: "email",
        },
        {
          title: "ip地址",
          key: "ip",
        },
        {
          title: "注册时间",
          key: "created_at",
        },
      ];
    },
    updatePageSize(pageSize){
      this.pageSize = pageSize
      this.fetchData()
    },
    updatePageNum(page){
      this.page = page
      this.fetchData()
    },
    search(){
      this.fetchData()
    },
    fetchData(){
      this.data = [];
      request.get("/admin/user/list", {
        params: {
          page_num: this.page,
          page_size: this.pageSize,
        },
      }).then(res => {
        console.log(res);
        if (res.errno === 0) {
          this.tableData = []
          if (res.data.list!==null){
            this.tableData = res.data.list;
          }
          this.page = res.data.pagination.page
          this.pageSize = res.data.pagination.page_size
          this.pageCount = res.data.pagination.total_page
        }
      }).catch(error => {
        console.log(error);
      }).finally(() => {

        }
      );
    },
  }
}
</script>