SPA 底部导航栏控件，用于 pe-spa-page 的底部

### 参数

#### modelValue

`string`

当前选中的导航项值

### 类属性

### 方法

### 样式

底部导航栏，采用横向弹性布局，背景色为输入框背景色。子项（spa-footer-icon）等宽分布，图标+文字纵向排列居中。

### 示例

```html
<pe-spa :plain="spaPlain" :full="spaFull" style="min-width: 400px; min-height: 700px;">
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