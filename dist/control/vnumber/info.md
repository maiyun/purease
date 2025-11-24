````markdown
验证码输入控件，用于输入数字验证码

### 参数

#### disabled

`boolean`

是否禁用，默认 false

#### modelValue

`string`

当前输入的验证码值

#### length

`number`

验证码长度，默认 6

### 类属性

#### value

`string[]`

内部值数组

#### isFocus

`boolean`

是否处于焦点状态

### 方法

### 样式

验证码输入框，采用横向弹性布局容器，圆角、边框和过渡动画。聚焦时显示轮廓阴影。内部隐藏实际 input（全尺寸绝对定位，不透明度 0，字号 1px，隐藏数字 spinner）。

数字格子横向排列（右侧细分隔线），固定尺寸（内边距 s × 2 + 字号），居中显示。当前输入位置显示下划线闪烁动画（CSS keyframes 控制透明度）。禁用用户选择，overflow hidden。

#### input

`() => void`

输入事件处理

### 事件

#### changed

值改变事件

#### update:modelValue

双向绑定值更新事件

### 示例

```html
<pe-vnumber v-model="verifyCode" :length="6" @changed="onCodeChanged"></pe-vnumber>
```

```typescript
const verifyCode = ref('');

function onCodeChanged() {
    console.log('验证码:', verifyCode.value);
    if (verifyCode.value.length === 6) {
        // 验证码输入完成
        verify(verifyCode.value);
    }
}
```
````