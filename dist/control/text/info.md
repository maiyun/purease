文本输入控件，支持单行、多行、密码和数字输入

### 参数

#### modelValue

`string`

当前输入的值

#### readonly

`boolean`

是否只读，默认 false

#### type

`'text'` | `'multi'` | `'password'` | `'number'`

输入框类型，默认 text
- `text`: 单行文本
- `multi`: 多行文本
- `password`: 密码
- `number`: 数字

#### placeholder

`string`

占位符文本

#### disabled

`boolean`

是否禁用，默认 false

#### plain

`boolean`

是否为朴素风格，默认 false

#### maxlength

`number`

最大字符长度限制，0 表示无限制，默认 0

#### max

`number` | `undefined`

最大值（仅在 type 为 number 时有效）

#### min

`number` | `undefined`

最小值（仅在 type 为 number 时有效）

### 类属性

### 方法

### 插槽

#### before

输入框前置插槽，用于在输入框左侧显示内容，通常用于插入控件

#### prepend

输入框预装插槽，用于在输入框左侧显示内容，与 before 的区别是有垂直居中和 padding

#### append

输入框追加插槽，用于在输入框右侧显示内容，与 after 的区别是有垂直居中和 padding

#### after

输入框后置插槽，用于在输入框右侧显示内容，通常用于插入控件

### 样式

类似 Ant Design 的 Input 输入框，采用横向弹性布局，圆角、边框和过渡动画。背景色支持悬停变浅，聚焦时白色背景带轮廓阴影。

input/textarea 元素去除默认样式，透明背景，弹性扩展（width 0），带小内边距，textarea 禁用 resize。支持 before/prepend/append/after 四个插槽（弹性布局），prepend 和 append 左对齐居中。

密码类型右侧显示眼睛图标切换显示/隐藏（悬停时不透明度提升）。plain 模式无边框。

### 事件

#### beforechange(event)

值改变前事件

##### event

`ITextBeforechangeEvent`

#### focus()

获得焦点事件

#### blur()

失去焦点事件

### 示例

```html
<pe-text style="width: 400px;" v-model="text"></pe-text>
<pe-text style="width: 400px;" v-model="text" plain></pe-text>
<pe-text style="width: 400px;" v-model="text">
    <template v-slot:prepend>Hello:</template>
    <template v-slot:append>KG</template>
</pe-text>
```