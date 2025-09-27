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

To get started, package your entry file into a single bundle using the command:

```sh
npx purease -b index -p https://cdn.jsdelivr.net/npm/purease@1.x.x/dist/index.js
```

Then, reference the bundled file in your web page.

**index.html**

```html
<script type="module" src="index.pack.js"></script>
```

**index.js**

```typescript
import * as purease from 'purease';
class Page extends clickgo.AbstractPage {
    public async main(): Promise<void> {
        // --- Write here ---
    }
}
purease.launcher(Page);
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

#### Drawer

[Close SVG Vector](https://www.svgrepo.com/svg/446990/close)

#### Popbtn

##### Top

[Alt Arrow Up SVG Vector](https://www.svgrepo.com/svg/529345/alt-arrow-up)

##### Lnav

[Hamburger Menu SVG Vector](https://www.svgrepo.com/svg/529002/hamburger-menu)  
[Close Square SVG Vector](https://www.svgrepo.com/svg/528911/close-square)

#### Icon

##### link

[Square Top Down SVG Vector 6](https://www.svgrepo.com/svg/529231/square-top-down)

##### language

[Language SVG Vector](https://www.svgrepo.com/svg/451017/language)

##### backspace

[Backspace SVG Vector](https://www.svgrepo.com/svg/529359/backspace)

##### switch

[Switch SVG Vector](https://www.svgrepo.com/svg/391098/switch)

### **LICENSE:** CC Attribution License **AUTHOR:** Dazzle UI

#### Icon

##### eye

[Eye Slash Alt SVG](https://www.svgrepo.com/svg/532463/eye-slash-alt)

##### eye-alt

[Eye Alt SVG Vector ](https://www.svgrepo.com/svg/532492/eye-alt)

### **LICENSE:** Apache License **AUTHOR:** topcoat

[Back Light SVG Vector](https://www.svgrepo.com/svg/370957/back-light)

### **LICENSE:** MIT License **AUTHOR:** sigurdarson

#### Date

[Close SVG Vector](https://www.svgrepo.com/svg/446990/close)

#### Daterange

[Close SVG Vector](https://www.svgrepo.com/svg/446990/close)