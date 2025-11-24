````markdown
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
- text: 单行文本
- multi: 多行文本
- password: 密码
- number: 数字

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

#### isFocus

`boolean`

是否处于焦点状态

#### value

`string`

内部值

#### showPassword

`boolean`

是否显示密码（密码类型时）

### 方法

### 样式

类似 Ant Design 的 Input 输入框，采用横向弹性布局，圆角、边框和过渡动画。背景色支持悬停变浅，聚焦时白色背景带轮廓阴影。

input/textarea 元素去除默认样式，透明背景，弹性扩展（width 0），带小内边距，textarea 禁用 resize。支持 before/prepend/append/after 四个插槽（弹性布局），prepend 和 append 左对齐居中。

密码类型右侧显示眼睛图标切换显示/隐藏（悬停时不透明度提升）。plain 模式无边框。

#### checkNumber

`(target?: HTMLInputElement | HTMLTextAreaElement) => boolean`

检测数字值是否符合 max 和 min 范围

#### input

`(e: InputEvent) => void`

输入事件处理

#### tfocus

`() => void`

获得焦点事件处理

#### tblur

`(e: FocusEvent) => void`

失去焦点事件处理

### 事件

#### beforechange

值改变前事件，返回 `ITextBeforechangeEvent` 对象，可通过 `preventDefault()` 阻止改变

#### focus

获得焦点事件

#### blur

失去焦点事件

#### update:modelValue

双向绑定值更新事件

### 示例

```html
<!-- 单行文本 -->
<pe-text v-model="text" placeholder="请输入文本"></pe-text>

<!-- 多行文本 -->
<pe-text v-model="content" type="multi" placeholder="请输入内容"></pe-text>

<!-- 密码 -->
<pe-text v-model="password" type="password" placeholder="请输入密码"></pe-text>

<!-- 数字 -->
<pe-text v-model="age" type="number" :min="0" :max="150" placeholder="请输入年龄"></pe-text>

<!-- 限制长度 -->
<pe-text v-model="username" :maxlength="20" @beforechange="onBeforeChange"></pe-text>
```

```typescript
const text = ref('');
const password = ref('');
const age = ref('');

function onBeforeChange(e: lControl.ITextBeforechangeEvent) {
    console.log('值将改变为:', e.detail.value);
    // 可以修改值
    // e.detail.change = '修改后的值';
    // 或阻止改变
    // e.preventDefault();
}
```
````