条状导航控件

### 参数

#### logoHref

`string`

logo 图地址

#### theme

`'default'` | `'dark'`

主题风格，默认 default

### 类属性

### 方法

### 样式

类似 Bootstrap 的 Navbar，采用水平弹性布局，左侧可选配 logo（固定宽度 110px），右侧为导航项。提供 default 和 dark 两种主题，dark 主题使用主题色背景和白色文字。

导航项水平排列，每项带有固定内边距（0 20px）和高度（50px）。支持嵌套菜单，菜单项悬停时显示下拉内容。

在 800px 以下屏幕宽度时自动切换为垂直布局，导航项变为纵向堆叠。

### 示例

```html
<pe-bar :theme="dbottom" :logo-href="slogo ? 'javascript:void(0);' : undefined">
    <pe-bar-item>Sub1</pe-bar-item>
    <pe-bar-item>Sub2</pe-bar-item>
    <pe-bar-item>
        Sub3
        <pe-menu>
            <a class="pe-menu-item" href="./swipe.html">Swipe</a>
            <a class="pe-menu-item" href="./login.html">Login</a>
            <a class="pe-menu-item" href="./double.html">Double</a>
        </pe-menu>
    </pe-bar-item>
    <pe-bar-item>Sub4</pe-bar-item>
    <pe-bar-item>Sub5</pe-bar-item>
</pe-bar>
```