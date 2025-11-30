表格容器控件

### 参数

#### adaption

`boolean`

是否自适应布局（响应式，首列会在小屏模式下变为单独的行），默认 false

#### plain

`boolean`

是否为朴素风格，默认 false

### 方法

### 样式

类似 Ant Design 的 Table 表格，采用纵向弹性布局容器。带圆角、边框和弹窗阴影，行间带细分隔线。首行圆角上半部分，末行圆角下半部分。

plain 模式下无外边框和阴影（仅底部 1px 边框），首行底部边框加粗。响应式友好。

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