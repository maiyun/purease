自动扫描左侧插槽内的标题（h2-h6），基于标题文本生成语义化的 slug 作为 id（如 `title-1`、`getting-started`），并设置滚动事件监听器用于实时更新当前选中的导航项。

### 参数

### 类属性

### 方法

| 方法名 | 参数 | 说明 |
| --- | --- | --- |
| scrollTo | id: string | 滚动到指定 id 的标题位置 |

### 插槽

### 样式

类似 Ant Design 的 Anchor 锚点组件，采用左右分栏布局：左侧为内容区（弹性），右侧为固定宽度导航区（最小 200px），右侧导航根据实际内容会自动生成。

右侧导航采用粘性定位（sticky），始终保持在可视区域内，最大高度为视口高度减去顶部间距，超出部分可滚动查看。导航项垂直排列，左侧带 1px 边框线，根据标题层级（h2-h6）呈现递进缩进效果，选中项显示为加粗字体和主题色边框。当选中项变化时，导航区会自动滚动以确保选中项在可视范围内。

支持悬停高亮、点击平滑滚动、RTL 布局镜像翻转。在 800px 以下屏幕宽度时导航区自动隐藏。滚动事件采用 50ms 节流优化性能，组件卸载时自动清理事件监听器。

### 示例

```html
<pe-anchor>
    <h2>Getting Started</h2>
    <p>
        Test Test Test Test Test Test Test<br>
        Test Test Test Test Test Test Test<br>
        Test Test Test Test Test Test Test<br>
    </p>
    <h2>Installation</h2>
    <p>
        Test Test
    </p>
    <h2>Configuration</h2>
    <p>
        Test Test
    </p>
    <h2>API Reference</h2>
    <p>
        Test Test
    </p>
    <h3>Methods</h3>
    <p>
        Test Test
    </p>
    <h3>Events</h3>
    <p>
        Test Test
    </p>
</pe-anchor>
```