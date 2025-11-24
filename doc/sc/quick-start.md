# 快速开始

## 安装

首先设置 Purease 模块的加载路径，然后使用 script 模块加载。

**index.html**

```html
<script type="importmap">
{
    "imports": {
        "purease": "https://cdn.jsdelivr.net/npm/purease@1.x.x/dist/index.js"
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

## 代码提示

安装 Purease 模块后，即可获得代码提示。

```sh
$ npm i purease --save-dev
```