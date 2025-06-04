<template>
  <div class="indicator-page">
    <div class="page-header">
      <h2>RSI 指标</h2>
      <p class="indicator-desc">RSI（相对强弱指标）是一种动量指标，用于衡量价格变动的速度和变化，帮助判断市场是否处于超买或超卖状态。</p>
    </div>
    
    <div class="indicator-content">
      <a-card class="chart-card">
        <template #title>
          <div class="card-title">
            <span>RSI 走势图</span>
            <a-tag color="orange">动量指标</a-tag>
          </div>
        </template>
        <v-chart class="chart" :option="rsiOption" autoresize />
      </a-card>

      <a-card class="desc-card">
        <template #title>
          <div class="card-title">指标说明</div>
        </template>
        <div class="indicator-details">
          <div class="detail-item">
            <h3>指标原理</h3>
            <p>RSI通过比较一定时期内上涨和下跌的平均幅度，计算出一个0-100之间的数值，用于判断市场的超买超卖状态。</p>
          </div>
          <div class="detail-item">
            <h3>使用方法</h3>
            <ul>
              <li>RSI &gt; 70：超买区域，可能回调</li>
              <li>RSI &lt; 30：超卖区域，可能反弹</li>
              <li>RSI背离：价格创新高但RSI未创新高，可能见顶</li>
              <li>RSI背离：价格创新低但RSI未创新低，可能见底</li>
            </ul>
          </div>
          <div class="detail-item">
            <h3>参数设置</h3>
            <p>常用参数：</p>
            <ul>
              <li>RSI6：短期，反应更敏感</li>
              <li>RSI12：中期，平衡敏感度</li>
              <li>RSI24：长期，更稳定</li>
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

const rsiOption = computed(() => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  legend: {
    data: ['RSI6', 'RSI12', 'RSI24'],
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
      name: 'RSI6',
      type: 'line',
      data: [65, 70, 75, 80, 75, 70, 65],
      smooth: true,
      lineStyle: {
        color: '#1890ff'
      },
      itemStyle: {
        color: '#1890ff'
      }
    },
    {
      name: 'RSI12',
      type: 'line',
      data: [55, 60, 65, 70, 65, 60, 55],
      smooth: true,
      lineStyle: {
        color: '#52c41a'
      },
      itemStyle: {
        color: '#52c41a'
      }
    },
    {
      name: 'RSI24',
      type: 'line',
      data: [45, 50, 55, 60, 55, 50, 45],
      smooth: true,
      lineStyle: {
        color: '#fa8c16'
      },
      itemStyle: {
        color: '#fa8c16'
      }
    }
  ]
}))
</script>

<script lang="ts">
export default {
  name: 'IndicatorRSI'
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