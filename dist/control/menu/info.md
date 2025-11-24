````markdown
下拉菜单控件，通常配合 header-item 使用

### 参数

### 类属性

### 方法

### 样式

类似 Ant Design 的 Dropdown Menu，采用绝对定位的下拉菜单。白色背景、圆角、柔和阴影，初始状态透明且向下偏移 10px，悬停父级时平滑展开（不透明度和位移过渡）。

菜单项采用纵向排列，左右不等内边距，悬停时显示主题色背景和文字、圆角高亮。最小宽度 180px，单行不换行。rev 主题下无阴影。z-index 为 1。

### 示例

```html
<pe-header-item>
    产品
    <pe-menu>
        <a class="pe-menu-item" href="/product1">产品1</a>
        <a class="pe-menu-item" href="/product2">产品2</a>
        <a class="pe-menu-item" href="/product3">产品3</a>
    </pe-menu>
</pe-header-item>
```
````