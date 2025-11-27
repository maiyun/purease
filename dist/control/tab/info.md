选项卡容器控件

### 参数

#### modelValue

`number`

当前选中的 tab 索引，默认 0

#### type

`'default'` | `'plain'` | `'light'` | `'rect'`

类型样式，默认 default

#### hover

`boolean`

是否悬停切换（鼠标悬停时切换），默认 false

### 类属性

### 方法

### 样式

类似 Ant Design 的 Tabs 选项卡，采用居中排列的横向弹性布局。默认类型底部带 1px 边框，选中项底部 3px 主题色边框（向下偏移 1px 覆盖容器边框）。未选中项为注释色。

plain 类型无底部边框。light 类型无底部边框且带 10px 间距，选中项显示主题色背景圆角。rect 类型为灰色背景容器（3px 内边距，圆角），底部无边框，选中项通过伪元素白色背景块平滑移动指示（CSS 变量控制位置和宽度）。

禁用用户选择，cursor default。

### 示例

```html
<pe-tab v-model="tab">
    <pe-tab-item>Tab1</pe-tab-item>
    <pe-tab-item>Tab2</pe-tab-item>
    <pe-tab-item>Tab3</pe-tab-item>
</pe-tab>
```