抽屉控件，从侧边滑出的面板

### 参数

#### modelValue

`boolean`

是否显示，默认 false

#### title

`string`

标题，默认空

#### width

`string` | `number`

宽度，默认 35%

#### direction

`'h'` | `'v'`

布局方向，默认 h

#### gutter

`string`

间隔

#### alignH

`string` | `undefined`

水平对齐

#### alignV

`string` | `undefined`

垂直对齐

### 类属性

### 方法

### 插槽

#### footer

抽屉底部区域，用于放置操作按钮

### 样式

类似 Ant Design 的 Drawer 抽屉组件，从右侧滑出的面板。采用固定定位，全屏半透明遮罩（rgba(0,0,0,.3)）配合白色抽屉主体，带阴影效果。

抽屉主体包含标题栏（左对齐大字号标题+右上关闭按钮）、内容区（可滚动，支持横向/纵向布局和对齐方式）、可选底部操作区。关闭按钮悬停时显示灰色背景，聚焦时带轮廓阴影。

显示时从右侧平滑滑入，隐藏时滑出并移除交互。支持自定义宽度和内部间距。

### 示例

```html
<pe-drawer title="Drawer" gutter="10" v-model="drawer" direction="v" width="50%">
    <div>123</div>
    <div class="pe-button pe-pgrey" @click="drawer2 = true">456</div>
</pe-drawer>
```
