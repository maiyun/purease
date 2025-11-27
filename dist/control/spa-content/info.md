SPA 内容区域控件，用于 pe-spa-page 内

### 参数

### 类属性

### 方法

### 样式

页面内容区域，采用纵向弹性布局，弹性扩展填充可用空间（flex: 1，height: 0），支持垂直滚动。

### 示例

```html
<pe-spa>
    <pe-spa-page path="/2" @show="spaShow2" @hide="spaHide2">
        <pe-spa-header back>
            <pe-circle type="pe" size="s"></pe-circle>
            <div>The 2 Page</div>
        </pe-spa-header>
        <pe-spa-content>
            test test<br><br>
            <div class="pe-button pe-pgrey">Button</div>
        </pe-spa-content>
    </pe-spa-page>
</pe-spa>
```