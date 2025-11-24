对话框控件，用于显示信息并获取用户选择

### 参数

#### title

`string`

标题

#### content

`string`

内容

#### buttons

`string[]`

按钮列表，默认 ['OK']

#### show

`boolean`

是否显示，默认 false

### 类属性

### 方法

### 事件

#### select

按钮选择事件，返回选中按钮的索引

### 样式

类似系统原生 alert/confirm 对话框，采用居中模态层设计。背景为半透明白色遮罩，对话框带圆角、阴影和细边框。

对话框内部采用垂直布局，从上到下为：标题（灰色）、内容区、按钮组（右对齐）。最后一个按钮默认显示为深色按钮。

显示/隐藏时带有缩放动画，隐藏时对话框放大 1.3 倍并淡出。

### 示例

```html
<pe-dialog :show="customDialog" @select="customDialogSelect" title="Please input name">
    <pe-text style="width: 250px;" v-model="customDialogText"></pe-text>
</pe-dialog>
```
