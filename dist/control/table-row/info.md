````markdown
表格行控件

### 参数

#### title

`boolean`

是否为标题行（表头行），默认 false

### 类属性

#### controlName

`string`

控件名称标识

#### headCount

`number`

当前行的表头单元格数量

#### table

`purease.IVue` | `null`

父级 table 控件引用

#### index

`number`

当前行在表格中的索引

#### isAdaption

`boolean`

是否为自适应布局模式

### 方法

### 样式

表格行，采用 CSS Grid 布局（列数通过 CSS 变量 --pe-cols 控制），输入框背景色，悬停时背景变浅，过渡动画流畅。

title 模式下首列文字加粗。表头行（table-header）粘性定位（top 为 header 高度）。移动端自适应模式（adaption）下，表头首列隐藏，行变为减一列的网格，首列跨越全部剩余列宽度。

#### updateHeadCount

`(o: '+' | '-') => void`

更新表头数量计数

### 示例

```html
<pe-table>
    <pe-table-row :title="true">
        <pe-table-head>姓名</pe-table-head>
        <pe-table-head>年龄</pe-table-head>
    </pe-table-row>
    <pe-table-row>
        <pe-table-cell>张三</pe-table-cell>
        <pe-table-cell>25</pe-table-cell>
    </pe-table-row>
</pe-table>
```
````