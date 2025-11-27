单页应用容器控件，基于 hash 路由

### 参数

#### plain

`boolean`

是否为朴素风格，默认 false

#### full

`boolean`

是否全屏显示，默认 false

### 类属性

### 方法

### 样式

单页应用根容器，采用相对定位，overflow hidden，文本左对齐。默认带边框和圆角，白色背景（oklch 色彩空间）。

plain 模式下无边框和圆角。full 模式下切换为全屏固定定位（z-index 2）。子页面（spa-page）绝对定位叠加，通过显示/隐藏和过渡动画实现页面切换。

### 示例

```html
<pe-spa :plain="spaPlain" :full="spaFull" style="min-width: 400px; min-height: 700px;">
    <!-- 第一页 -->
    <pe-spa-page path="/">
        <pe-spa-header>Hello world</pe-spa-header>
        <pe-spa-content> ... </pe-spa-content>
    </pe-spa-page>
    <!-- 第二页 -->
    <pe-spa-page path="/2" @show="spaShow2" @hide="spaHide2">
        <pe-spa-header back>
            <pe-circle type="pe" size="s"></pe-circle>
            <div>The 2 Page</div>
        </pe-spa-header>
        <pe-spa-content> ... </pe-spa-content>
    </pe-spa-page>
    <!-- 第三页 -->
    <pe-spa-page path="/3" grey>
        <pe-spa-header style="flex-direction: column;" note="the note text" back>The 3 Page</pe-spa-header>
        <pe-spa-content> ... </pe-spa-content>
    </pe-spa-page>
</pe-spa>
```