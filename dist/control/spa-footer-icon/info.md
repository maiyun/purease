````markdown
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

#### click

`() => void`

点击事件处理

### 示例

```html
<pe-spa>
    <pe-spa-footer v-model="selectedTab">
        <pe-spa-footer-icon value="home" title="首页">
            <pe-icon name="home"></pe-icon>
        </pe-spa-footer-icon>
        <pe-spa-footer-icon value="profile" title="我的">
            <pe-icon name="user"></pe-icon>
        </pe-spa-footer-icon>
    </pe-spa-footer>
</pe-spa>
```

```typescript
const selectedTab = ref('home');
```
````