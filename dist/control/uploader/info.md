图片上传控件，用于展示已上传的图片列表，支持删除、拖拽排序和上传进度显示。

### 参数

#### modelValue

`Array<string | { title?: string; src: string; }>`

已上传图片列表，可以是字符串数组或包含 title 和 src 的对象数组，默认 []

#### disabled

`boolean` | `string`

是否禁用，默认 false

#### length

`number` | `string`

最大数量限制，默认 6

#### drag

`boolean` | `string`

是否启用拖拽排序，默认 false

#### pre

`string`

图像 URL 前缀，默认空

#### multi

`boolean` | `string`

是否可多选上传，默认 false

#### progress

`number` | `undefined`

上传进度（0-100），undefined 表示不显示进度，显示加号图标

### 类属性

### 方法

### 事件

#### select

点击选择按钮时触发

#### remove

移除项时触发，可通过 `event.preventDefault()` 阻止默认移除行为

#### changed

列表变化时触发（移除或拖拽排序后）

### 插槽

### 样式

类似 Ant Design 的 Upload 图片墙，采用 flex 弹性布局横向排列，自动换行。每个图片项为 90×90px 的圆角方块，带 1px 边框。

已上传图片采用 cover 方式填充容器，可选显示顶部标题栏。悬停时底部显示操作栏（删除按钮、拖拽手柄），操作按钮带半透明黑色背景，悬停时加深。

选择按钮为虚线边框方块，居中显示加号图标。上传中时显示环形进度条和百分比文字。支持禁用状态（降低透明度、禁用交互）和 RTL 布局。

### 示例

```html
<pe-uploader v-model="images" @select="handleSelect" multi drag></pe-uploader>
```
