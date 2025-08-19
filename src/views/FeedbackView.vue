<template>
  <div>
  <n-spin :show="loadShow" class="mt-[0.15rem]">
  <n-flex justify="center">
    <n-input-group class="py-4 pl-4" >
      <n-input v-model:value="title_q" :style="{ width: '20%' }" />
      <n-button @click="search" type="primary" ghost>
        搜索
      </n-button>
    </n-input-group>
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
        editRow(row) {
          window.$route.push("/recipe_info?id="+row.id)
        },
        offlineRow(row) {
          window.$dialog.warning({
            title: '确认下线',
            content: '确认下线该菜谱么，下线后反馈列表上不展示该反馈！',
            positiveText: '确定',
            negativeText: '取消',
            maskClosable: false,
            onPositiveClick: () => {
              window.$loadStart
              request.post("http://127.0.0.1:8080/admin/feedback/offline", {
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
        onlineRow(row) {
          window.$dialog.warning({
            title: '确认上线',
            content: '确认上线么。上线后用户可看到该反馈',
            positiveText: '确定',
            negativeText: '取消',
            maskClosable: false,
            onPositiveClick: () => {
              window.$loadStart()
              request.post("http://127.0.0.1:8080/admin/feedback/online", {
                "id": row.id,
              }).then(res => {
                if (res.errno === 0) {
                  window.$message.success("上线成功")
                  setTimeout(() => {
                    window.$fileList(0)
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
    createColumns({editRow,offlineRow,onlineRow}) {
      return [
        {
          title: "ID",
          key: "id",
        },
        {
          title: "工具ID",
          key: "tool_id",
        },
        {
          title: "用户ID",
          key: "user_id",
        },
        {
          title: "内容",
          key: "content",
        },
        {
          title: "是否匿名",
          key: "anonymous",
          render(row) {
            if (row.anonymous === 0) {
              return "否"
            } else if (row.anonymous === 1) {
              return "是"
            }else{
              return "未知"
            }
          }
        },
        {
          title: "回复信息",
          key: "reply",
        },
        {
          title: "回复人ID",
          key: "reply_uid",
        },
        {
          title: "回复状态",
          key: "reply_status",
          render(row) {
            if (row.reply_status === 0) {
              return "未回复"
            } else if (row.reply_status === 1) {
              return "已回复"
            }else{
              return "未知"
            }
          }
        },
        {
          title: "是否展示在反馈列表",
          key: "can_show",
          render(row) {
            if (row.can_show === 0) {
              return "不可"
            } else if (row.can_show === 1) {
              return "可"
            }else{
              return "未知"
            }
          }
        },
        {
          title: "发布状态",
          key: "publish_status",
          render(row) {
            if (row.publish_status === 0) {
              return "未发布"
            } else if (row.publish_status === 1) {
              return "已发布"
            }else{
              return "未知"
            }
          }
        },
        {
          title: "回复",
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
          title: "上下线",
          key: "offline",
          render(row) {
            if(row.publish_status===0){
              return h(
                NButton,
                {
                  tooltip: "上线",
                  secondary: true,
                  type: "success",
                  strong: true,
                  tertiary: true,
                  size: "small",
                  onClick: () => onlineRow(row),
                },
                { icon: () => h(NewReleasesOutlined, null,) }
              );
            }else{
              return h(
                NButton,
                {
                  tooltip: "删除",
                  secondary: true,
                  type: "error",
                  strong: true,
                  tertiary: true,
                  size: "small",
                  onClick: () => offlineRow(row),
                },
                { icon: () => h(Ban, null,) }
              );
            }
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
      request.get("/admin/feedback/list", {
        params: {
          page_num: this.page,
          page_size: this.pageSize,
          title:this.title_q,
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