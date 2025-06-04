# 股票中间平台前端

## 项目简介
这是一个基于Vue 3和TypeScript开发的股票中间平台前端项目，提供了现代化的用户界面和交互体验。

## 技术栈
- Vue 3
- TypeScript
- Vite
- Vue Router
- Pinia (状态管理)
- Element Plus (UI组件库)
- Axios (HTTP客户端)

## 主要功能
1. 股票数据可视化展示
2. 实时数据更新
3. 用户友好的交互界面
4. 响应式设计

## 项目结构
```
stock_middle_platform_web/
├── src/                    # 源代码目录
│   ├── assets/            # 静态资源
│   ├── components/        # 组件
│   ├── views/             # 页面视图
│   ├── router/            # 路由配置
│   ├── store/             # 状态管理
│   ├── api/               # API接口
│   └── utils/             # 工具函数
├── public/                # 公共资源
└── package.json          # 项目配置
```

## 快速开始

### 环境要求
- Node.js 16+
- pnpm 或 npm

### 安装依赖
```bash
pnpm install
```

### 开发环境运行
```bash
pnpm dev
```

### 生产环境构建
```bash
pnpm build
```

## 开发说明
1. 使用 `<script setup>` 语法糖编写组件
2. 采用组合式API (Composition API)
3. 使用TypeScript进行类型检查
4. 遵循Vue 3最佳实践

## 注意事项
- 确保Node.js版本兼容
- 开发时注意代码规范和类型定义
- 建议使用VSCode进行开发，并安装推荐的插件
