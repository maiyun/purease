数字键盘控件，用于输入数字密码或验证码

### 参数

#### disabled

`boolean`

是否禁用，默认 false

#### plain

`boolean`

是否为朴素风格，默认 false

#### custom

`string`

自定义按钮内容

#### buttons

`string[]`

底部按钮列表

#### size

`string` | `undefined`

尺寸大小，默认 m，可设置 xs、s

#### modelValue

`string`

当前输入的值

#### length

`number`

允许输入的长度，默认 6

#### split

`boolean`

是否分割显示每个数字，默认 false

### 类属性

### 方法

### 插槽

#### title

数字键盘顶部标题区域

### 样式

类似移动端数字键盘，采用垂直布局。顶部可选标题区（大字号，带内边距），输入框区域水平居中显示分格数字（可选 split 模式显示边框分隔），下方为 4×3 数字键盘网格（1-9、自定义键、0、退格）。

键盘按钮网格布局，带顶部和左右边框分隔线，悬停时灰色背景，按下时白色背景带阴影。底部可选操作按钮行（最后一个按钮主题色背景，悬停时变亮，按下时变暗带轮廓阴影）。

支持 plain 模式（无外边框）、size 尺寸调整（s/xs）。非 plain 模式下带圆角、边框和阴影，底部按钮右下角圆角。

### 事件

#### changed()

值改变事件

#### button(item)

底部按钮点击事件

##### item

`string`

### 示例

```html
<pe-nboard v-model="nboard" :disabled="nboardDisabled" :plain="nboardPlain" :split="nboardSplit" :custom="nboardCustom ? '#' : undefined" :buttons="nboardButtons ? ['Cancel', 'OK'] : []" @button="nboardButton" :size="nboardSize !== 'default' ? nboardSize : undefined">
    <template v-if="nboardTitle" v-slot:title>
        <span>This is a title</span>
    </template>
</pe-nboard>
```

```typescript
class Page extends purease.AbstractPage {

    public nboardButton(btn: string): void {
        this.alert(btn, 'pe');
    }

}
```