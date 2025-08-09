<template>
  <n-flex justify="end">
    <n-input-group>
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
</template>

<script>
import request from "/src/utils/request";
import { NButton,useMessage } from 'naive-ui'

export default {
  components:{
    NButton,
  },
  data() {
    window.$message = useMessage()
    return {
      title_q:"",
      remote:true,
      message: useMessage(),
      pageCount:1,
      tableData:[],
      columns: this.createColumns(
      ),
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
    createColumns() {
      return [
        {
          title: "ID",
          key: "id",
        },
        {
          title: "分类",
          key: "type_name",
        },
        {
          title: "名称",
          key: "cp_name",
        },
        {
          title: "提示",
          key: "tips",
        },
        {
          title: "更新时间",
          key: "updated_at"
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
      request.get("http://127.0.0.1:8080/api/recipe/list", {
        params: {
          page_num: this.pagination.page,
          page_size: this.pagination.pageSize,
          title:this.title_q,
        },
      }).then(res => {
        console.log(res);
        if (res.errno === 0) {
          this.tableData = res.data.list;
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