<template>
  <n-data-table
    :columns="columns"
    :data="data"
    :pagination="pagination"
    :bordered="false"
  />
</template>

<script>
import request from "/src/utils/request";
import { h } from "vue";
import { NButton,useMessage } from 'naive-ui'

export default {
  components:{
    NButton,
  },
  data() {
    window.$message = useMessage()
    return {
      message: useMessage(),
      data:[],
      columns: this.createColumns(
        {
        play(row) {
          // This function is called when the "续约" button is clicked
          request.get("http://127.0.0.1:8080/api/ssl/apply", {
            params: {
              domain_name: row.Domain,
            },
          }).then(res => {
            if (res.errno === 0) {
              window.$message.success(`申请证书: ${row.Domain} 成功`);
            }
          }).catch(error => {
            window.$message.error(error)
            console.log(error);
          }).finally(() => {

            }
          );
        }
      },
        {
        download(row) {
          request.get("http://127.0.0.1:8080/api/ssl/download_url", {
            params: {
              id: row.CertificateId,
            },
          }).then(res => {
            if (res.errno === 0) {
              // This function is called when the "下载证书" button is clicked
              const link = document.createElement("a");
              link.href = res.data.download_url; // Assuming row has a downloadUrl property
              link.download = res.data.filename; // Set the file name for download
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }
          }).catch(error => {
            console.log(error);
          }).finally(() => {

            }
          );
        }
      },
        {
          del(row) {
            if (row.Status !== 3 && row.Status !== 10 && row.Status !==7) {
              window.$message.success("证书不可删除");
              return;
            }
            request.get("http://127.0.0.1:8080/api/ssl/del", {
              params: {
                id: row.CertificateId,
              },
            }).then(res => {
              if (res.errno === 0) {
                window.$message.success("删除成功");
                this.fetchData();// Refresh the data after deletion
                window.$message.success("刷新了");
              } else {
                window.$message.error(res.err_msg);
              }
            }).catch(error => {
              console.log(error);
            }).finally(() => {

              }
            );
          }
        },
        {
          deployment(row) {
            request.get("http://43.163.245.139:8080/api/ssl/deployment", {
              params: {
                id: row.CertificateId,
                domain: row.Domain,
              },
            }).then(res => {
              if (res.errno === 0) {
                window.$message.success("部署成功");
              } else {
                window.$message.error(res.err_msg);
              }
            }).catch(error => {
              console.log(error);
            }).finally(() => {

              }
            );
          }
        },
      ),
      pagination: true
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    createColumns({ play },{download},{del},{deployment}) {
      return [
        {
          title: "ID",
          key: "CertificateId",
        },
        {
          title: "证书类型",
          key: "PackageTypeName",
        },
        {
          title: "别名",
          key: "Alias",
        },
        {
          title: "绑定域名",
          key: "Domain",
        },
        {
          title: "到期时间",
          key: "CertEndTime",
        },
        {
          title: "状态",
          key: "StatusName"
        },
        {
          title: "申请新证书",
          key: "re_new",
          render(row) {
            return h(
              NButton,
              {
                strong: true,
                tertiary: true,
                size: "small",
                onClick: () => play(row)
              },
              { default: () => "申请新证书" }
            );
          }
        },
        {
          title: "下载证书",
          key: "download",
          render(row) {
            return h(
              NButton,
              {
                strong: true,
                tertiary: true,
                size: "small",
                onClick: () => download(row)
              },
              { default: () => "下载证书" }
            );
          }
        },
        {
          title: "删除证书",
          key: "del",
          render(row) {
            return h(
              NButton,
              {
                strong: true,
                tertiary: true,
                size: "small",
                onClick: () => del(row)
              },
              { default: () => "删除证书" }
            );
          }
        },
        {
          title: "部署证书",
          key: "deployment",
          render(row) {
            return h(
              NButton,
              {
                strong: true,
                tertiary: true,
                size: "small",
                onClick: () => deployment(row)
              },
              { default: () => "部署证书" }
            );
          }
        }
      ];
    },
    fetchData(){
      this.data = [];
      request.get("http://127.0.0.1:8080/api/ssl/list", {
        params: {
        },
      }).then(res => {
        if (res.errno === 0) {
          this.data = res.data.list;
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