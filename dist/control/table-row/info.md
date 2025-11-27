表格行控件

### 参数

#### title

`boolean`

是否为标题行（表头行），默认 false

### 类属性

### 方法

### 样式

表格行，采用 CSS Grid 布局（列数通过 CSS 变量 --pe-cols 控制），输入框背景色，悬停时背景变浅，过渡动画流畅。

title 模式下首列文字加粗。表头行（table-header）粘性定位（top 为 header 高度）。移动端自适应模式（adaption）下，表头首列隐藏，行变为减一列的网格，首列跨越全部剩余列宽度。

### 示例

```html
<pe-table adaption plain>
    <pe-table-row>
        <pe-table-head>Title</pe-table-head>
        <pe-table-head>Head1</pe-table-head>
        <pe-table-head>Head2</pe-table-head>
    </pe-table-row>
    <pe-table-row v-for="i of 3">
        <pe-table-cell>Title</pe-table-cell>
        <pe-table-cell>Cell1</pe-table-cell>
        <pe-table-cell>Cell2</pe-table-cell>
    </pe-table-row>
    <pe-table-row title>
        <pe-table-cell>Sub title</pe-table-cell>
    </pe-table-row>
    <pe-table-row v-for="i of 2">
        <pe-table-cell>Title</pe-table-cell>
        <pe-table-cell>Cell1</pe-table-cell>
        <pe-table-cell>Cell2</pe-table-cell>
    </pe-table-row>
</pe-table>
```