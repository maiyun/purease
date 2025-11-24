````markdown
左侧导航栏控件，支持响应式折叠

### 参数

### 类属性

### 方法

### 样式

类似 Ant Design 的 Layout 侧边栏布局。采用横向弹性布局，顶部偏移 header 高度。左侧为粘性定位侧边栏（顶部对齐 header 底部），高度自适应，右侧带 1px 边框，支持垂直滚动。右侧主内容区弹性扩展且可滚动。

800px 以下左侧栏切换为全屏抽屉模式：固定定位，半透明遮罩（rgba(0,0,0,.3)），侧边栏宽度 80%，白色背景带阴影，从左侧滑入。未显示时移除交互指针事件。

#### leftClick

`(e: MouseEvent) => void`

左侧区域点击事件处理，用于关闭导航栏

### 示例

```html
<pe-lnav>
    <div class="pe-lnav-left">
        <a href="/">首页</a>
        <a href="/about">关于</a>
        <a href="/products">产品</a>
    </div>
    <div class="pe-lnav-main">
        <!-- 主内容区域 -->
    </div>
</pe-lnav>
```
````