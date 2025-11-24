日期范围选择器控件，支持选择一个时间范围

### 参数

#### disabled

`boolean`

是否禁用，默认 false

#### modelValue

`number[]`

当前时间范围，数组 [开始时间戳, 结束时间戳]

#### tz

`number` | `undefined`

时区，如 8，支持 v-model

#### start

`number` | `undefined`

限定可选的最小时间

#### end

`number` | `undefined`

限定可选的最大时间

#### time

`boolean`

是否显示时间，默认 true

#### zone

`boolean`

是否显示时区，默认 false

### 类属性

### 方法

### 样式

类似 Element Plus 的 DateRangePicker，采用弹性布局容器。主体显示「开始日期 - 结束日期」格式，支持同时显示时间信息。右侧带清除按钮（悬停时不透明度提升）。

点击弹出双日期面板横向排列，左右面板间有分隔线。支持在两个面板间进行范围选择，选中区间以连续高亮显示。时区选择以独立弹窗展示列表选择器。

所有交互元素均有悬停和按下状态反馈。禁用状态下显示禁用样式。响应式下自动调整面板显示。

### 事件

### 示例

```html
<pe-daterange v-model="drts" v-model:tz="dptz" :time="dptime" :zone="dpzone" :disabled="dpdisabled" :start="dpstart ? 1706745600 : undefined">
    <template v-if="dpbottom" v-slot="d">
        <div class="pe-layout" style="flex: 1; justify-content: center;">{{d.year}}</div>
    </template>
</pe-daterange>
```
