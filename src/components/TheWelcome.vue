<script setup>
</script>

<script>
import { useMessage } from 'naive-ui'
import request from '@/utils/request.js'

export default {
  components:{
  },
  data() {
    return {
      message: useMessage(),
      allUserNum:0,
      allVisitorNum:0,
      allFeedbackNum:0,
      unhandFeedbackNum:0,
      recipeNum:0,
      unhandRecipeNum:0,
      options: {
        chart: {
          id: 'userRegister'
        },
        xaxis: {
          categories: [],
        }
      },
      series: [{
        name: '用户新增数',
        data: []
      },
        {
          name: '游客新增数',
          data: []
        }
      ],
      toolOptions: {
        chart: {
          id: 'toolStat'
        },
        xaxis: {
          categories: [],
        }
      },
      toolSeries: [{
        name: '工具使用总量',
        data: []
      },
        {
          name: '工具今日使用量',
          data: []
        }
      ],
    }
  },
  mounted() {
    this.fetchData()
  },
  computed:{
  },
  methods: {
    fetchData(){
      request.get("/admin/stat/info", {
        params: {},
      }).then(res => {
        if (res.errno === 0) {
          console.log(res)
          this.recipeNum = res.data.stats.all_recipe
          this.allFeedbackNum = res.data.stats.all_feedback
          this.unhandFeedbackNum = res.data.stats.unhandled_feedback
          this.unhandRecipeNum = res.data.stats.unhandled_recipe
          this.allUserNum = res.data.stats.all_user
          this.allVisitorNum = res.data.stats.all_visitor

          this.series = res.data.stats.user_stats
          for (let categoriesKey in res.data.stats.days.categories) {
            this.options.xaxis.categories.push(res.data.stats.days.categories[categoriesKey])
          }
          this.toolSeries = res.data.stats.tool_stats
          for (let categoriesKey in res.data.stats.tool_xs.categories) {
            this.toolOptions.xaxis.categories.push(res.data.stats.tool_xs.categories[categoriesKey])
          }
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

<template>
  <div class="max-h-max m-4">
    <n-flex vertical>
      <n-space>
        <n-card>
          <n-statistic label="注册用户数量" tabular-nums>
            <n-number-animation ref="numberAnimationInstRef" :from="0" :to="allUserNum" />
          </n-statistic>
        </n-card>
        <n-card>
          <n-statistic label="游客用户数量" tabular-nums>
            <n-number-animation ref="numberAnimationInstRef" :from="0" :to="allVisitorNum" />
          </n-statistic>
        </n-card>
        <n-card>
          <n-statistic label="反馈总数量" tabular-nums>
            <n-number-animation ref="numberAnimationInstRef" :from="0" :to="allFeedbackNum" />
          </n-statistic>
        </n-card>
        <n-card>
          <n-statistic label="未处理反馈数" tabular-nums>
            <n-number-animation ref="numberAnimationInstRef" :from="0" :to="unhandFeedbackNum" />
          </n-statistic>
        </n-card>
        <n-card>
          <n-statistic label="菜谱总数" tabular-nums>
            <n-number-animation ref="numberAnimationInstRef" :from="0" :to="recipeNum" />
          </n-statistic>
        </n-card>
        <n-card>
          <n-statistic label="未处理菜谱数" tabular-nums>
            <n-number-animation ref="numberAnimationInstRef" :from="0" :to="unhandRecipeNum" />
          </n-statistic>
        </n-card>
        <n-card>
          <n-statistic label="证书快要过期数（10天内过期)" tabular-nums>
            <n-number-animation ref="numberAnimationInstRef" :from="0" :to="0" />
          </n-statistic>
        </n-card>
      </n-space>
      <n-space>
        <n-card title="用户每日注册数">
          <apexchart width="1200" height="300" type="bar" :options="options" :series="series"></apexchart>
        </n-card>
      </n-space>
      <n-space>
        <n-card title="工具使用统计">
          <apexchart width="1600" height="300" type="bar" :options="toolOptions" :series="toolSeries"></apexchart>
        </n-card>
      </n-space>
      <n-space >
        <n-card title="限制资源监控">
          天气接口数据
        </n-card>
        <n-card title="各工具使用的数据">
          各工具使用的数据
        </n-card>
      </n-space>
    </n-flex>
  </div>

</template>
