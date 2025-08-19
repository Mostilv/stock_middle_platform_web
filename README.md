# A股指标与调仓管理系统

一个基于 React + Vite + TypeScript + Tailwind CSS + Ant Design 的现代化 A 股投资管理平台。

## 🚀 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite 6.x
- **UI 组件库**: Ant Design 5.x
- **样式框架**: Tailwind CSS 4.x
- **路由管理**: React Router DOM 7.x
- **包管理器**: pnpm
- **开发语言**: TypeScript

## 📁 项目结构

```
src/
├── components/     # 通用组件
├── layouts/        # 布局组件
├── pages/          # 页面组件
├── hooks/          # 自定义 Hooks
├── utils/          # 工具函数
├── types/          # TypeScript 类型定义
├── assets/         # 静态资源
├── App.tsx         # 主应用组件
├── main.tsx        # 应用入口
└── index.css       # 全局样式
```

## 🎯 功能特性

### 📊 仪表盘
- 总资产概览
- 今日收益统计
- 资产配置分析
- 行业分布展示
- 持仓明细列表

### 📈 自定义指标
- 技术指标管理
- 自定义公式创建
- 指标状态控制
- 指标分类管理

### 💼 调仓管理
- 投资组合调仓
- 买入/卖出/持有操作
- 调仓状态跟踪
- 权重调整管理

### ⚙️ 系统设置
- 个人信息配置
- 界面主题设置
- 数据刷新配置
- 通知设置
- 风控参数配置

## 🛠️ 开发环境

### 环境要求
- Node.js >= 18.17.1 (推荐 >= 20.0.0)
- pnpm >= 10.0.0

### 安装依赖
```bash
pnpm install
```

### 启动开发服务器
```bash
pnpm run dev
```

### 构建生产版本
```bash
pnpm run build
```

### 预览生产版本
```bash
pnpm run preview
```

### 类型检查
```bash
pnpm run type-check
```

## 🎨 界面预览

项目采用现代化的设计风格，包含：

- **响应式布局**: 适配不同屏幕尺寸
- **深色/浅色主题**: 支持主题切换
- **侧边栏导航**: 可折叠的侧边栏菜单
- **数据可视化**: 丰富的图表和统计展示
- **交互式表格**: 支持排序、筛选、分页

## 📱 页面路由

- `/` - 仪表盘
- `/indicators` - 自定义指标
- `/portfolio` - 调仓管理
- `/settings` - 系统设置

## 🔧 配置说明

### Tailwind CSS 配置
项目使用 Tailwind CSS 进行样式管理，配置文件位于 `tailwind.config.js`。

### Ant Design 主题
通过 `ConfigProvider` 配置 Ant Design 主题，支持自定义主题色和组件样式。

### 路由配置
使用 React Router DOM 进行路由管理，支持嵌套路由和路由守卫。

## 🚀 部署

### 构建
```bash
pnpm run build
```

### 部署到静态服务器
将 `dist` 目录中的文件部署到任何静态文件服务器。

### 环境变量
项目支持环境变量配置，可在 `.env` 文件中配置相关参数。

## 📝 开发规范

- 使用 TypeScript 进行类型检查
- 遵循 ESLint 代码规范
- 组件采用函数式组件 + Hooks
- 使用 Tailwind CSS 进行样式开发
- 遵循 Ant Design 设计规范

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 📄 许可证

MIT License

## 📞 联系方式

如有问题或建议，请提交 Issue 或联系开发团队。
