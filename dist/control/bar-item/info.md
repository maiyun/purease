条状导航控件的子项，用于构建导航项

### 参数

#### href

`string` | `undefined`

链接地址

### 类属性

### 方法

### 样式

作为 pe-bar 的子组件，每个导航项呈现为固定高度（50px）的水平块，内边距为 0 30px。悬停时显示半透明白色背景。

支持嵌套下拉菜单，带菜单的项右侧显示小箭头图标（6x6px 斜边框）。悬停时箭头旋转，下拉菜单平滑展开。在 dark 主题下文字和箭头自动切换为白色。

在 800px 以下屏幕宽度时切换为纵向堆叠，下拉菜单变为手风琴式展开/收起。

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
