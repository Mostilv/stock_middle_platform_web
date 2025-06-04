<template>
  <div class="indicator-mgr">
    <div class="page-header">
      <h2>指标管理</h2>
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
            <a-tag :color="record.status === '启用' ? 'green' : 'red'">
              {{ record.status }}
            </a-tag>
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a-button type="link" size="small">编辑</a-button>
              <a-button type="link" size="small" danger>删除</a-button>
            </a-space>
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
    title: '指标名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '指标类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '参数设置',
    dataIndex: 'params',
    key: 'params',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 120,
  },
]

const data = ref([
  {
    key: '1',
    name: 'MACD',
    type: '趋势指标',
    params: '12,26,9',
    status: '启用',
    createTime: '2024-01-20 10:30:00',
  },
  {
    key: '2',
    name: 'KDJ',
    type: '震荡指标',
    params: '9,3,3',
    status: '启用',
    createTime: '2024-01-20 11:15:00',
  },
])
</script>

<script lang="ts">
export default {
  name: 'IndicatorMgrTable',
}
</script>

<style scoped>
.indicator-mgr {
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