折叠面板容器控件，通过展开/折叠来显示或隐藏内容区域，支持手风琴模式。

### 参数

#### modelValue

`string` | `string[]`

当前展开的面板名称，手风琴模式下为字符串，普通模式下为字符串数组，默认空数组

#### accordion

`boolean`

是否为手风琴模式（同时只能展开一个面板），默认 false

### 类属性

### 方法

### 插槽

### 样式

类似 Element Plus 的 Collapse 折叠面板组件，采用垂直堆叠布局。容器带 1px 边框、圆角和白色背景，内部面板项通过边框线分隔。

每个面板项（pe-collapse-item）包含标题区和内容区。标题区可点击切换展开状态，右侧带箭头图标指示当前状态。内容区展开时平滑过渡显示，收起时高度过渡为 0。

支持手风琴模式（同时只展开一个面板）、禁用状态、RTL 布局。响应式友好，在各种屏幕尺寸下保持良好的可用性。

### 示例

```html
<pe-collapse v-model="activeNames">
    <pe-collapse-item title="Panel 1" name="1">
        Content of panel 1
    </pe-collapse-item>
    <pe-collapse-item title="Panel 2" name="2">
        Content of panel 2
    </pe-collapse-item>
    <pe-collapse-item title="Panel 3" name="3" disabled>
        Content of panel 3 (disabled)
    </pe-collapse-item>
</pe-collapse>
```
