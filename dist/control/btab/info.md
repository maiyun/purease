大 tab 控件，横向内容过多支持滚动，主要用于较大的块的内容切换，比如切换一个展示信息为另一页

### 参数

#### modelValue

`number`

选中的索引，默认 0

#### data

`string[]`

tab 数据列表，默认空数组

#### type

`'default'` | `'plain'` | `'light'`

类型，默认 default

### 类属性

### 方法

### 样式

类似移动端的 Segmented Control，横向标签过多时支持拖拽滚动。提供 default（灰色背景）、plain（透明背景）、light（圆角胶囊）三种样式类型。

选中项高亮显示主题色背景和白色文字（light 类型为白色背景+主题色文字+加粗）。内容可滚动时左右两侧显示渐变阴影提示。

支持鼠标拖拽和触摸滑动，适用于大块内容的切换场景。

### 示例

```html
<pe-btab :data="['Tab1', 'Tab2', 'Other', 'Hehe', 'Mutton', 'Kebab', 'ClickGo', 'Purease']" type="plain"></pe-btab>
```
