验证码输入控件，用于输入数字验证码或密码类纯数字输入的场景

### 参数

#### disabled

`boolean`

是否禁用，默认 false

#### modelValue

`string`

当前输入的数字值

#### length

`number`

长度，默认 6

### 类属性

### 方法

### 样式

验证码输入框，采用横向弹性布局容器，圆角、边框和过渡动画。聚焦时显示轮廓阴影。内部隐藏实际 input（全尺寸绝对定位，不透明度 0，字号 1px，隐藏数字 spinner）。

数字格子横向排列（右侧细分隔线），固定尺寸（内边距 s × 2 + 字号），居中显示。当前输入位置显示下划线闪烁动画（CSS keyframes 控制透明度）。禁用用户选择，overflow hidden。

### 事件

#### changed()

值改变事件

### 示例

```html
<pe-vnumber v-model="vnumber" :disabled="vnumberDisabled"></pe-vnumber>
```