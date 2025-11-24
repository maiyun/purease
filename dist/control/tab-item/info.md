````markdown
选项卡子项控件

### 参数

### 类属性

#### index

`number`

当前 item 在父级 tab 中的索引

#### isSelected

`boolean`

当前 item 是否被选中

### 方法

### 样式

选项卡子项，带内边距和过渡动画。默认类型底部 3px 透明边框（向下偏移 1px），选中时变为主题色边框，文字变主题色并加粗。

light 类型为小圆角按钮样式（小内边距，无边框），选中时主题色背景。rect 类型为小内边距+1px 透明边框，无偏移，z-index 1，选中时文字不加粗保持常规色。

#### hover

`(e: MouseEvent | TouchEvent) => void`

鼠标悬停事件处理

#### click

`() => void`

点击事件处理

#### resize

`() => void`

窗口大小改变时重新计算位置

### 示例

```html
<pe-tab v-model="selectedTab">
    <pe-tab-item>首页</pe-tab-item>
    <pe-tab-item>产品</pe-tab-item>
    <pe-tab-item>关于</pe-tab-item>
</pe-tab>
```
````