<template>
  <div class="dashboard-editor-container">
    <el-row>
      <el-col
        :xs="{span: 72}"
        :sm="{span: 72}"
        :md="{span: 72}"
        :lg="{span: 36}"
        :xl="{span: 36}"
        style="padding-right:8px;margin-bottom:30px;"
      >
        <transaction-table />
      </el-col>
    </el-row>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <el-col
        :xs="36"
        :sm="36"
        :lg="12"
      >
        <div style="margin-left:50px;font-size:20px">
          접속자 수
        </div>
        <div class="chart-wrapper">
          <line-chart :chart-data="lineChartData" />
        </div>
      </el-col>
      <el-col
        :xs="36"
        :sm="36"
        :lg="12"
      >
        <div style="margin-left:50px;font-size:20px">
          링크별 접속자 수
        </div>
        <div class="chart-wrapper">
          <eachuser-chart :chart-data="EachUserChartData" />
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col
        :xs="24"
        :sm="24"
        :lg="8"
      >
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :lg="8"
      >
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :lg="8"
      >
        <div class="chart-wrapper">
          <keyword-chart />
        </div>
      </el-col>
    </el-row>

    <!-- <el-row :gutter="32">
      <el-col
        :xs="24"
        :sm="24"
        :lg="8"
      >
        <div class="chart-wrapper">
          <radar-chart />
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :lg="8"
      >
      <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :lg="8"
      >
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row> -->

    <!-- <el-row :gutter="8">
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 24}"
        :lg="{span: 12}"
        :xl="{span: 12}"
        style="padding-right:8px;margin-bottom:30px;"
      >
        <transaction-table />
      </el-col>
      <el-col
        :xs="{span: 24}"
        :sm="{span: 12}"
        :md="{span: 12}"
        :lg="{span: 6}"
        :xl="{span: 6}"
        style="margin-bottom:30px;"
      >
        <todo-list />
      </el-col>
      <el-col
        :xs="{span: 24}"
        :sm="{span: 12}"
        :md="{span: 12}"
        :lg="{span: 6}"
        :xl="{span: 6}"
        style="margin-bottom:30px;"
      >
        <box-card />
      </el-col>
    </el-row> -->
  </div>
</template>

<script lang="ts">
import 'echarts/theme/macarons.js' // Theme used in BarChart, LineChart, PieChart and RadarChart
import { Component, Vue } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'
import GithubCorner from '@/components/GithubCorner/index.vue'
import BarChart from './components/BarChart.vue'
import BoxCard from './components/BoxCard.vue'
import LineChart, { ILineChartData } from './components/LineChart.vue'
import PanelGroup from './components/PanelGroup.vue'
import PieChart from './components/PieChart.vue'
import RadarChart from './components/RadarChart.vue'
import TodoList from './components/TodoList/index.vue'
import TransactionTable from './components/TransactionTable.vue'
import KeywordChart from './components/keywordChart.vue'
import EachuserChart, { EachuserData } from './components/EachuserChart.vue'

const lineChartData: { [type: string]: ILineChartData } = {
  newVisitis: {
    expectedData: [220, 175, 220, 305, 280, 240, 280],
    actualData: [120, 80, 90, 155, 160, 140, 145],
    powerLinkData: [100, 95, 130, 150, 120, 100, 135]
  }
}
const EachUserChartData: { [type: string]: EachuserData } = {
  newVisitis: {
    naverData: [130, 105, 110, 130, 140, 150, 120],
    googleData: [120, 80, 90, 155, 160, 140, 145],
    daumData: [100, 95, 130, 150, 120, 100, 135]
  }
}

@Component({
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    BarChart,
    BoxCard,
    LineChart,
    PanelGroup,
    PieChart,
    RadarChart,
    TodoList,
    TransactionTable,
    KeywordChart,
    EachuserChart
  }
})
export default class extends Vue {
  private lineChartData = lineChartData.newVisitis

  private handleSetLineChartData(type: string) {
    this.lineChartData = lineChartData[type]
  }
  private EachUserChartData = EachUserChartData.newVisitis

  private handleSetEachUserChartData(type: string) {
    this.EachUserChartData = EachUserChartData[type]
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
