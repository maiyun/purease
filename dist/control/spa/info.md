````markdown
单页应用容器控件，基于 hash 路由

### 参数

#### plain

`boolean`

是否为朴素风格，默认 false

#### full

`boolean`

是否全屏显示，默认 false

### 类属性

#### path

`string`

当前路由路径

### 方法

### 样式

单页应用根容器，采用相对定位，overflow hidden，文本左对齐。默认带边框和圆角，白色背景（oklch 色彩空间）。

plain 模式下无边框和圆角。full 模式下切换为全屏固定定位（z-index 2）。子页面（spa-page）绝对定位叠加，通过显示/隐藏和过渡动画实现页面切换。

### 示例

```html
<pe-spa :full="true">
    <pe-spa-page path="/">
        <pe-spa-header>首页</pe-spa-header>
        <div>首页内容</div>
    </pe-spa-page>
    <pe-spa-page path="/about">
        <pe-spa-header :back="true">关于</pe-spa-header>
        <div>关于内容</div>
    </pe-spa-page>
</pe-spa>
```
````