# 快速开始

## 安装

首先设置 Purease 模块的加载路径，然后使用 script 模块加载。

**index.html**

```html
<script type="importmap">
{
    "imports": {
        "purease": "https://cdn.jsdelivr.net/npm/purease@x.x.x/dist/index.js"
    }
}
</script>
<script type="module" src="index.js"></script>
```

也可以携带参数和全局变量。

```html
<script>
purease = {
    'config': {
        'cdn': 'https://cdn.jsdelivr.net',
    },
    'global': {},
};
</script>
```

布局代码直接写在 `body` 内即可，例如：

```html
<body>
<pe-banner class="index" direction="v" style="height: 600px;">
    <div class="pe-btitle">I'm glad to see you</div>
    <div class="pe-bnote">With Purease, you can quickly build a versatile, minimalist webpage.</div>
    <div class="pe-layout pe-gap-s" style="align-items: center;">
        <a class="pe-button pe-plain" href="./">Download</a>
        <a class="pe-button pe-dark" href="./">Download</a>
    </div>
</pe-banner>
</body>
```

- 注意：html 元素需要增加 `style="visibility: hidden; overflow: hidden;"` 样式，防止还未加载完之前显示错版页面。

**index.js**

```ts
import * as purease from 'purease';
class Page extends clickgo.AbstractPage {
    public async main(): Promise<void> {
        // --- 代码写在此处 ---
    }
}
purease.launcher(Page);
```

根据情况可以多个页面共用同一个 Page（即载入同一个定义了 Page 类的 js 文件）。

## 代码提示

安装 Purease 模块后，即可获得代码提示。

```sh
$ npm i purease --save-dev
```