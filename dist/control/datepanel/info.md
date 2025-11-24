日期面板控件，提供日历视图选择日期

### 参数

#### disabled

`boolean`

是否禁用，默认 false

#### readonly

`boolean`

是否只读，默认 false

#### plain

`boolean`

是否朴素模式，默认 false

#### modelValue

`number` | `undefined`

当前时间戳，毫秒

#### start

`number` | `undefined`

限定可选的最小时间

#### end

`number` | `undefined`

限定可选的最大时间

#### tz

`number` | `undefined`

时区，如 8，支持 v-model

#### yearmonth

`string`

年份月份的组合，如 200708，支持 v-model

#### hourminute

`string`

时分秒的字符串，支持 v-model

#### cursor

`string`

光标日期，如 `20070831`，支持 v-model

#### jump

`boolean`

是否跳转，默认 true

#### time

`boolean`

是否显示时间，默认 true

#### zone

`boolean`

是否显示时区，默认 false

#### range

`boolean`

是否范围选择，默认 false

#### clearbtn

`boolean`

是否显示清除按钮，默认 true

#### backbtn

`boolean`

是否显示返回按钮，默认 true

### 类属性

### 方法

### 样式

类似 Ant Design 的 Calendar 组件，采用弹性列布局。顶部为年月选择器和控制按钮（清空、返回、今天），中间为星期标题行，主体为 7×6 日期网格，底部可选时间和时区选择器。

日期单元格支持自定义内容插槽，选中项显示主题色背景和边框。范围选择模式下，区间内日期连续高亮显示，首尾日期边角圆角处理。悬停时单元格显示主题色边框，点击时带阴影反馈。

支持 plain 模式（无边框）和 disabled 禁用状态。非当月日期显示为禁用色。响应式友好，支持触摸交互。

### 事件

#### changed(event)

日期改变事件

##### event

`IDatepanelChangedEvent`

#### selected(event)

日期选中事件

##### event

`IDatepanelSelectedEvent`

#### range(event)

范围选择事件

##### event

`IDatepanelRangeEvent`

### 示例

```html
<pe-datepanel v-show="showTwoDatePanel" plain :tz="tzData" hourminute="235959" :time="propBoolean('time')" :modelValue="ts2" v-model:cursor="cursor" range :start="ts" :end="end" :clearbtn="false" :backbtn="false" ref="endpanel" @range="onRange" :yearmonth="endym" @update:yearmonth="endym=$event;onYmChange()" :jump="false">
    <template v-if="$slots['default']" v-slot="col">
        <slot :year="col.year" :month="col.month" :date="col.date" :day="col.day" :str="col.str" :time="col.time"></slot>
    </template>
</pe-datepanel>
```