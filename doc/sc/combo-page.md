# 组合式页面

一般情况下，定义的单 Page 类可以在一个或多个页面共用，但比如 header、footer 等可能是额外定义的公共页面和类，然后引入进来，此时需要用组合式页面的方案。

## 定义公共页面

每张网页只能有最多一个 Page 类，因此公共页面需要使用 Panel。

我们先定义要公用的 footer，首先创建 `footer.html`（或你项目自定义的如在 Kebab 下即创建 `footer.ejs`），然后在 `footer` 内写入 HTML 内容（不要带 `html`、`body`、`head` 等标签），例如：

```html
<script>
purease.global = {
    ...purease.global,
    'footerInfo': '222'
};
</script>
<style>
.teststyle {
    color: var(--danger);
}
</style>
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
        <a href="./">Page 2</a>
    </div>
    <div class="pe-footer-list">
        <div class="pe-footer-title">List 3</div>
        <a href="./">Page 1</a>
    </div>
    <template v-slot:bottom>
        <div class="pe-footer-bottom-row">
            <div class="pe-alayout" style="gap: 10px; align-items: center;">
                <div>This is some footer information</div>
                <div>Note2</div>
            </div>
        </div>
        <div class="pe-footer-bottom-row teststyle">
            <div class="pe-layout">Item1</div>
            <div class="pe-layout">Item3</div>
            <div class="pe-layout">{{text}}</div>
        </div>
    </template>
</pe-footer>
```

若不需要 script 和 style 可以不写。

> global 数据也是与当前页面的 global 合并的，所以要注意不能重名

> style 的类属性也是全局的，因此不能和全局类属性重名

对应的 footer.ts 编写示例：

```ts
import * as purease from 'purease';

export default class extends purease.AbstractPanel {

    public text = 'Item4';

    public async main(): Promise<void> {
        await purease.tool.sleep(2000);
        this.text = 'Test';
    }

}
```

## 定义主页面

需要在主页面中引入公共页面，我们先定义主页面的布局，例如 `index.ejs` 文件：

```html
<!DOCTYPE HTML>
<html style="visibility: hidden; overflow: hidden;">
<head>
<title>Control - Purease Test</title>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
<script type="importmap">
{
    "imports": {
        "purease": "https://cdn.jsdelivr.net/npm/purease@x.x.x/dist/index.js"
    }
}
</script>
<script>
purease = {
    'config': {
        'cdn': 'https://cdn.jsdelivr.net',
    },
    'global': {},
};
</script>
<script type="module" src="./index.js"></script>
</head>
<body>
<div id="header"><!-- 此处可动态引入 header 的公共页面，可参看下方 footer 处用 ejs 的形式动态引入的示例 --></div>
<pe-banner class="pe-grey" direction="v" style="height: 350px;">
    <div class="pe-btitle">The main page</div>
    <div class="pe-bnote">Hello world!</div>
</pe-banner>
<!-- 其他主页面元素 -->
<div id="footer"><%- footer %></div>
</body>
</html>
```

其中，`footer` 变量是已经传给了 ejs 库的 `footer.ejs` 的布局内容，接下来我们编写 `index.ts` 示例：

```ts
import * as purease from 'purease';
import footer from './footer.js';

class Page extends purease.AbstractPage {

    public test = 0;

    public main(): void {
        purease.display('Inited.', purease);
    }

    public onReady(): void {
        purease.display('onReady', purease);
    }

}

purease.launcher(Page, {
    'debug': true,
    'locale': 'sc',
    'localePath': purease.getDirname(import.meta.url) + '/locale',
    'panels': [
        {
            'selector': '#footer',
            'panel': footer,
        }
    ]
});
```

也就是需要在主页面的代码中先 import 公共页面的 js 文件，然后在 `launcher` 方法中配置 `panels` 数组，`selector` 参数对应 dom 选择器定义公共页面在主页面的中的位置。