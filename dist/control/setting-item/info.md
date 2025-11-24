````markdown
设置项控件，用于显示单个设置项

### 参数

#### type

`string`

类型标识

#### direction

`'h'` | `'v'`

布局方向，h 为横向，v 为纵向，默认 h

#### arrow

`boolean`

是否显示右侧箭头，默认 false

#### mark

`string`

标记内容，显示在右侧

#### gap

`string`

右侧内容间距

#### alignH

`string` | `undefined`

水平对齐方式

#### alignV

`string`

垂直对齐方式，默认 center

#### hover

`boolean`

是否启用悬停效果，默认 false

#### nopadding

`boolean`

是否无内边距，默认 false

#### nogap

`boolean`

是否无间距，默认 false

#### title

`string`

标题文本

#### note

`string`

备注文本

### 类属性

### 方法

### 样式

单个设置项，采用横向弹性布局。左侧为标题+备注区域（纵向排列，标题大字号，备注灰色小字号），右侧为操作区域（支持横向/纵向布局和对齐方式，可换行）。

可选右侧箭头指示器（反向 back 图标）或右上角标记（主题色背景、白色文字、左下圆角）。支持 nopadding（无内边距）和 nogap（无间距）模式。

父容器启用 hover 模式时，悬停显示灰色背景。背景色继承输入框背景色，相对定位便于标记绝对定位。

#### enter

`(e: MouseEvent | TouchEvent) => void`

鼠标进入事件处理

#### leave

`(e: MouseEvent | TouchEvent) => void`

鼠标离开事件处理

### 示例

```html
<pe-setting>
    <pe-setting-block>
        <pe-setting-item title="通知" note="接收系统通知" :arrow="true" :hover="true">
            <pe-switch v-model="notification"></pe-switch>
        </pe-setting-item>
        <pe-setting-item title="语言" mark="中文">
            <pe-select v-model="language" :data="languages"></pe-select>
        </pe-setting-item>
    </pe-setting-block>
</pe-setting>
```
````