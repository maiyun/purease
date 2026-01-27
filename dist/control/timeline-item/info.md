时间线项控件，作为 pe-timeline 的子组件，用于展示单个时间节点及其内容。

### 参数

#### direction

`'h'` | `'v'`

内容区布局方向，默认 `h`（水平）。设置为 `v` 时内容垂直排列。

#### gutter

`number` | `string`

内容区子元素间距，单位为像素。

#### alignH

`string` | `undefined`

水平对齐方式，可选 `left`/`start`、`center`、`right`/`end`。

#### alignV

`string` | `undefined`

垂直对齐方式，可选 `top`/`start`、`center`、`bottom`/`end`。

#### selected

`boolean`

是否为选中状态，默认 false。选中时节点显示高亮样式。

### 类属性

#### pe-selected

选中状态样式，节点显示主题色填充。

### 样式

采用 Flex 横向布局，左侧为时间节点圆点，右侧为内容区域。节点为 12px 圆形，带 2px 边框，默认白色背景。

节点下方通过伪元素绘制 2px 竖直连接线，连接到下一个时间项（最后一项不显示连接线）。连接线使用绝对定位，确保与节点对齐。

选中状态时节点边框和背景变为主题色，形成高亮效果。内容区支持水平或垂直布局，可通过 gutter 设置子元素间距。

### 示例

```html
<pe-timeline-item selected direction="v" gutter="5">
    <span style="color: var(--pe-note-color); font-size: 12px;">2026-01-27 14:30</span>
    <span>Event description</span>
</pe-timeline-item>
```
