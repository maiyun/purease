````markdown
SPA 页面头部控件

### 参数

#### back

`boolean`

是否显示返回按钮，默认 false

#### note

`string`

备注文本，显示在标题下方

### 类属性

### 方法

### 样式

页面头部标题栏，采用横向弹性布局居中对齐，高度 65px（移动端 50px），大字号，相对定位。左侧可选返回按钮（绝对定位左侧，垂直居中），标题居中，可选副标题（小字号注释色，单独居中）。

标题和备注行高为 1，间距小。移动端自动缩小高度保持紧凑。

#### backClick

`() => void`

返回按钮点击事件，默认调用 `window.history.back()`

### 示例

```html
<pe-spa>
    <pe-spa-page path="/">
        <pe-spa-header>首页</pe-spa-header>
        <div>首页内容</div>
    </pe-spa-page>
    <pe-spa-page path="/detail">
        <pe-spa-header :back="true" note="详细信息">详情页</pe-spa-header>
        <div>详情内容</div>
    </pe-spa-page>
</pe-spa>
```
````