<template>
  <div class="indicator-page">
    <div class="page-header">
      <h2>KDJ 指标</h2>
      <p class="indicator-desc">KDJ指标是一种随机指标，通过计算最高价、最低价和收盘价之间的关系来预测价格走势。</p>
    </div>
    
    <div class="indicator-content">
      <a-card class="chart-card">
        <template #title>
          <div class="card-title">
            <span>KDJ 走势图</span>
            <a-tag color="purple">超买超卖指标</a-tag>
          </div>
        </template>
        <v-chart class="chart" :option="kdjOption" autoresize />
      </a-card>

      <a-card class="desc-card">
        <template #title>
          <div class="card-title">指标说明</div>
        </template>
        <div class="indicator-details">
          <div class="detail-item">
            <h3>指标原理</h3>
            <p>KDJ指标由K线、D线和J线组成，通过计算RSV值（未成熟随机值）来反映价格走势的强弱。</p>
          </div>
          <div class="detail-item">
            <h3>使用方法</h3>
            <ul>
              <li>K线上穿D线：买入信号</li>
              <li>K线下穿D线：卖出信号</li>
              <li>J线超过100：超买区域</li>
              <li>J线低于0：超卖区域</li>
            </ul>
          </div>
          <div class="detail-item">
            <h3>参数设置</h3>
            <p>默认参数：</p>
            <ul>
              <li>RSV周期：9</li>
              <li>K值周期：3</li>
              <li>D值周期：3</li>
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
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([LineChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer])

const kdjOption = computed(() => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  legend: {
    data: ['K', 'D', 'J'],
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
    min: 0,
    max: 100,
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
      name: 'K',
      type: 'line',
      data: [30, 40, 35, 50, 60, 55, 45],
      smooth: true,
      lineStyle: {
        color: '#1890ff'
      },
      itemStyle: {
        color: '#1890ff'
      }
    },
    {
      name: 'D',
      type: 'line',
      data: [25, 35, 30, 45, 55, 50, 40],
      smooth: true,
      lineStyle: {
        color: '#52c41a'
      },
      itemStyle: {
        color: '#52c41a'
      }
    },
    {
      name: 'J',
      type: 'line',
      data: [40, 50, 45, 60, 70, 65, 55],
      smooth: true,
      lineStyle: {
        color: '#722ed1'
      },
      itemStyle: {
        color: '#722ed1'
      }
    }
  ]
}))
</script>

<script lang="ts">
export default {
  name: 'IndicatorKDJ'
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