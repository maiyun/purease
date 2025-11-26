头部导航栏的单个项目，为了 SEO 优化，链接模式可以直接用 a 标签加 `pe-header-item` 的 class。

### 参数

#### href

`string` | `undefined`

链接地址，如果未设置则作为下拉菜单触发器

### 类属性

### 方法

### 插槽

### 样式

类似 Bootstrap 的 Nav Link，作为 header 子项使用。采用横向弹性布局，固定高度 70px（小屏模式 50px），左右内边距 30px。

悬停时文字变为主题色。包含子菜单时右侧显示向下小箭头（悬停时箭头同步变色），悬停时子菜单从顶部平滑展开（透明度和位移过渡）。未滚动的 rev 主题下文字和箭头为白色。

800px 以下切换为纵向布局，子菜单变为展开/折叠模式（箭头旋转 90 度），高度自适应。1200px-800px 区间自动压缩左右内边距。

### 示例

```html
<pe-header logo-href="./" fixed>
    <a class="pe-header-item" href="./">Home</a>
    <pe-header-item>
        List
        <pe-menu>
            <a class="pe-menu-item" href="./swipe.html">Swipe</a>
            <a class="pe-menu-item" href="./login.html">Login</a>
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
</pe-header>
```