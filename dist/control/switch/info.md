````markdown
开关控件

### 参数

#### disabled

`boolean`

是否禁用，默认 false

#### map

`{ true?: any; false?: any }`

值映射对象，可以自定义开关的真假值，默认 {}

#### modelValue

`boolean` | `any`

当前值，默认 false

### 类属性

#### value

`boolean` | `any`

内部值状态

#### mapComp

`{ true: any; false: any }`

格式化后的值映射

### 方法

### 样式

类似 Ant Design 的 Switch 开关，采用相对定位的圆角矩形轨道（宽度为高度 2 倍，默认灰色背景）。内部为绝对定位的圆形滑块（高度减去 6px，3px 边距，白色背景带阴影），位置和背景色过渡使用三次贝塞尔曲线。

选中状态下轨道变为主题色，滑块向右移动一个尺寸单位。悬停/聚焦/按下时轨道颜色加深。移动端自动缩小尺寸（35px 变为 25px）。

禁用状态下无交互和颜色变化。outline none。

#### click

`() => void`

点击切换事件

#### keydown

`(e: KeyboardEvent) => void`

键盘事件处理

### 事件

#### change

值改变事件，返回 `ISwitchChangeEvent` 对象，可通过 `preventDefault()` 阻止切换

#### update:modelValue

双向绑定值更新事件

### 示例

```html
<pe-switch v-model="enabled" @change="onChange"></pe-switch>

<!-- 自定义值映射 -->
<pe-switch v-model="status" :map="{ true: 1, false: 0 }"></pe-switch>
```

```typescript
const enabled = ref(false);
const status = ref(0);

function onChange(e: lControl.ISwitchChangeEvent) {
    console.log('当前值:', e.detail.value);
    // 可以阻止切换
    // e.preventDefault();
}
```
````