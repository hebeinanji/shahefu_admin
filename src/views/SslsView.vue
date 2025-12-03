<template>
  <n-card>
    <n-flex justify="end">
      <n-button type="info"
      @click="apply"
      >
        申请新证书
      </n-button>
    </n-flex>
    <n-data-table
      :columns="columns"
      :data="data"
      :pagination="pagination"
      :bordered="false"
    />
  </n-card>
</template>

<script>
import request from "/src/utils/request";
import { h } from "vue";
import { NButton,useMessage } from 'naive-ui'
import { useRoute } from 'vue-router'

export default {
  components:{
    NButton,
  },
  data() {
    window.$message = useMessage()
    return {
      message: useMessage(),
      route:useRoute(),
      data:[
      ],
      columns: this.createColumns(
        {
        download(row) {
          window.$show = true
          request.get("/admin/ssl/download_url", {
            params: {
              id: row.CertificateId,
            },
          }).then(res => {
            window.$show = false
            if (res.errno === 0) {
              // This function is called when the "下载证书" button is clicked
              const link = document.createElement("a");
              link.href = res.data.data.Response.DownloadCertificateUrl; // Assuming row has a downloadUrl property
              link.download = res.data.data.Response.DownloadFilename; // Set the file name for download
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
          revoke(row){
            if (row.Status !==1) {
              window.$message.success("证书不可吊销");
              return;
            }
            window.$show = true
            request.get("/admin/ssl/revoke", {
              params: {
                cert_id: row.CertificateId,
                domain_name: row.Domain,
              },
            }).then(res => {
              window.$show = false
              if (res.errno === 0) {
                window.$message.success("吊销中");
                setTimeout(() => {
                  window.location.reload();
                }, 2000)
              } else {
                window.$message.error(res.err_msg);
              }
            }).catch(error => {
              console.log(error);
            }).finally(() => {

              }
            );
          },
        },
        {
          del(row) {
            if (row.Status !== 3 && row.Status !== 10 && row.Status !==7) {
              window.$message.success("证书不可删除");
              return;
            }
            window.$show = true
            request.get("/admin/ssl/del", {
              params: {
                id: row.CertificateId,
              },
            }).then(res => {
              window.$show = false
              if (res.errno === 0) {
                window.$message.success("删除成功");
                setTimeout(() => {
                  window.location.reload();
                }, 2000)
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
            window.$show = true
            request.get("/admin/ssl/deployment", {
              params: {
                id: row.CertificateId,
                domain: row.Domain,
              },
            }).then(res => {
              window.$show = false
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
        },{
          addAutoDeployment(row){
            window.$show = true
            request.get("/admin/ssl/add_auto_deployment", {
              params: {
                certs_id: row.CertificateId,
                domain: row.Domain,
                validity_Begin_time:row.CertBeginTime,
                validity_end_time:row.CertEndTime,
                apply_time:row.InsertTime,
              },
            }).then(res => {
              window.$show = false
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
        }
      ),
      pagination: true
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    createColumns({download},{revoke},{del},{deployment},{addAutoDeployment}) {
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
          title: "是否已被替换",
          key: "IsReplaced"
        },
        {
          title: "下载证书",
          key: "download",
          render(row) {
            return h(
              NButton,
              {
                strong: true,
                secondary:true,
                type:"success",
                size: "small",
                onClick: () => download(row)
              },
              { default: () => "下载证书" }
            );
          }
        },
        {
          title: "吊销证书",
          key: "revoke",
          render(row) {
            return h(
              NButton,
              {
                strong: true,
                secondary:true,
                type:"warning",
                size: "small",
                onClick: () => revoke(row)
              },
              { default: () => "吊销证书" }
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
                secondary:true,
                type:"error",
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
                secondary:true,
                type:"warning",
                size: "small",
                onClick: () => deployment(row)
              },
              { default: () => "部署证书" }
            );
          }
        },
        {
          title: "添加到自动部署",
          key: "auto_deployment",
          render(row) {
            return h(
              NButton,
              {
                strong: true,
                secondary:true,
                type:"info",
                size: "small",
                onClick: () => addAutoDeployment(row)
              },
              { default: () => "添加到自动部署" }
            );
          }
        }
      ];
    },
    fetchData(){
      this.data = [];
      request.get("/admin/ssl/list", {
        params: {
          domain_name:this.route.query.host,
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
    apply() {
      request.get("/admin/ssl/apply", {
      params: {
        domain_name:this.route.query.host,
      },
      }).then(res => {
        if (res.errno === 0) {
        window.$message.success('申请证书: '+this.route.query.host+' 成功');
        this.fetchData()
      }
      }).catch(error => {
        window.$message.error(error)
        console.log(error);
      }).finally(() => {
        }
      );
    }

  }
}
</script>