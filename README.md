# A 股指标平台前端

基于 React + TypeScript + Ant Design 构建的现代化 A 股指标与调仓管理系统，提供仪表盘、指标管理、调仓管理与系统设置等页面。

## 功能特性

### 🎯 仪表盘页面（大屏风格）
- 蓝黑主题与渐变背景，长时间查看不疲劳
- 右上角显示实时时间，可点击调整日期范围
- 顶部数字指标：上证、深证、创业板等关键指数
- 三列布局：左侧上证指数图，中部行业分布/资产配置，右侧深证成指图
- 响应式适配，窄屏自动堆叠

### 📊 指标管理页面
- 居中标题及说明
- 指标 CRUD：创建、查看、编辑、删除
- 分类管理：技术指标、自定义指标、基本面指标
- 状态切换：启用/禁用

### 💼 调仓管理页面
- 居中标题
- 调仓记录完整展示
- 统计卡片：待执行、已完成、总调仓数
- 操作状态：买入、卖出、持有等

### ⚙️ 系统设置页面
- 居中标题
- 个人信息、界面、数据、通知、风控等配置
- 支持主题与语言切换

## 技术栈
- React 18 + TypeScript
- Ant Design 5.x
- Styled Components + Tailwind CSS
- ECharts 图表
- React Router 6
- Vite + pnpm

## 开发环境
- Node.js >= 16
- pnpm >= 7

```bash
pnpm install      # 安装依赖
pnpm dev          # 启动开发服务器
pnpm build        # 构建生产版本
```

## 项目结构
```
src/
├── components/          # 公共组件
│  ├── EChart.tsx        # ECharts 封装
│  └── Layout/           # 布局组件
├── pages/
│  ├── Dashboard/        # 仪表盘
│  ├── Indicators/       # 指标管理
│  ├── Portfolio/        # 调仓管理
│  └── Settings/         # 系统设置
├── styles/              # 全局样式
├── types/               # TS 类型
└── utils/               # 工具函数
```

## 设计亮点

### 🎨 视觉
- 大屏布局，适合监控
- 蓝黑主题与毛玻璃效果
- 渐变边框提升观感

### 📱 体验
- 时间与数据实时更新
- 交互反馈完整（悬停、点击）
- 响应式布局，兼容桌面与移动
- 具备辅助功能（键盘导航、可读标签）

## 开发规范
- 全量 TypeScript 类型检查
- 遵循 ESLint 规则
- 使用函数式组件 + Hooks
- 样式采用 Styled Components 封装

## 浏览器支持
- Chrome >= 88
- Firefox >= 85
- Safari >= 14
- Edge >= 88

## 许可
MIT License
