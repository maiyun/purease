分页控件，用于数据分页展示

### 参数

#### modelValue

`number`

当前页码，默认 1

#### max

`number`

最大页数，设置后将忽略 total 和 count 的自动计算，默认 0

#### total

`number`

总条数，用于自动计算最大页数，默认 0

#### count

`number`

每页显示条数，默认 10，支持 v-model

#### counts

`number[]`

每页条数选项，设置后会显示每页条数选择器

#### control

`number`

显示的页码控制数量，默认 10

### 类属性

### 方法

### 插槽

### 样式

类似 Element Plus 的 Pagination，采用居中排列的横向弹性布局。页码按钮为正方形（45×45px，移动端 40×40px），白色背景、圆角、边框和柔和阴影。

左右翻页按钮显示为旋转箭头（CSS 伪元素实现）。选中页码显示主题色背景和白色文字。悬停时灰色背景，聚焦/按下时白色背景带轮廓阴影。每页条数选择器无圆角阴影，左右内边距 15px。

底部可选总数提示文字，居中显示，顶部间距 10px。按钮间距 10px。

### 事件

#### change(page)

页码改变后事件

##### page

`number`

### 示例

```html
<pe-page v-model="p1" max="10" :control="control"></pe-page>
<pe-page v-model="p2" max="30" :control="control"></pe-page>
<pe-page v-model="p3" total="1282" :control="control"></pe-page>
```