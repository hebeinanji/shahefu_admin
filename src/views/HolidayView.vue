<template>
  <div>
  <n-spin :show="loadShow" class="mt-[0.15rem]">
  <n-flex justify="start" class="pt-4 pb-2 pl-4" >
    <n-button type="info">
      <router-link to="/holiday_info?id=0">新增节假日</router-link>
    </n-button>
      <n-text class="pt-2">年份：</n-text>
      <n-input v-model:value="year" :style="{ width: '10%' }" />
      <n-button @click="search" type="primary" ghost class="mr-4">
        搜索
      </n-button>
  </n-flex>
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
  </div>
</template>

<script>
import request from "/src/utils/request";
import {Delete} from "@vicons/carbon"
import {Edit20Regular} from "@vicons/fluent"
import { NButton,useMessage,useDialog } from 'naive-ui'
import {h} from "vue";
import { useRouter } from 'vue-router'

export default {
  components:{
    NButton,
    Delete,
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
      year:0,
      remote:true,
      message: useMessage(),
      dialog:useDialog(),
      pageCount:1,
      tableData:[],
      columns:this.createColumns({
        editRow(row) {
          window.$route.push("/holiday_info?id="+row.id)
        },
        offlineRow(row) {
          window.$dialog.warning({
            title: '确认下线',
            content: '确认下线该节日配置么，下线后节假日页面上不展示该日期节日！',
            positiveText: '确定',
            negativeText: '取消',
            maskClosable: false,
            onPositiveClick: () => {
              window.$loadStart
              request.post("/admin/holiday/offline", {
                "id": row.id,
              }).then(res => {
                if (res.errno === 0) {
                  window.$message.success("删除成功")
                  setTimeout(() => {
                    window.$fetchData
                  }, 1000);
                }else{
                  window.$message.error(res.err_msg)
                }
              }).catch(error => {
                console.log(error);
              }).finally(
                window.$loadEnd
              );
            },
          })
        },
      }),
      page:1,
      pageSize:10,
      type:0,
      online:0,
      options:[],
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
    newCreate(){
      window.$route.push("/holiday_info?id=0")
    },
    loadStart(){
      this.loadShow = true
    },
    loadEnd(){
      this.loadShow = false
    },
    createColumns({editRow,offlineRow}) {
      return [
        {
          title: "ID",
          key: "id",
        },
        {
          title: "名称",
          key: "name",
        },
        {
          title: "时间",
          key: "year",
        },
        {
          title: "编辑",
          key: "edit",
          render(row) {
            return h(
              NButton,
              {
                secondary: true,
                type: "primary",
                strong: true,
                tertiary: true,
                size: "small",
                onClick: () => editRow(row),
              },
              { icon: () => h(Edit20Regular,null) },
            );
          }
        },
        {
          title: "删除",
          key: "offline",
          render(row) {
            return h(
              NButton,
              {
                tooltip: "上线",
                secondary: true,
                type: "success",
                strong: true,
                tertiary: true,
                size: "small",
                onClick: () => offlineRow(row),
              },
              { icon: () => h(Delete, null,) }
            );
          }
        }
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
      request.get("/admin/holiday/list", {
        params: {
          page_num: this.page,
          page_size: this.pageSize,
          year:this.year,
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