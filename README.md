# Purease

<p align="center"><img src="doc/logo.png" width="256" alt="Purease"></p>
<p align="center">
    <a href="https://github.com/maiyun/purease/blob/master/LICENSE">
        <img alt="License" src="https://img.shields.io/github/license/maiyun/purease?color=blue" />
    </a>
    <a href="https://www.npmjs.com/package/purease">
        <img alt="NPM stable version" src="https://img.shields.io/npm/v/purease?color=brightgreen&logo=npm" />
    </a>
    <a href="https://github.com/maiyun/purease/releases">
        <img alt="GitHub releases" src="https://img.shields.io/github/v/release/maiyun/purease?color=brightgreen&logo=github" />
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
<script src="https://cdn.jsdelivr.net/npm/@litert/loader@3.5.7/dist/loader.min.js?path=index&npm={'purease':'0.0.7'}"></script>
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

## Demo

Clone and visit "dist/test/index.html".

[Click here to visit online.](https://maiyun.github.io/purease/dist/test/)

## License

This library is published under [Apache-2.0](./LICENSE) license.

## Third-party licenses

### **LICENSE:** CC Attribution License **AUTHOR:** Solar Icons

#### Header

[Hamburger Menu SVG Vector](https://www.svgrepo.com/svg/529002/hamburger-menu)  
[Close Square SVG Vector](https://www.svgrepo.com/svg/528911/close-square)

#### Check

[Check SVG Vector](https://www.svgrepo.com/svg/506431/check)

#### Page

[More Horizontal SVG Vector](https://www.svgrepo.com/svg/447028/more-horizontal)

#### Popbtn

##### Top

[Alt Arrow Up SVG Vector](https://www.svgrepo.com/svg/529345/alt-arrow-up)

#### Icon

##### link

[Square Top Down SVG Vector 6](https://www.svgrepo.com/svg/529231/square-top-down)  

##### language

[Language SVG Vector](https://www.svgrepo.com/svg/451017/language)