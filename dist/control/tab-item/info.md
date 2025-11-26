选项卡子项控件，与 pe-tab 配合使用

### 参数

### 类属性

### 方法

### 样式

选项卡子项，带内边距和过渡动画。默认类型底部 3px 透明边框（向下偏移 1px），选中时变为主题色边框，文字变主题色并加粗。

light 类型为小圆角按钮样式（小内边距，无边框），选中时主题色背景。rect 类型为小内边距+1px 透明边框，无偏移，z-index 1，选中时文字不加粗保持常规色。

### 示例

```html
<pe-tab type="light" :hover="tabHover">
    <pe-tab-item>Tab1</pe-tab-item>
    <pe-tab-item>Tab2</pe-tab-item>
    <pe-tab-item>Tab3</pe-tab-item>
</pe-tab>
```