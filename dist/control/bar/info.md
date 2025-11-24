生成网页上半部分的横幅区域，会自动预留出顶部 header 的高度

### 参数

#### logoHref

`string`

logo 图地址

#### theme

`'default'` | `'dark'`

主题风格，默认 default

### 类属性

### 方法

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