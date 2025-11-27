包含左侧导航栏的框架控件，支持响应式折叠

### 参数

### 类属性

### 方法

### 插槽

#### left

左侧栏内容区，通常用于放置导航菜单或侧栏内容

### 样式

适配 Web 应用的两栏式页面布局框架，由顶部 header、左侧导航栏和右侧主内容区三部分组成。采用横向弹性布局，顶部内边距等于 header 高度以避免重叠。左侧栏为粘性定位，宽度自定义，内部垂直可滚动；右侧主内容区弹性扩展，高度自适应，支持垂直滚动。左右分界线为 1px 边框。

在 800px 以下屏幕宽度时，左侧栏切换为全屏抽屉模式：固定定位覆盖整个视口，宽度 80%，右侧为半透明遮罩（rgba(0,0,0,.3)），栏体采用白色背景和投影效果；隐藏时通过 transform 将栏体向左平移移出屏幕，同时移除交互指针事件。

### 示例

```html
<pe-lnav>
    <template v-slot:left>
        <div class="pe-tree" style="min-width: 200px;">
            <a class="pe-tree-item" href="javascript:void(0);">Index</a>
            <div class="pe-tree-title">Part 1</div>
            <div class="pe-tree-item">Nav 1</div>
            <div class="pe-tree-menu">
                <a class="pe-tree-item" href="javascript:void(0);">Sub 1</a>
                <div class="pe-tree-item">Sub 2</div>
            </div>
        </div>
    </template>
    <!-- 右侧 -->
    <pe-banner class="pe-grad" direction="v" style="height: 250px; padding-top: 0;">
        <div class="pe-crumb">
            <a class="pe-crumb-item" href="./">Home</a>
            <div class="pe-crumb-item">Nav 9</div>
        </div>
        <div class="pe-btitle">Grad title</div>
        <div class="pe-bnote">Grad note Grad note Grad note Grad note Grad note Grad note Grad note</div>
    </pe-banner>
    <div class="pe-content">
        <!-- 右侧 content 内容 -->
        <pe-anchor>
            <h2>Title 1</h2>
            <p>
                Test Test Test Test Test Test Test<br>
                Test Test Test Test Test Test Test
            </p>
            <h2>Title 2</h2>
            <p>
                Test Test Test Test Test Test Test<br>
                Test Test Test Test Test Test Test
            </p>
        </pe-anchor>
    </div>
    <!-- 脚部 -->
    <div id="footer">
        <pe-footer>
            <div class="pe-footer-list pe-footer-end">
                <div class="pe-footer-logo"></div>
            </div>
            <div class="pe-footer-list">
                <div class="pe-footer-title">List 1</div>
                <a href="./">Page 1</a>
            </div>
            <div class="pe-footer-list">
                <div class="pe-footer-title">List 2</div>
                <a href="./" target="_blank">Page 1<pe-icon></pe-icon></a>
            </div>
            <div class="pe-footer-list">
                <div class="pe-footer-title">List 3</div>
                <a href="./">Page 1</a>
            </div>
            <template v-slot:bottom>
                <div class="pe-footer-bottom-row">
                    <div class="pe-layout">Item1</div>
                </div>
            </template>
        </pe-footer>
    </div>
</pe-lnav>
```