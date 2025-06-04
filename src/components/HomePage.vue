<template>
  <div class="home-content">
    <div class="page-header">
      <h2>市场概览</h2>
    </div>
    <div class="market-overview">
      <a-row :gutter="24">
        <a-col :span="6">
          <a-statistic
            title="上证指数"
            :value="3999.99"
            :precision="2"
            :value-style="{ color: '#3f8600' }"
          >
            <template #prefix>
              <arrow-up-outlined />
            </template>
            <template #suffix>
              <span style="font-size: 14px; color: #3f8600">+1.23%</span>
            </template>
          </a-statistic>
        </a-col>
        <a-col :span="6">
          <a-statistic
            title="深证成指"
            :value="12999.99"
            :precision="2"
            :value-style="{ color: '#cf1322' }"
          >
            <template #prefix>
              <arrow-down-outlined />
            </template>
            <template #suffix>
              <span style="font-size: 14px; color: #cf1322">-0.85%</span>
            </template>
          </a-statistic>
        </a-col>
        <a-col :span="6">
          <a-statistic
            title="创业板指"
            :value="2999.99"
            :precision="2"
            :value-style="{ color: '#3f8600' }"
          >
            <template #prefix>
              <arrow-up-outlined />
            </template>
            <template #suffix>
              <span style="font-size: 14px; color: #3f8600">+2.15%</span>
            </template>
          </a-statistic>
        </a-col>
        <a-col :span="6">
          <a-statistic
            title="市场热度"
            :value="85"
            :value-style="{ color: '#1890ff' }"
          >
            <template #suffix>
              <span style="font-size: 14px; color: #1890ff">%</span>
            </template>
          </a-statistic>
        </a-col>
      </a-row>
    </div>

    <div class="page-header">
      <h2>技术指标</h2>
    </div>
    <div class="charts-grid">
      <a-card class="market-card" title="MACD 指标">
        <v-chart class="chart" :option="macdOption" autoresize />
      </a-card>

      <a-card class="market-card" title="KDJ 指标">
        <v-chart class="chart" :option="kdjOption" autoresize />
      </a-card>

      <a-card class="market-card" title="市场情绪">
        <v-chart class="chart" :option="sentimentOption" autoresize />
      </a-card>

      <a-card class="market-card" title="板块热度">
        <v-chart class="chart" :option="sectorOption" autoresize />
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons-vue'
import { use } from 'echarts/core'
import VChart from 'vue-echarts'
import { LineChart, BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([LineChart, BarChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer])

// MACD 图表配置
const macdOption = ref({
  tooltip: { trigger: 'axis' },
  legend: { data: ['DIF', 'DEA', 'MACD'] },
  grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
  xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  yAxis: { type: 'value' },
  series: [
    { name: 'DIF', type: 'line', data: [0.5, 0.7, 0.6, 0.8, 0.9, 0.7, 0.8], smooth: true },
    { name: 'DEA', type: 'line', data: [0.3, 0.4, 0.5, 0.6, 0.7, 0.6, 0.7], smooth: true },
    { name: 'MACD', type: 'line', data: [0.4, 0.6, 0.2, 0.4, 0.5, 0.3, 0.4], smooth: true },
  ],
})

// KDJ 图表配置
const kdjOption = ref({
  tooltip: { trigger: 'axis' },
  legend: { data: ['K', 'D', 'J'] },
  grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
  xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  yAxis: { type: 'value' },
  series: [
    { name: 'K', type: 'line', data: [40, 60, 55, 70, 65, 75, 80], smooth: true },
    { name: 'D', type: 'line', data: [35, 45, 50, 60, 55, 65, 70], smooth: true },
    { name: 'J', type: 'line', data: [50, 90, 65, 90, 85, 95, 100], smooth: true },
  ],
})

// 市场情绪图表配置
const sentimentOption = ref({
  tooltip: { trigger: 'axis' },
  legend: { data: ['看多', '看空', '中性'] },
  grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
  xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  yAxis: { type: 'value' },
  series: [
    { name: '看多', type: 'line', data: [60, 65, 70, 75, 80, 85, 90], smooth: true },
    { name: '看空', type: 'line', data: [30, 25, 20, 15, 10, 5, 0], smooth: true },
    { name: '中性', type: 'line', data: [10, 10, 10, 10, 10, 10, 10], smooth: true },
  ],
})

// 板块热度图表配置
const sectorOption = ref({
  tooltip: { trigger: 'axis' },
  legend: { data: ['热度'] },
  grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
  xAxis: { type: 'category', data: ['科技', '医药', '新能源', '消费', '金融', '地产', '农业'] },
  yAxis: { type: 'value' },
  series: [
    {
      name: '热度',
      type: 'bar',
      data: [90, 85, 80, 75, 70, 65, 60],
      itemStyle: {
        color: function(params: any) {
          const colorList = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452']
          return colorList[params.dataIndex]
        }
      }
    }
  ],
})
</script>

<script lang="ts">
export default {
  name: 'HomePage',
}
</script>

<style scoped>
.home-content {
  width: 100%;
  max-width: var(--content-width-xxl);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.page-header {
  margin-bottom: 0;
}

.page-header h2 {
  color: var(--text-color);
  font-size: 28px;
  margin: 0;
  font-weight: 600;
}

.market-overview {
  background: var(--content-bg);
  border-radius: 32px;
  padding: 24px;
  box-shadow: var(--card-shadow);
}

.market-overview :deep(.ant-statistic-title) {
  color: var(--text-color);
  font-size: 16px;
  margin-bottom: 8px;
}

.market-overview :deep(.ant-statistic-content) {
  color: var(--text-color);
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.market-card {
  background: var(--content-bg);
  border-radius: 32px;
  box-shadow: var(--card-shadow);
}

.market-card :deep(.ant-card-head) {
  border-bottom: 1px solid var(--border-color);
}

.market-card :deep(.ant-card-head-title) {
  color: var(--text-color);
  font-size: 18px;
}

.market-card :deep(.ant-card-body) {
  color: var(--text-color);
}

.chart {
  width: 100%;
  height: 320px;
}

@media (max-width: 992px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
}
</style> 