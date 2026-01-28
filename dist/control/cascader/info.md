级联选择控件，当数据集合有清晰的层级结构时，可通过级联选择器逐级查看并选择。支持异步加载子节点。

### 参数

#### modelValue

`string[]`

当前选中值数组，表示从根到叶子节点的完整路径

#### options

`Array<{ label?: string; value?: string; disabled?: boolean; leaf?: boolean; children?: ICascaderOption[] }>`

数据源，支持多层嵌套结构。leaf 字段用于 lazy 模式下标记是否为叶子节点

#### disabled

`boolean`

是否禁用，默认 false

#### plain

`boolean`

是否为朴素风格，默认 false

#### search

`boolean`

是否显示搜索框，默认 false

#### clearable

`boolean`

是否可清空，默认 false

#### showLastLevel

`boolean`

是否仅显示最后一级标签，默认 false 显示完整路径

#### separator

`string`

分隔符，默认 ' / '

#### expandTrigger

`'click' | 'hover'`

子菜单展开触发方式，默认 click

#### placeholder

`string`

占位文本

#### lazy

`boolean`

是否开启异步加载模式，默认 false。开启后需配合 lazyLoad 回调使用

#### lazyLoad

`(option: ICascaderOption | null, resolve: (children: ICascaderOption[]) => void) => void`

异步加载回调函数。option 为当前点击的选项（首次加载根节点时为 null），resolve 用于返回加载的子节点数组

### 类属性

#### pe-plain

朴素风格，无边框和阴影

#### pe-disabled

禁用状态

### 子类属性

### 方法

### 插槽

### 样式

类似 Element Plus 的 Cascader 级联选择器，采用横向弹性布局。主体为圆角矩形输入框样式，带边框和阴影，背景色支持悬停变浅。聚焦/按下时显示轮廓阴影。

标签区域弹性扩展且左对齐，支持文本溢出省略。右侧显示向下小箭头（CSS 伪元素实现）。支持 clearable 模式，悬停时显示清除按钮替换箭头。

点击弹出级联面板，面板由多个菜单列组成，每列显示当前级别的选项。选项支持选中高亮、禁用状态、带子级箭头指示。支持 hover 触发展开下级菜单。

支持 search 模式（顶部搜索框 + 搜索结果列表），搜索时显示完整路径匹配的结果。

大屏模式下面板横向排列，小屏模式下（max-width: 800px）面板纵向堆叠，每个菜单最大高度 200px。支持 RTL 布局。

### 事件

#### changed(event)

选中项改变事件

##### event

`ICascaderChangedEvent`

包含 value（选中值数组）和 labels（选中标签数组）

### 示例

```html
<pe-cascader style="width: 300px;" v-model="cascaderValue" :options="cascaderOptions" placeholder="请选择"></pe-cascader>
```

```ts
// 数据示例
const cascaderOptions = [
    {
        'label': '指南',
        'value': 'guide',
        'children': [
            {
                'label': '设计原则',
                'value': 'design',
                'children': [
                    { 'label': '一致', 'value': 'consistency' },
                    { 'label': '反馈', 'value': 'feedback' }
                ]
            },
            {
                'label': '导航',
                'value': 'navigation',
                'children': [
                    { 'label': '侧向导航', 'value': 'side' },
                    { 'label': '顶部导航', 'value': 'top' }
                ]
            }
        ]
    },
    {
        'label': '组件',
        'value': 'component',
        'children': [
            {
                'label': '基础组件',
                'value': 'basic',
                'children': [
                    { 'label': '按钮', 'value': 'button' },
                    { 'label': '图标', 'value': 'icon' }
                ]
            }
        ]
    }
];
```
