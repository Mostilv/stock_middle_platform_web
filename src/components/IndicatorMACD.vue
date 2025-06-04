<template>
  <div class="indicator-page">
    <div class="page-header">
      <h2>MACD 指标</h2>
      <p class="indicator-desc">MACD（Moving Average Convergence/Divergence）是一种趋势跟踪动量指标，显示两个移动平均线之间的关系。</p>
    </div>
    
    <div class="indicator-content">
      <a-card class="chart-card">
        <template #title>
          <div class="card-title">
            <span>MACD 走势图</span>
            <a-tag color="blue">趋势指标</a-tag>
          </div>
        </template>
        <v-chart class="chart" :option="macdOption" autoresize />
      </a-card>

      <a-card class="desc-card">
        <template #title>
          <div class="card-title">指标说明</div>
        </template>
        <div class="indicator-details">
          <div class="detail-item">
            <h3>指标原理</h3>
            <p>MACD由DIF（差离值）、DEA（信号线）和MACD柱状图组成。通过计算快速和慢速移动平均线之间的差值来识别趋势变化。</p>
          </div>
          <div class="detail-item">
            <h3>使用方法</h3>
            <ul>
              <li>DIF与DEA金叉：买入信号</li>
              <li>DIF与DEA死叉：卖出信号</li>
              <li>MACD柱状图由负转正：可能上涨</li>
              <li>MACD柱状图由正转负：可能下跌</li>
            </ul>
          </div>
          <div class="detail-item">
            <h3>参数设置</h3>
            <p>默认参数：</p>
            <ul>
              <li>快线周期：12</li>
              <li>慢线周期：26</li>
              <li>信号线周期：9</li>
            </ul>
          </div>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { use } from 'echarts/core'
import VChart from 'vue-echarts'
import { LineChart, BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([LineChart, BarChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer])

const macdOption = computed(() => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  legend: {
    data: ['DIF', 'DEA', 'MACD'],
    textStyle: {
      color: 'var(--text-color)'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    axisLine: {
      lineStyle: {
        color: 'var(--border-color)'
      }
    },
    axisLabel: {
      color: 'var(--text-color)'
    }
  },
  yAxis: {
    type: 'value',
    axisLine: {
      lineStyle: {
        color: 'var(--border-color)'
      }
    },
    axisLabel: {
      color: 'var(--text-color)'
    },
    splitLine: {
      lineStyle: {
        color: 'var(--border-color)'
      }
    }
  },
  series: [
    {
      name: 'DIF',
      type: 'line',
      data: [0.5, 0.7, 0.6, 0.8, 0.9, 0.7, 0.8],
      smooth: true,
      lineStyle: {
        color: '#1890ff'
      },
      itemStyle: {
        color: '#1890ff'
      }
    },
    {
      name: 'DEA',
      type: 'line',
      data: [0.3, 0.4, 0.5, 0.6, 0.7, 0.6, 0.7],
      smooth: true,
      lineStyle: {
        color: '#52c41a'
      },
      itemStyle: {
        color: '#52c41a'
      }
    },
    {
      name: 'MACD',
      type: 'bar',
      data: [0.4, 0.6, 0.2, 0.4, 0.5, 0.3, 0.4],
      itemStyle: {
        color: function(params: any) {
          return params.data >= 0 ? '#f5222d' : '#52c41a'
        }
      }
    }
  ]
}))
</script>

<script lang="ts">
export default {
  name: 'IndicatorMACD'
}
</script>

<style scoped>
.indicator-page {
  width: 100%;
  max-width: var(--content-width-xxl);
  margin: 0 auto;
  padding: 24px;
}

.page-header {
  margin-bottom: 32px;
}

.page-header h2 {
  color: var(--text-color);
  font-size: 28px;
  margin: 0 0 16px 0;
  font-weight: 600;
}

.indicator-desc {
  color: var(--text-color);
  font-size: 16px;
  margin: 0;
  opacity: 0.8;
}

.indicator-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.chart-card,
.desc-card {
  background: var(--content-bg);
  border-radius: 16px;
  box-shadow: var(--card-shadow);
}

.card-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--text-color);
  font-size: 18px;
  font-weight: 500;
}

.chart-card :deep(.ant-card-body) {
  padding: 24px;
}

.chart {
  width: 100%;
  height: 600px;
}

.indicator-details {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.detail-item {
  color: var(--text-color);
}

.detail-item h3 {
  font-size: 16px;
  margin: 0 0 12px 0;
  font-weight: 500;
}

.detail-item p {
  margin: 0 0 12px 0;
  line-height: 1.6;
}

.detail-item ul {
  margin: 0;
  padding-left: 20px;
}

.detail-item li {
  margin-bottom: 8px;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .indicator-page {
    padding: 16px;
  }
  
  .chart {
    height: 400px;
  }
}
</style> 