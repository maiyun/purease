# Purease

<p align="center"><img src="doc/logo.png" width="256" alt="ClickGo"></p>
<p align="center">
    <a href="https://github.com/maiyun/purease/blob/master/LICENSE">
        <img alt="License" src="https://img.shields.io/github/license/maiyun/purease?color=blue" />
    </a>
    <a href="https://www.npmjs.com/package/purease">
        <img alt="NPM stable version" src="https://img.shields.io/npm/v/purease?color=brightgreen&logo=npm" />
        <img alt="NPM beta version" src="https://img.shields.io/npm/v/purease/beta?color=yellowgreen&logo=npm" />
        <img alt="NPM development version" src="https://img.shields.io/npm/v/purease/dev?color=yellow&logo=npm" />
    </a><br>
    <a href="https://github.com/maiyun/purease/releases">
        <img alt="GitHub releases" src="https://img.shields.io/github/v/release/maiyun/purease?color=brightgreen&logo=github" />
        <img alt="GitHub pre-releases" src="https://img.shields.io/github/v/release/maiyun/purease?color=yellow&logo=github&include_prereleases" />
    </a>
    <a href="https://github.com/maiyun/purease/issues">
        <img alt="GitHub issues" src="https://img.shields.io/github/issues/maiyun/purease?color=blue&logo=github" />
    </a>
</p>

Lightweight and user-friendly front-end library.

## Installation

Load the module loader first, and then load it using the module loader.

**index.html**

```html
<script src="https://cdn.jsdelivr.net/npm/@litert/loader@3.5.1/dist/loader.min.js?path=index&npm={'purease':'0.0.1'}"></script>
```

**index.js**

```typescript
import * as purease from 'purease';
class Page extends clickgo.AbstractPage {
    public async main(): Promise<void> {
        // --- Write here ---
    }
}
clickgo.launcher(new Page());
```

### NPM

After installing with NPM, you'll get code hints.

```sh
$ npm i purease --save-dev
```