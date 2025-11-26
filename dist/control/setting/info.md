设置容器控件，用于包裹设置项

### 参数

#### type

`string`

类型标识

#### hover

`boolean`

是否启用悬停效果，默认 false

#### plain

`boolean`

是否为朴素风格，默认 false

#### light

`boolean`

是否为亮色风格，默认 false

### 类属性

### 方法

### 插槽

### 样式

类似 iOS 设置界面的列表容器，采用垂直排列布局。默认圆角、边框和背景色，子项间带细分隔线。支持三种风格：默认（深色分隔线）、plain（无左右边框，直角）、light（浅色分隔线和边框）。

子项（setting-block/setting-item）非最后一项时显示底部分隔线。overflow hidden 保证圆角裁剪。

### 示例

```html
<pe-setting :hover="settingHover" :plain="settingPlain" :light="settingLight">
    <pe-setting-item title="How are you" note="Ok, I'm ok, you?" mark="New">END</pe-setting-item>
    <pe-setting-item title="How are you" note="Ok, I'm ok, you?">
        <pe-switch />
    </pe-setting-item>
    <pe-setting-item title="How are you" note="stripe" class="pe-stripe"></pe-setting-item>
    <pe-setting-item v-slot:left mark="#12">v-slot:left</pe-setting-item>
    <pe-setting-item title="How are you" note="No right" arrow></pe-setting-item>
</pe-setting>
```