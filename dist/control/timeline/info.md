时间线容器控件，用于展示时间流信息或事件历程，通常包含多个时间线项。

### 样式

采用垂直堆叠的 Flex 布局。作为容器组件，本身不带边框和背景，仅负责组织内部时间线项的排列。

时间线项（pe-timeline-item）垂直排列，每项左侧显示时间节点圆点，右侧显示内容区域。节点间通过竖直连接线串联，最后一项不显示连接线。

支持选中状态高亮、RTL 布局。响应式友好，在各种屏幕尺寸下保持良好的可用性。

### 示例

```html
<pe-timeline>
    <pe-timeline-item selected>
        <div>2026-01-27 14:30</div>
        <div>Event content 1</div>
    </pe-timeline-item>
    <pe-timeline-item>
        <div>2026-01-26 10:00</div>
        <div>Event content 2</div>
    </pe-timeline-item>
    <pe-timeline-item>
        <div>2026-01-25 09:00</div>
        <div>Event content 3</div>
    </pe-timeline-item>
</pe-timeline>
```
