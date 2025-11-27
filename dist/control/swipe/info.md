轮播图控件，支持触摸滑动和自动播放

### 参数

#### modelValue

`number`

当前显示的页码，默认 0

#### auto

`boolean`

是否自动滚动，默认 false

#### page

`'left'` | `'center'` | `'right'` | `'none'`

分页指示器位置，默认 center

#### control

`'inner'` | `'outer'`

控制器（左右箭头）位置，默认 inner

#### radius

`string` | `undefined`

外圆角大小

#### item

`number`

一页显示的 item 数量，默认 1

#### minitem

`number`

响应式模式下最小 item 数量，默认 1

#### gutter

`number`

item 之间的间距，默认 0

### 类属性

### 方法

### 样式

类似 Swiper 轮播组件，采用相对定位的横向弹性布局容器，固定高度 800px。内部为 overflow hidden 的包裹层（支持自定义圆角），再内层为相对定位的 items 容器。

底部分页指示器（椭圆形）绝对定位，支持左/中/右对齐或隐藏，未选中项半透明白色，选中项变宽且不透明度提升，悬停时变亮。左右翻页箭头为旋转的空心方块（CSS 伪元素实现），支持 inner（内部白色）和 outer（外部黑色）两种风格。

禁用用户选择，cursor default。子项（swipe-item）绝对定位，动态计算 left 和 width。

### 示例

```html
<pe-swipe auto :page="swipePage">
    <pe-swipe-item direction="v" style="background: rgba(0,0,0,.9); color: #FFF;"> ... </pe-swipe-item>
    <pe-swipe-item direction="v" style="background: #000; color: #FFF; font-size: 48px;"> ... </pe-swipe-item>
    <pe-swipe-item direction="v" style="background: hsl(240, 50%, 30%); color: #FFF; font-size: 48px;"> ... </pe-swipe-item>
</pe-swipe>
```