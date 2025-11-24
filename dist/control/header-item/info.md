````markdown
头部导航栏的单个项目

### 参数

#### href

`string` | `undefined`

链接地址，如果未设置则作为下拉菜单触发器

### 类属性

#### menuCount

`number`

当前项下的菜单数量

#### hover

`boolean`

当前是否处于悬停状态

### 方法

### 样式

类似 Bootstrap 的 Nav Link，作为 header 子项使用。采用横向弹性布局，固定高度 70px（小屏模式 50px），左右内边距 30px。

悬停时文字变为主题色。包含子菜单时右侧显示向下小箭头（悬停时箭头同步变色），悬停时子菜单从顶部平滑展开（透明度和位移过渡）。未滚动的 rev 主题下文字和箭头为白色。

800px 以下切换为纵向布局，子菜单变为展开/折叠模式（箭头旋转 90 度），高度自适应。1200px-800px 区间自动压缩左右内边距。

#### enter

`(e: MouseEvent | TouchEvent) => void`

鼠标进入事件处理

#### leave

`(e: MouseEvent | TouchEvent) => void`

鼠标离开事件处理

### 示例

```html
<pe-header>
    <pe-header-item href="/">首页</pe-header-item>
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