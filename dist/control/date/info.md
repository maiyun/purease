日期时间选择器控件，支持日期、时间和时区选择

### 参数

#### disabled

`boolean`

是否禁用，默认 false

#### modelValue

`number` | `undefined`

当前日期时间戳，毫秒

#### tz

`number` | `undefined`

时区，如 8，支持 v-model

#### yearmonth

`string`

年份月份的组合，如 200708，自动跳转到此页面但不选中，支持 v-model

#### hourminute

`string`

时分秒的字符串，跳转也自动选中，支持 v-model

#### start

`number` | `undefined`

限定可选的最小时间

#### end

`number` | `undefined`

限定可选的最大时间

#### date

`boolean`

是否显示日期，默认 true

#### time

`boolean`

是否显示时间，默认 true

#### zone

`boolean`

是否显示时区，默认 false

### 类属性

### 方法

### 插槽

### 样式

类似 Element Plus 的 DatePicker，采用弹性布局容器，带圆角边框和过渡动画。主体为横向排列的日期/时间显示区和清除按钮，右侧显示清除图标（悬停时完全不透明）。

点击触发弹出日期/时间选择面板，支持日期面板或时分秒列表双模式。时区选择以独立弹窗展示，包含时区和分钟偏移列表。所有交互元素均支持悬停高亮和按下反馈。

禁用状态下显示禁用样式，背景色和边框色使用主题变量。支持单独控制日期、时间、时区的显隐。

### 事件

#### changed(event)

日期时间改变事件

##### event

`IDateChangedEvent`

### 示例

```html
<pe-date v-model="dts" v-model:tz="dptz" :date="ddate" :time="dptime" :zone="dpzone" :disabled="dpdisabled" :start="dpstart ? 1704067200_000 : undefined" v-model:yearmonth="dpym" v-model:hourminute="dphm">
    <template v-if="dpbottom" v-slot="d">
        <div class="pe-layout" style="flex: 1; justify-content: center;">{{d.year}}</div>
    </template>
</pe-date>
```