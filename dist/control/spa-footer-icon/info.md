SPA 底部导航图标项

### 参数

#### title

`string`

图标标题文本

#### modelValue

`string`

当前选中的值

#### value

`string`

当前图标项的值

### 类属性

### 方法

### 样式

底部导航图标项，采用弹性扩展的纵向布局居中对齐。默认注释色文字，小字号，选中时变为主题色。内边距小，图标尺寸 24×24px。

禁用过渡动画（避免页面切换时闪烁）。支持 cursor pointer 和 user-select none。

### 示例

```html
<pe-spa plain full>
    <pe-spa-page path="/">
        <pe-spa-header>Hello world</pe-spa-header>
        <pe-spa-content> ... </pe-spa-content>
        <pe-spa-footer>
            <pe-spa-footer-icon title="Full" v-model="spaFooter" value="1">
                <pe-icon name="eye"></pe-icon>
            </pe-spa-footer-icon>
            <pe-spa-footer-icon title="Text" v-model="spaFooter" value="2"></pe-spa-footer-icon>
            <pe-spa-footer-icon v-model="spaFooter" value="3">
                <pe-icon name="language"></pe-icon>
            </pe-spa-footer-icon>
        </pe-spa-footer>
    </pe-spa-page>
</pe-spa>
```