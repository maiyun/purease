SPA 页面头部控件

### 参数

#### back

`boolean`

是否显示返回按钮，默认 false

#### note

`string`

备注文本，显示在默认插槽（通常是标题）后方

#### direction

`'h'` | `'v'`

布局流向，默认 `'h'`

### 类属性

### 方法

### 样式

页面头部标题栏，采用横向弹性布局居中对齐，高度 65px（移动端 50px），大字号，相对定位。左侧可选返回按钮（绝对定位左侧，垂直居中），标题居中，可选副标题（小字号注释色，单独居中）。

标题和备注行高为 1，间距小。移动端自动缩小高度保持紧凑。

### 示例

```html
<pe-spa>
    <pe-spa-page path="/2" @show="spaShow2" @hide="spaHide2">
        <pe-spa-header back>The 2 Page</pe-spa-header>
        <pe-spa-content> ... </pe-spa-content>
    </pe-spa-page>
    <pe-spa-page path="/3" grey>
        <pe-spa-header direction="v" note="the note text" back>The 3 Page</pe-spa-header>
        <pe-spa-content> ... </pe-spa-content>
    </pe-spa-page>
</pe-spa>
```