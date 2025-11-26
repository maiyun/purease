表格表头单元格控件

### 参数

### 类属性

### 方法

### 样式

表格表头单元格，带小内边距、加粗文字，文本居中对齐。

### 示例

```html
<pe-table>
    <pe-table-row>
        <pe-table-head>Head1</pe-table-head>
        <pe-table-head>Head2</pe-table-head>
        <pe-table-head>Head3</pe-table-head>
    </pe-table-row>
    <pe-table-row v-for="i of 5">
        <pe-table-cell>Cell1</pe-table-cell>
        <pe-table-cell>Cell2</pe-table-cell>
        <pe-table-cell>Cell3</pe-table-cell>
    </pe-table-row>
</pe-table>
```