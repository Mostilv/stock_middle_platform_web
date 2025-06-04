<template>
  <div class="signal-table">
    <div class="page-header">
      <h2>信号列表</h2>
    </div>
    <a-card class="table-card">
      <a-table
        :columns="columns"
        :data-source="data"
        :pagination="{ pageSize: 10 }"
        :scroll="{ x: 1200 }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <a-tag :color="record.status === '买入' ? 'green' : 'red'">
              {{ record.status }}
            </a-tag>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const columns = [
  {
    title: '股票代码',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: '股票名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '信号类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '信号状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '触发时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '触发价格',
    dataIndex: 'price',
    key: 'price',
  },
]

const data = ref([
  {
    key: '1',
    code: '600000',
    name: '浦发银行',
    type: 'MACD金叉',
    status: '买入',
    time: '2024-01-20 10:30:00',
    price: '10.25',
  },
  {
    key: '2',
    code: '000001',
    name: '平安银行',
    type: 'KDJ死叉',
    status: '卖出',
    time: '2024-01-20 11:15:00',
    price: '15.80',
  },
])
</script>

<script lang="ts">
export default {
  name: 'SignalTable',
}
</script>

<style scoped>
.signal-table {
  width: 100%;
}

.page-header {
  margin-bottom: 24px;
}

.page-header h2 {
  color: var(--text-color);
  font-size: 24px;
  margin: 0;
}

.table-card {
  background: var(--content-bg);
  border-radius: 32px;
  box-shadow: var(--card-shadow);
}

.table-card :deep(.ant-card-body) {
  padding: 24px;
}

.table-card :deep(.ant-table) {
  background: var(--content-bg);
}

.table-card :deep(.ant-table-thead > tr > th) {
  background: var(--table-header-bg);
  color: var(--table-header-color);
  border-bottom: 1px solid var(--table-border-color);
}

.table-card :deep(.ant-table-tbody > tr > td) {
  border-bottom: 1px solid var(--table-border-color);
  color: var(--table-row-color);
  background: var(--table-row-bg);
}

.table-card :deep(.ant-table-tbody > tr:hover > td) {
  background: var(--table-row-hover-bg) !important;
}

.table-card :deep(.ant-table-tbody > tr.ant-table-row:hover > td) {
  background: var(--table-row-hover-bg) !important;
}

.table-card :deep(.ant-table-tbody > tr.ant-table-row-selected > td) {
  background: var(--table-row-hover-bg);
}

.table-card :deep(.ant-table-tbody > tr.ant-table-row-selected:hover > td) {
  background: var(--table-row-hover-bg) !important;
}

.table-card :deep(.ant-pagination) {
  margin-top: 16px;
  text-align: right;
}

.table-card :deep(.ant-pagination-item) {
  background: var(--content-bg);
  border-color: var(--border-color);
}

.table-card :deep(.ant-pagination-item a) {
  color: var(--text-color);
}

.table-card :deep(.ant-pagination-item-active) {
  border-color: var(--primary-color);
}

.table-card :deep(.ant-pagination-item-active a) {
  color: var(--primary-color);
}

.table-card :deep(.ant-pagination-prev .ant-pagination-item-link),
.table-card :deep(.ant-pagination-next .ant-pagination-item-link) {
  background: var(--content-bg);
  border-color: var(--border-color);
  color: var(--text-color);
}

.table-card :deep(.ant-pagination-disabled .ant-pagination-item-link) {
  background: var(--content-bg);
  border-color: var(--border-color);
  color: var(--text-color);
  opacity: 0.5;
}

.table-card :deep(.ant-table-pagination.ant-pagination) {
  margin: 16px 0;
}

.table-card :deep(.ant-table-thead > tr > th::before) {
  display: none;
}

.table-card :deep(.ant-btn-link) {
  color: var(--primary-color);
}

.table-card :deep(.ant-btn-link:hover) {
  color: var(--primary-color-hover);
}

.table-card :deep(.ant-btn-dangerous) {
  color: var(--error-color);
}

.table-card :deep(.ant-btn-dangerous:hover) {
  color: var(--error-color-hover);
}
</style> 