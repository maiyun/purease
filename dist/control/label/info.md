````markdown
标签控件，支持普通文本、提示和日期显示模式

### 参数

#### mode

`'default'` | `'tip'` | `'mtip'` | `'date'`

显示模式，默认 default
- default: 普通文本模式
- tip: 提示模式
- mtip: 多行提示模式
- date: 日期模式

#### content

`string` | `number`

内容文本或时间戳（当 mode 为 date 时为时间戳）

#### time

`boolean`

是否显示时间，默认 true（仅在 date 模式下有效）

#### date

`boolean`

是否显示日期，默认 true（仅在 date 模式下有效）

#### zone

`boolean`

是否显示时区，默认 false（仅在 date 模式下有效）

#### tz

`number` | `undefined`

时区偏移量，不设置则使用本地时区（仅在 date 模式下有效）

### 类属性

#### contentComp

`string`

计算后的显示内容

### 方法

### 样式

简洁的内联弹性布局标签。默认模式（default）为普通文本显示，tip 模式显示为注释色文字，mtip 模式在 tip 基础上增加顶部间距 10px。

date 模式支持格式化时间戳显示，根据 time、date、zone 参数动态组合输出格式。所有文字垂直居中对齐。

### 示例

```html
<!-- 普通文本 -->
<pe-label mode="default" content="这是一段文本"></pe-label>

<!-- 提示模式 -->
<pe-label mode="tip" content="这是一个提示"></pe-label>

<!-- 日期模式 -->
<pe-label mode="date" :content="1640000000" :zone="true"></pe-label>
```
````