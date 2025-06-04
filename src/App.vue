<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { DownOutlined, BulbOutlined } from '@ant-design/icons-vue'
import IndicatorMACD from './components/IndicatorMACD.vue'
import IndicatorKDJ from './components/IndicatorKDJ.vue'
import SignalTable from './components/SignalTable.vue'
import IndicatorMgrTable from './components/IndicatorMgrTable.vue'
import HomePage from './components/HomePage.vue'

const theme = ref<'light' | 'dark'>('dark')

const menuItems = [
  { key: 'home', label: '首页' },
  {
    key: 'tech',
    label: '技术指标',
    children: [
      { key: 'indicator-mgr', label: '指标管理' },
      { key: 'indicator-1', label: '指标1' },
      { key: 'indicator-2', label: '指标2' },
    ],
  },
  { key: 'signal', label: '交易信号中台' },
]

const menuItemsWithoutChildren = computed(() => menuItems.filter(i => !i.children))
const menuItemsWithChildren = computed(() => menuItems.filter(i => i.children))

const selectedKey = ref('home')

function onMenuClick(e: any) {
  selectedKey.value = e.key
}

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  document.body.setAttribute('data-theme', theme.value)
}

onMounted(() => {
  // 确保首次加载时应用深色主题
  document.body.setAttribute('data-theme', theme.value)
})
</script>

<template>
  <div :class="['main-app', theme]">
    <header class="header-bar">
      <div class="header-content">
        <a-menu
          mode="horizontal"
          :selectedKeys="[selectedKey]"
          @click="onMenuClick"
          class="top-menu"
        >
          <a-menu-item v-for="item in menuItemsWithoutChildren" :key="item.key">
            {{ item.label }}
          </a-menu-item>
          <a-sub-menu v-for="item in menuItemsWithChildren" :key="item.key">
            <template #title>
              {{ item.label }} <DownOutlined />
            </template>
            <a-menu-item v-for="sub in item.children" :key="sub.key">{{ sub.label }}</a-menu-item>
          </a-sub-menu>
        </a-menu>
        <div class="theme-toggle" @click="toggleTheme">
          <BulbOutlined />
          <span>{{ theme === 'dark' ? '深色' : '浅色' }}</span>
        </div>
      </div>
    </header>
    <main class="main-content">
      <div class="content-wrapper">
        <HomePage v-if="selectedKey === 'home'" />
        <IndicatorMgrTable v-else-if="selectedKey === 'indicator-mgr'" />
        <IndicatorMACD v-else-if="selectedKey === 'indicator-1'" />
        <IndicatorKDJ v-else-if="selectedKey === 'indicator-2'" />
        <SignalTable v-else-if="selectedKey === 'signal'" />
      </div>
    </main>
  </div>
</template>

<style scoped>
.main-app {
  min-height: 100vh;
  background: var(--bg-color);
  transition: background 0.3s;
}

.header-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: var(--bg-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.header-content {
  width: 100%;
  max-width: var(--content-width-xxl);
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 64px;
}

.top-menu {
  background: transparent;
  padding: 0 48px;
  font-size: 20px;
  font-weight: 600;
  min-width: 700px;
  display: flex;
  justify-content: center;
}

.top-menu :deep(.ant-menu-item),
.top-menu :deep(.ant-menu-submenu-title) {
  color: var(--menu-text-color);
  height: 48px;
  line-height: 48px;
  margin: 8px 4px;
  border-radius: 24px;
  transition: all 0.3s;
}

.top-menu :deep(.ant-menu-item:hover),
.top-menu :deep(.ant-menu-submenu-title:hover) {
  color: var(--primary-color) !important;
  background: var(--menu-hover-bg) !important;
}

.top-menu :deep(.ant-menu-item-selected) {
  color: var(--menu-active-color) !important;
  background: var(--menu-active-bg) !important;
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);
}

.top-menu :deep(.ant-menu-submenu-popup) {
  background: var(--dropdown-bg);
}

.top-menu :deep(.ant-menu-submenu-popup .ant-menu-item) {
  color: var(--dropdown-text);
  margin: 0;
  border-radius: 0;
}

.top-menu :deep(.ant-menu-submenu-popup .ant-menu-item:hover) {
  background: var(--dropdown-hover-bg) !important;
}

.top-menu :deep(.ant-menu-submenu-popup .ant-menu-item-selected) {
  color: var(--menu-active-color) !important;
  background: var(--menu-active-bg) !important;
}

.theme-toggle {
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  color: var(--text-color);
  background: var(--content-bg);
  border-radius: 20px;
  padding: 6px 18px;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.06);
  transition: all 0.3s;
}

.theme-toggle:hover {
  background: var(--hover-bg);
}

.theme-toggle .anticon {
  font-size: 18px;
  color: var(--text-color);
}

[data-theme="dark"] .theme-toggle {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
}

[data-theme="dark"] .theme-toggle:hover {
  background: rgba(255, 255, 255, 0.2);
}

[data-theme="dark"] .theme-toggle .anticon {
  color: #ffffff;
}

.main-content {
  padding-top: 88px;
  min-height: calc(100vh - 88px);
}

.content-wrapper {
  width: 100%;
  max-width: var(--content-width-xxl);
  margin: 0 auto;
  padding: 24px;
}

@media (max-width: 1400px) {
  .content-wrapper {
    max-width: var(--content-width-xl);
  }
}

@media (max-width: 1200px) {
  .content-wrapper {
    max-width: var(--content-width-lg);
  }
}

@media (max-width: 992px) {
  .content-wrapper {
    max-width: var(--content-width-md);
  }
}

@media (max-width: 768px) {
  .content-wrapper {
    max-width: var(--content-width-sm);
  }
}

@media (max-width: 576px) {
  .content-wrapper {
    max-width: var(--content-width-xs);
    padding: 16px;
  }
}

.market-overview {
  grid-column: 1 / -1;
  background: var(--content-bg);
  border-radius: 32px;
  padding: 24px;
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.10);
}

.market-card {
  background: var(--content-bg);
  border-radius: 32px;
  padding: 24px;
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.10);
  height: 400px;
}

.market-card h3 {
  margin: 0 0 16px 0;
  font-size: 18px;
  color: var(--content-color);
}

.theme-switch {
  margin-left: 16px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.3s;
  color: var(--text-color);
  background: transparent;
  border: 1px solid var(--border-color);
}

.theme-switch:hover {
  background: var(--hover-bg);
}

.theme-switch .anticon {
  font-size: 16px;
  color: var(--text-color);
}

[data-theme="dark"] .theme-switch {
  color: #ffffff;
  border-color: #ffffff;
}

[data-theme="dark"] .theme-switch:hover {
  background: rgba(255, 255, 255, 0.1);
}

[data-theme="dark"] .theme-switch .anticon {
  color: #ffffff;
}
</style>
