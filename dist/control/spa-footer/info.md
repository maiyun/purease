````markdown
SPA 底部导航栏控件

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
<pe-spa>
    <pe-spa-page path="/">
        <pe-spa-header>首页</pe-spa-header>
        <div>首页内容</div>
    </pe-spa-page>
    
    <pe-spa-footer v-model="selectedTab">
        <pe-spa-footer-icon value="home" title="首页">
            <pe-icon name="home"></pe-icon>
        </pe-spa-footer-icon>
        <pe-spa-footer-icon value="discover" title="发现">
            <pe-icon name="compass"></pe-icon>
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