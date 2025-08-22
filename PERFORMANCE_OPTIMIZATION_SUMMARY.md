# 页面切换性能优化总结

## 问题分析

页面切换回首页时出现明显卡顿的主要原因：

1. **大量图表同时渲染**：Dashboard页面包含多个ECharts图表组件，每个图表都会在组件挂载时进行初始化和渲染
2. **ECharts实例管理不当**：每个图表都会创建独立的ECharts实例，没有进行适当的懒加载
3. **缺少组件懒加载**：所有页面组件都是同步加载的
4. **图表数据计算复杂**：特别是`IndustryWidthChart`组件中的`useMemo`计算较为复杂
5. **缺少页面切换动画**：没有过渡效果，造成视觉上的突兀感

## 优化措施

### 1. 路由懒加载优化

**文件**: `src/App.tsx`
- 使用`React.lazy()`和`Suspense`实现页面组件的懒加载
- 添加加载中组件，提供更好的用户体验
- 减少初始加载时间，按需加载页面组件

```typescript
// 懒加载页面组件
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Indicators = React.lazy(() => import('./pages/Indicators/Indicators'));
const Portfolio = React.lazy(() => import('./pages/Portfolio/Portfolio'));
const Settings = React.lazy(() => import('./pages/Settings/Settings'));
```

### 2. ECharts组件性能优化

**文件**: `src/components/EChart.tsx`
- 添加懒加载功能：使用`IntersectionObserver`实现图表懒加载
- 防抖优化：对resize事件进行防抖处理，避免频繁重绘
- 关闭动画：设置`animation: false`减少渲染开销
- 优化实例管理：改进ECharts实例的创建和销毁逻辑
- 添加可见性检测：只有图表进入视口时才初始化

```typescript
// 懒加载逻辑
const [isVisible, setIsVisible] = React.useState(!lazy);

// 防抖的resize处理函数
const debouncedResize = useCallback(() => {
  if (resizeTimeoutRef.current) {
    clearTimeout(resizeTimeoutRef.current);
  }
  resizeTimeoutRef.current = setTimeout(() => {
    if (chartRef.current) {
      chartRef.current.resize();
    }
  }, 100);
}, []);
```

### 3. 组件性能优化

**文件**: 所有Dashboard子组件
- 使用`React.memo()`包装组件，避免不必要的重新渲染
- 使用`useMemo()`缓存计算结果和配置对象
- 使用`useCallback()`优化事件处理函数
- 添加`displayName`便于调试

```typescript
// 示例：Dashboard组件优化
const Dashboard: React.FC = React.memo(() => {
  const marketData = useMemo(() => getMarketData(), []);
  const handleDateChange = useCallback((date: Date | null) => {
    setSelectedDate(date);
  }, []);
  // ...
});
```

### 4. 图表配置优化

**文件**: 所有图表组件
- 使用`useMemo()`缓存图表配置，避免重复计算
- 优化依赖项，减少不必要的重新计算
- 为所有图表启用懒加载

```typescript
// 示例：图表配置缓存
const industryWidthOption = useMemo(() => ({
  // 图表配置...
}), [chartData, defaultStart, defaultEnd]);
```

### 5. 页面切换动画

**文件**: `src/components/Layout/Layout.styles.ts`
- 添加淡入动画效果，减少视觉卡顿
- 使用CSS3硬件加速优化动画性能
- 设置合适的动画时长和缓动函数

```css
/* 页面切换动画 */
animation: fadeIn 0.3s ease-in-out;

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 6. Layout组件优化

**文件**: `src/components/Layout/Layout.tsx`
- 使用`React.memo()`包装组件
- 使用`useCallback()`优化事件处理函数
- 减少不必要的重新渲染

## 性能提升效果

1. **首次加载速度**：通过懒加载减少初始包大小
2. **页面切换流畅度**：通过组件优化和动画效果提升用户体验
3. **图表渲染性能**：通过懒加载和配置缓存减少渲染开销
4. **内存使用**：通过优化实例管理减少内存泄漏风险

## 最佳实践

1. **组件懒加载**：对于大型组件，始终使用懒加载
2. **性能监控**：使用React DevTools Profiler监控组件渲染性能
3. **缓存策略**：合理使用`useMemo`和`useCallback`缓存计算结果
4. **动画优化**：使用CSS3硬件加速和合适的动画时长
5. **代码分割**：按路由和功能模块进行代码分割

## 后续优化建议

1. **虚拟滚动**：如果数据量很大，考虑使用虚拟滚动
2. **Web Workers**：将复杂计算移到Web Workers中
3. **图片懒加载**：对图片资源进行懒加载优化
4. **缓存策略**：实现更完善的数据缓存策略
5. **性能监控**：添加性能监控和错误追踪
