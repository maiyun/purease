自动扫描左侧插槽内的标题（ h2-h6 ），为其生成唯一 id（从 0 开始，如 `anchor-0`），并设置滚动事件监听器用于实时更新当前选中的导航项

### 参数

### 类属性

### 方法

### 插槽

### 样式

类似 Ant Design 的 Anchor 锚点组件，采用左右分栏布局：左侧为内容区（弹性），右侧为固定宽度导航区（最小 200px），右侧导航根据实际内容会自动生成。

右侧导航采用粘性定位（sticky），始终保持在可视区域内。导航项垂直排列，左侧带 1px 边框线，根据标题层级（h2-h6）呈现递进缩进效果，选中项显示为加粗字体和主题色边框。

支持悬停高亮、点击平滑滚动、RTL 布局镜像翻转。在 800px 以下屏幕宽度时导航区自动隐藏。

### 示例

```html
<pe-anchor>
    <h2>Title 1</h2>
    <p>
        Test Test Test Test Test Test Test<br>
        Test Test Test Test Test Test Test<br>
        Test Test Test Test Test Test Test<br>
    </p>
    <h2>Title 2</h2>
    <p>
        Test Test
    </p>
    <h2>Title 3</h2>
    <p>
        Test Test
    </p>
    <h2>Title 4</h2>
    <p>
        Test Test
    </p>
    <h3>Title 5</h3>
    <p>
        Test Test
    </p>
    <h3>Title 6</h3>
    <p>
        Test Test
    </p>
</pe-anchor>
```