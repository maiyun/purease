开关控件

### 参数

#### disabled

`boolean`

是否禁用，默认 false

#### map

`{ 'true'?: boolean | string | number; 'false'?: boolean | string | number; }`

值映射对象，可以自定义开关的真假值，默认 {}

#### modelValue

`boolean` | `string` | `number`

当前值，默认 false

### 方法

### 样式

类似 Ant Design 的 Switch 开关，采用相对定位的圆角矩形轨道（宽度为高度 2 倍，默认灰色背景）。内部为绝对定位的圆形滑块（高度减去 6px，3px 边距，白色背景带阴影），位置和背景色过渡使用三次贝塞尔曲线。

选中状态下轨道变为主题色，滑块向右移动一个尺寸单位。悬停/聚焦/按下时轨道颜色加深。移动端自动缩小尺寸（35px 变为 25px）。

禁用状态下无交互和颜色变化。outline none。

### 事件

#### change(event)

值改变事件

##### event

`ISwitchChangeEvent`

### 示例

```html
<pe-switch v-model="switch1"></pe-switch>
<div>{{switch2}}</div>
<pe-switch v-model="switch2" :map="{'true':'a','false':'b'}"></pe-switch>
```