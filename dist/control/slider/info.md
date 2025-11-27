滑块控件，支持单值和范围选择

### 参数

#### modelValue

`[number, number]`

当前值，数组格式，第一个元素为左侧值，第二个元素为右侧值（range 模式），默认 [0, 0]

#### min

`number`

最小值，默认 0

#### max

`number`

最大值，默认 100

#### range

`boolean`

是否为范围选择模式，默认 false

### 类属性

### 方法

### 样式

类似 Ant Design 的 Slider 滑块，采用相对定位的横向轨道（高度 6px，圆角 3px，带内阴影）。已选区域以主题色填充条覆盖。

滑块手柄为圆形按钮（22×22px，圆角 11px），白色背景、边框和阴影，通过 calc 定位（百分比偏移减去手柄半径）。悬停时放大 1.3 倍且变浅灰，聚焦/按下时放大并显示轮廓阴影。

范围模式下显示两个手柄和中间的填充条。所有交互元素均禁用用户选择，过渡动画流畅。

### 示例

```html
<pe-slider v-model="slider1"></pe-slider>
<div>min: 100, max: 500, {{slider2}}</div>
<pe-slider v-model="slider2" range min="100" max="500"></pe-slider>
```