下拉选择控件

### 参数

#### modelValue

`string`

当前选中的值

#### data

`Array<string | { label?: string; value?: string; disabled?: boolean }>`

数据源，可以是字符串数组或对象数组也可以混用

#### disabled

`boolean`

是否禁用，默认 false

#### plain

`boolean`

是否为朴素风格，默认 false

#### search

`boolean`

是否显示搜索框，默认 false

### 类属性

### 方法

### 插槽

### 样式

类似 Ant Design 的 Select 选择器，采用横向弹性布局。主体为圆角矩形输入框样式，带边框和阴影，背景色支持悬停变浅。聚焦/按下时显示轮廓阴影。

标签区域弹性扩展且左对齐，右侧显示向下小箭头（CSS 伪元素实现，旋转 45 度）。点击弹出下拉列表（dlist 组件），单行不换行。支持 search 模式（顶部搜索框+下拉列表），列表最大高度 350px 可滚动。

支持 plain 模式（无边框和阴影）。禁用状态下交互禁用。

### 事件

#### changed(event)

选中项改变事件

##### event

`ISelectChangedEvent`

### 示例

```html
<pe-select style="width: 200px;" v-model="dbottom" :data="['default', 'dark']"></pe-select>
```