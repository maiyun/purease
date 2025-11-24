````markdown
表格容器控件

### 参数

#### adaption

`boolean`

是否自适应布局（响应式），默认 false

#### plain

`boolean`

是否为朴素风格，默认 false

### 类属性

#### controlName

`string`

控件名称标识

#### headCount

`number`

表头单元格数量

### 方法

### 样式

类似 Ant Design 的 Table 表格，采用纵向弹性布局容器。带圆角、边框和弹窗阴影，行间带细分隔线。首行圆角上半部分，末行圆角下半部分。

plain 模式下无外边框和阴影（仅底部 1px 边框），首行底部边框加粗。响应式友好。

### 示例

```html
<pe-table :adaption="true">
    <pe-table-row :title="true">
        <pe-table-head>姓名</pe-table-head>
        <pe-table-head>年龄</pe-table-head>
        <pe-table-head>城市</pe-table-head>
    </pe-table-row>
    <pe-table-row>
        <pe-table-cell>张三</pe-table-cell>
        <pe-table-cell>25</pe-table-cell>
        <pe-table-cell>北京</pe-table-cell>
    </pe-table-row>
    <pe-table-row>
        <pe-table-cell>李四</pe-table-cell>
        <pe-table-cell>30</pe-table-cell>
        <pe-table-cell>上海</pe-table-cell>
    </pe-table-row>
</pe-table>
```
````