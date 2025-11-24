````markdown
轮播图子项控件

### 参数

#### direction

`'h'` | `'v'`

布局方向，h 为横向，v 为纵向，默认 h

### 类属性

#### index

`number`

当前 item 在所有 item 中的索引

#### npage

`number`

当前 item 所在的页码

#### pindex

`number`

当前 item 在当前页内的索引

#### left

`string`

左侧位置样式值

#### width

`number`

单页宽度

#### iwidth

`string`

item 宽度样式值

### 方法

### 样式

轮播子项，绝对定位（top 0），100% 高度，横向弹性布局（支持纵向模式 direction-v）。通过动态计算的 left 和 width 样式定位和尺寸。

### 示例

```html
<pe-swipe v-model="current">
    <pe-swipe-item>
        <img src="/image1.jpg" />
    </pe-swipe-item>
    <pe-swipe-item>
        <img src="/image2.jpg" />
    </pe-swipe-item>
</pe-swipe>
```
````