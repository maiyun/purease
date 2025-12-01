生成网页头部导航栏

### 参数

#### logoHref

`string`

点击 logo 后的跳转地址，一般为首页地址。logo 图自行用 css 设置，例如：

```scss
.pe-logo {
    background-image: url(../../doc/logo.png);
}
```

#### fixed

`boolean`

是否固定定位，默认 false

#### theme

`'default'` | `'rev'`

主题风格，默认 default，`rev`: 反差

#### line

`boolean`

是否显示底部线条，默认 false

### 类属性

### 方法

### 插槽

#### bottom

导航栏底部区域

#### right

导航栏右侧区域，用于放置操作按钮等

### 样式

类似 Element Plus 的 Header 组件，采用横向弹性布局。左侧为 logo 区域（背景图模式），右侧为导航区（左侧主导航+右侧操作区）。支持绝对定位或固定定位模式。

默认主题（default）滚动后显示半透明白色背景配毛玻璃效果（backdrop-filter blur），带柔和阴影。rev 主题在未滚动时文字为白色，滚动后切换为白色背景。可选底部 1px 边框线。

800px 以下切换为移动端模式：导航区变为全屏弹窗（半透明背景+毛玻璃），右上角显示汉堡菜单按钮。导航项和底部导航区变为纵向排列，支持滚动。

### 示例

```html
<pe-header logo-href="./" fixed>
    <a class="pe-header-item" href="./">Home</a>
    <pe-header-item>
        List
        <pe-menu>
            <a class="pe-menu-item" href="./swipe.html">Swipe</a>
            <a class="pe-menu-item" href="./login.html">Login</a>
            <a class="pe-menu-item" href="./lnav.html">Lnav</a>
        </pe-menu>
    </pe-header-item>
    <a class="pe-header-item" href="./swipe.html">Swipe</a>
    <pe-header-item>
        Double
        <pe-menu>
            <div class="pe-layoutlist">
                <div>
                    <a class="pe-menu-item" href="./">111342342342334</a>
                    <a class="pe-menu-item" href="./">222</a>
                </div>
                <div>
                    <a class="pe-menu-item" href="./">333</a>
                    <a class="pe-menu-item" href="./">444</a>
                </div>
            </div>
        </pe-menu>
    </pe-header-item>
    <a class="pe-header-item" href="./">About</a>
    <template v-slot:right>
        <a class="pe-header-item" href="./">OK</a>
        <pe-header-layout class="pe-gap-xs">
            <a class="pe-button pe-plain pe-bold" href="./">Hello</a>
        </pe-header-layout>
    </template>
</pe-header>
```