````markdown
生成网页头部导航栏

### 参数

#### logoHref

`string`

logo 图地址

#### fixed

`boolean`

是否固定定位，默认 false

#### theme

`'default'` | `'dark'`

主题风格，默认 default

#### line

`boolean`

是否显示底部线条，默认 false

### 类属性

#### headerPop

`boolean`

头部弹出状态

### 方法

### 样式

类似 Element Plus 的 Header 组件，采用横向弹性布局。左侧为 logo 区域（背景图模式），右侧为导航区（左侧主导航+右侧操作区）。支持绝对定位或固定定位模式。

默认主题（default）滚动后显示半透明白色背景配毛玻璃效果（backdrop-filter blur），带柔和阴影。rev 主题在未滚动时文字为白色，滚动后切换为白色背景。可选底部 1px 边框线。

800px 以下切换为移动端模式：导航区变为全屏弹窗（半透明背景+毛玻璃），右上角显示汉堡菜单按钮。导航项和底部导航区变为纵向排列，支持滚动。

### 示例

```html
<pe-header :fixed="true" :theme="'default'" :logo-href="'/logo.png'">
    <pe-header-item href="/">首页</pe-header-item>
    <pe-header-item href="/about">关于</pe-header-item>
    <pe-header-item>
        产品
        <pe-menu>
            <a class="pe-menu-item" href="/product1">产品1</a>
            <a class="pe-menu-item" href="/product2">产品2</a>
        </pe-menu>
    </pe-header-item>
</pe-header>
```
````