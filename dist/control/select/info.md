````markdown
下拉选择控件

### 参数

#### modelValue

`string`

当前选中的值

#### data

`Array<string | { label?: string; value?: string; disabled?: boolean }>`

数据源，可以是字符串数组或对象数组

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

#### label

`string`

当前显示的标签文本

#### value

`string`

当前选中的值

#### searchValue

`string`

搜索关键词

#### dataComp

`Array<{ label: string; value: string; disabled: boolean }>`

格式化后的数据

#### searchComp

`Array<{ label: string; value: string; disabled: boolean }>`

搜索过滤后的数据

### 方法

### 样式

类似 Ant Design 的 Select 选择器，采用横向弹性布局。主体为圆角矩形输入框样式，带边框和阴影，背景色支持悬停变浅。聚焦/按下时显示轮廓阴影。

标签区域弹性扩展且左对齐，右侧显示向下小箭头（CSS 伪元素实现，旋转 45 度）。点击弹出下拉列表（dlist 组件），单行不换行。支持 search 模式（顶部搜索框+下拉列表），列表最大高度 350px 可滚动。

支持 plain 模式（无边框和阴影）。禁用状态下交互禁用。

#### open

`(e: MouseEvent) => void`

打开下拉框

#### onModelValue

`(v: string) => void`

处理值改变

#### click

`(e: lControl.IDlistClickEvent) => void`

点击选项事件

### 事件

#### changed

选中项改变事件，返回 `ISelectChangedEvent` 对象

#### update:modelValue

双向绑定值更新事件

### 示例

```html
<pe-select v-model="selectedValue" :data="options" :search="true" @changed="onSelectChanged"></pe-select>
```

```typescript
const selectedValue = ref('option1');
const options = [
    { label: '选项1', value: 'option1' },
    { label: '选项2', value: 'option2' },
    { label: '选项3', value: 'option3', disabled: true }
];

function onSelectChanged(e: lControl.ISelectChangedEvent) {
    console.log('选中:', e.detail.label, e.detail.value);
}
```
````