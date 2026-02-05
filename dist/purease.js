import * as lControl from './control.js';
import * as lTool from './tool.js';
import * as lDom from './dom.js';
export { lControl as control, lTool as tool, lDom as dom };
/** --- 语言包 --- */
const locale = {
    'en': {
        'ok': 'OK',
        'yes': 'Yes',
        'no': 'No',
        'cancel': 'Cancel',
    },
    'sc': {
        'ok': '好',
        'yes': '是',
        'no': '否',
        'cancel': '取消',
    },
    'tc': {
        'ok': '好',
        'yes': '是',
        'no': '否',
        'cancel': '取消',
    },
    'ja': {
        'ok': '好',
        'yes': 'はい',
        'no': 'いいえ',
        'cancel': 'キャンセル',
    },
    'ko': {
        'ok': '확인',
        'yes': '예',
        'no': '아니오',
        'cancel': '취소',
    },
    'th': {
        'ok': 'ตกลง',
        'yes': 'ใช่',
        'no': 'ไม่',
        'cancel': 'ยกเลิก',
    },
    'es': {
        'ok': 'Aceptar',
        'yes': 'Sí',
        'no': 'No',
        'cancel': 'Cancelar',
    },
    'de': {
        'ok': 'OK',
        'yes': 'Ja',
        'no': 'Nein',
        'cancel': 'Abbrechen',
    },
    'fr': {
        'ok': 'OK',
        'yes': 'Oui',
        'no': 'Non',
        'cancel': 'Annuler',
    },
    'pt': {
        'ok': 'OK',
        'yes': 'Sim',
        'no': 'Não',
        'cancel': 'Cancelar',
    },
    'ru': {
        'ok': 'OK',
        'yes': 'Да',
        'no': 'Нет',
        'cancel': 'Отмена',
    },
    'vi': {
        'ok': '好',
        'yes': 'Có',
        'no': 'Không',
        'cancel': 'Hủy bỏ',
    },
};
/** --- 总大页面 --- */
export class AbstractPage {
    /** --- 系统当前语言 --- */
    _locale = 'en';
    /** --- 获取系统当前语言 --- */
    get locale() {
        return this._locale;
    }
    /** --- 语言包路径，为空则没有加载前端语言包 --- */
    _localePath = '';
    /** --- 获取语言包路径，可能为空 --- */
    get localePath() {
        return this._localePath;
    }
    constructor(opt) {
        if (opt.locale) {
            this._locale = opt.locale;
        }
        if (opt.localePath) {
            this._localePath = opt.localePath;
        }
    }
    /** --- 完全加载完成后执行，不会阻塞加载进程 --- */
    onReady() {
        return;
    }
    onBeforeUpdate() {
        return;
    }
    onUpdated() {
        return;
    }
    onBeforeUnmount() {
        return;
    }
    onUnmounted() {
        return;
    }
    /**
     * --- 获取 refs 情况 ---
     */
    get refs() {
        return this.$refs;
    }
    /**
     * --- 等待渲染 ---
     */
    get nextTick() {
        return this.$nextTick;
    }
    /**
     * --- 获取语言内容 ---
     */
    get l() {
        return (key, data) => {
            const loc = window.localeData?.[key] ?? '[LocaleError]' + key;
            if (!data) {
                return loc;
            }
            let i = -1;
            return window.localeData[this.locale][key].replace(/\?/g, function () {
                ++i;
                if (!data[i]) {
                    return '';
                }
                return data[i];
            });
        };
    }
    /**
     * --- 监视变动 ---
     * @param name 监视的属性
     * @param cb 回调
     * @param opt 参数
     */
    watch(name, cb, opt = {}) {
        return this.$watch(name, cb, opt);
    }
    /** --- dialog 信息 --- */
    dialogInfo = {
        'show': false,
        'title': '',
        'content': '',
        'buttons': ['OK'],
        'select': undefined
    };
    /** --- 弹出一个框框 --- */
    dialog(opt) {
        const o = typeof opt === 'string' ? {
            'content': opt
        } : opt;
        this.dialogInfo.show = true;
        this.dialogInfo.title = o.title ?? '';
        this.dialogInfo.content = o.content;
        this.dialogInfo.buttons = o.buttons ?? [locale[this.locale].ok];
        return new Promise((resolve) => {
            this.dialogInfo.select = async (button) => {
                if (!o.select) {
                    this.dialogInfo.show = false;
                    resolve(button);
                    return;
                }
                const res = o.select(button);
                const r = res instanceof Promise ? await res : res;
                if (r === false) {
                    return;
                }
                this.dialogInfo.show = false;
                resolve(button);
            };
        });
    }
    /** --- 验证码窗口 --- */
    captchaInfo = {
        'show': false,
        'now': '',
        'objects': {},
    };
    /**
     * --- 弹出验证码确认框，确认后可立即提交，可用于登录、发验证码按钮等地方 ---
     * --- 请勿开启 loading ---
     * @param opt 参数
     * @returns 验证是否通过
     */
    async showCaptcha(opt) {
        if (opt.factory === 'tc') {
            // --- TC ---
            if (!window.TencentCaptcha) {
                this.loading = true;
                await lTool.loadScripts([
                    'https://turing.captcha.qcloud.com/TJCaptcha.js'
                ]);
                this.loading = false;
            }
            const tcc = window.TencentCaptcha;
            if (!tcc) {
                return false;
            }
            this.captchaInfo.now = opt.akey;
            this.captchaInfo.objects[opt.akey] ??= {
                cb: () => { },
                'instance': new tcc(opt.akey, (res) => {
                    const event = {
                        'detail': {
                            'result': (res.ret === 0 && !res.errorCode) ? 1 : 0,
                            'token': res.ticket + '|' + res.randstr,
                        },
                    };
                    this.captchaInfo.objects[opt.akey].cb(event);
                }, {
                    'needFeedBack': false,
                })
            };
            return new Promise(resolve => {
                this.captchaInfo.objects[opt.akey].cb = (event) => {
                    this.captchaInfo.now = '';
                    resolve(event.detail.result === 1 ? event : false);
                };
                this.captchaInfo.objects[opt.akey].instance.show();
            });
        }
        // --- CF ---
        if (!window.turnstile) {
            this.loading = true;
            await lTool.loadScripts([
                'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
            ]);
            this.loading = false;
        }
        const cft = window.turnstile;
        if (!cft) {
            return false;
        }
        this.captchaInfo.show = true;
        this.captchaInfo.now = opt.akey;
        this.captchaInfo.objects[opt.akey] ??= {
            cb: () => { },
            'instance': cft.render(document.getElementsByClassName('pe-captchadialog')[0].children[0], {
                'sitekey': opt.akey,
                'size': 'flexible',
                callback: (token) => {
                    const event = {
                        'detail': {
                            'result': 1,
                            'token': token,
                        },
                    };
                    this.captchaInfo.objects[opt.akey].cb(event);
                    window.turnstile.remove(this.captchaInfo.objects[opt.akey].instance);
                    delete this.captchaInfo.objects[opt.akey];
                    this.captchaInfo.show = false;
                },
            })
        };
        return new Promise(resolve => {
            this.captchaInfo.objects[opt.akey].cb = (event) => {
                this.captchaInfo.now = '';
                resolve(event.detail.result === 1 ? event : false);
            };
        });
    }
    /** --- 仅 CF 模式会调用 --- */
    hideCaptcha() {
        const now = this.captchaInfo.now;
        if (!now || !this.captchaInfo.objects[now]) {
            return;
        }
        this.captchaInfo.objects[now].cb({
            'detail': {
                'result': 0,
                'token': '',
            }
        });
        window.turnstile.remove(this.captchaInfo.objects[now].instance);
        delete this.captchaInfo.objects[now];
        this.captchaInfo.show = false;
    }
    /** --- 弹出一个询问框 --- */
    async confirm(opt) {
        const o = typeof opt === 'string' ? {
            'content': opt
        } : opt;
        const buttons = [locale[this.locale].no, locale[this.locale].yes];
        if (o.cancel) {
            buttons.unshift(locale[this.locale].cancel);
        }
        const res = await this.dialog({
            'title': o.title,
            'content': o.content,
            'buttons': buttons,
        });
        if (res === locale[this.locale].yes) {
            return true;
        }
        if (res === locale[this.locale].cancel) {
            return 0;
        }
        return false;
    }
    /** --- 底部弹出提示框 --- */
    alertInfo = {
        'show': false,
        'content': '',
        'timer': 0,
        'type': 'default'
    };
    /** --- 显示一个 alert，支持 html，请注意传入内容的安全 --- */
    alert(content, type = 'default') {
        if (this.alertInfo.timer) {
            clearTimeout(this.alertInfo.timer);
            this.alertInfo.timer = 0;
        }
        this.alertInfo.content = content;
        this.alertInfo.show = true;
        this.alertInfo.timer = window.setTimeout(() => {
            this.alertInfo.show = false;
        }, 3000);
        this.alertInfo.type = type;
    }
    /** --- 整个窗口的宽度 --- */
    windowWidth = 0;
    /** --- 整个窗口的高度 --- */
    windowHeight = 0;
    /** --- 是否显示加载框 --- */
    loading = false;
    /** --- 滚动到顶部 --- */
    toTop() {
        /*
        document.getElementsByTagName('body')[0].scrollIntoView({
            'behavior': 'smooth'
        });
        */
        window.scrollTo({
            'top': 0,
            'behavior': 'smooth',
        });
    }
    /** --- 显示 lnav --- */
    showLnav() {
        document.querySelector('.pe-lnav-left')?.classList.add('pe-show');
    }
}
/** --- 大页面的内嵌页面 --- */
export class AbstractPanel {
    onBeforeUnmount() {
        return;
    }
    onUnmounted() {
        return;
    }
    /** --- 获取总大页面对象 --- */
    rootPage;
    /**
     * --- 获取语言内容 ---
     */
    get l() {
        return (key, data) => {
            return this.rootPage.l(key, data);
        };
    }
    /**
     * --- 获取 refs 情况 ---
     */
    get refs() {
        return this.$refs;
    }
    /**
     * --- 等待渲染 ---
     */
    get nextTick() {
        return this.$nextTick;
    }
    /**
     * --- 监视变动 ---
     * @param name 监视的属性
     * @param cb 回调
     * @param opt 参数
     */
    watch(name, cb, opt = {}) {
        return this.$watch(name, cb, opt);
    }
}
/** --- vue 对象 --- */
export let vue;
/** --- pointer 对象 --- */
export let pointer;
const dirname = import.meta.url.slice(0, import.meta.url.lastIndexOf('/'));
/** --- 获取当前所在目录（参数留空获取 Purease 所在的目录，不以 / 结尾 --- */
export function getDirname(importUrl) {
    if (!importUrl) {
        return dirname;
    }
    return importUrl.slice(0, importUrl.lastIndexOf('/'));
}
if (!window.purease) {
    window.purease = {};
}
/** --- 用户定义的 Purease 信息 --- */
const userPurease = window.purease;
/** --- 用户定义的全局对象 --- */
export let global = {
    'headerPop': false,
    'debug': false,
    ...(userPurease.global ?? {})
};
/** --- 读取用户的 cdn 设置 --- */
const cdn = userPurease.config?.cdn ?? 'https://cdn.jsdelivr.net';
/** --- 获取当前 cdn 前缀 --- */
export function getCdn() {
    return cdn;
}
/** ---运行当前页面 --- */
export function launcher(page, options = {}) {
    (async function () {
        global.debug = options.debug ?? false;
        const html = document.getElementsByTagName('html')[0];
        // --- 添加全局 scroll class 如果不在顶部的话 ---
        window.addEventListener('scroll', function () {
            const st = document.documentElement.scrollTop || document.body.scrollTop;
            if (st === 0) {
                html.classList.remove('pe-scroll');
            }
            else {
                html.classList.add('pe-scroll');
            }
        });
        const st = document.documentElement.scrollTop || document.body.scrollTop;
        if (st > 0) {
            html.classList.add('pe-scroll');
        }
        // --- 先加载核心库 ---
        await lTool.loadScript(`${cdn}/npm/vue@3.5.26/dist/vue.global${options.debug ? '' : '.prod.min'}.js`);
        // --- 再加载三方库，防止 Vue 没加载好，三方库加载会有异常 ---
        const paths = [
            `${cdn}/npm/naive-ui@2.43.2/dist/index.min.js`,
            `${cdn}/npm/@litert/pointer@1.6.2/dist/index.umd.min.js`,
        ];
        // --- 加载 vue 以及必要库 ---
        await lTool.loadScripts(paths);
        await lTool.loadLink(dirname + '/index.css', 'before');
        await lTool.loadLinks([
            `${cdn}/npm/@fortawesome/fontawesome-free@7.1.0/css/all.min.css`
        ]);
        const htmls = document.getElementsByTagName('html');
        if (!htmls[0]) {
            return;
        }
        const bodys = document.getElementsByTagName('body');
        if (!bodys[0]) {
            return;
        }
        // --- 加载语言包 ---
        if (options.localePath && options.locale) {
            const path = options.localePath.endsWith('/') ? options.localePath : options.localePath + '/';
            const res = await lTool.getResponseJson(path + options.locale + '.json', {
                'credentials': 'omit'
            });
            if (res) {
                window.localeData = res;
            }
        }
        // --- 实例化 page ---
        const cpage = new page({
            'locale': options.locale,
            'localePath': options.localePath,
        });
        // --- 将整个网页 vue 化 ---
        vue = window.Vue;
        pointer = window.pointer;
        userPurease.global = vue.reactive(global);
        global = userPurease.global;
        const styles = [];
        /** --- panel 的控件列表 --- */
        const panelComponents = {};
        options.panels ??= [];
        for (const p of options.panels) {
            const el = document.querySelector(p.selector);
            if (!el) {
                continue;
            }
            const panel = new p.panel();
            /** --- class 对象类的属性列表 --- */
            const idata = {};
            const cdata = Object.entries(panel);
            for (const item of cdata) {
                if (item[0] === 'access') {
                    // --- access 属性不放在 data 当中 ---
                    continue;
                }
                idata[item[0]] = item[1];
            }
            /** --- class 对象的方法和 getter/setter 列表 --- */
            const prot = lTool.getClassPrototype(panel);
            const methods = prot.method;
            const computed = prot.access;
            /** --- panel 自定义 --- */
            const layout = el.outerHTML.replace(/<script>([\s\S]*?)<\/script>/gi, () => {
                return '';
            }).replace(/<style>([\s\S]*?)<\/style>/gi, function (t, t1) {
                styles.push(t1);
                return '';
            });
            const panelname = 'pe-panel-' + lTool.random(16);
            panelComponents[panelname] = {
                'template': layout,
                'data': function () {
                    return lTool.clone(idata);
                },
                'methods': methods,
                'computed': computed,
                'created': function () {
                    if (page.access) {
                        this.access = lTool.clone(page.access);
                    }
                },
                'mounted': async function () {
                    await this.$nextTick();
                    this.rootPage = this.$root;
                    // --- 完成 ---
                    this.main();
                },
                'beforeUnmount': function () {
                    this.onBeforeUnmount();
                },
                'unmounted': async function () {
                    await this.$nextTick();
                    this.onUnmounted();
                }
            };
            el.replaceWith(document.createElement(panelname));
        }
        /** --- class 对象类的属性列表 --- */
        const idata = {};
        const cdata = Object.entries(cpage);
        for (const item of cdata) {
            if (item[0] === 'access') {
                // --- access 属性不放在 data 当中 ---
                continue;
            }
            idata[item[0]] = item[1];
        }
        idata['isRtl'] = false;
        // --- 主题覆盖 ---
        idata['themeOverrides'] = {};
        /** --- class 对象的方法和 getter/setter 列表 --- */
        const prot = lTool.getClassPrototype(cpage);
        const methods = prot.method;
        const computed = prot.access;
        const rtn = await new Promise(function (resolve) {
            const vapp = vue.createApp({
                'data': function () {
                    return lTool.clone(idata);
                },
                'methods': methods,
                'computed': computed,
                'created': function () {
                    if (page.access) {
                        this.access = lTool.clone(page.access);
                    }
                },
                'mounted': async function () {
                    await this.$nextTick();
                    this.windowWidth = window.innerWidth;
                    this.windowHeight = window.innerHeight;
                    // --- 更新 themeOverrides ---
                    const updateThemeOverrides = () => {
                        const pe = lDom.colorToHex(lDom.getCssVar('--pe'));
                        const peHover = lDom.colorToHex(lDom.getCssVar('--pe-hover'));
                        const peActive = lDom.colorToHex(lDom.getCssVar('--pe-active'));
                        const peBg = lDom.colorToHex(lDom.getCssVar('--pe-bg'));
                        const success = lDom.colorToHex(lDom.getCssVar('--success'));
                        const successHover = lDom.colorToHex(lDom.getCssVar('--success-hover'));
                        const successActive = lDom.colorToHex(lDom.getCssVar('--success-active'));
                        const info = lDom.colorToHex(lDom.getCssVar('--info'));
                        const infoHover = lDom.colorToHex(lDom.getCssVar('--info-hover'));
                        const infoActive = lDom.colorToHex(lDom.getCssVar('--info-active'));
                        const warning = lDom.colorToHex(lDom.getCssVar('--warning'));
                        const warningHover = lDom.colorToHex(lDom.getCssVar('--warning-hover'));
                        const warningActive = lDom.colorToHex(lDom.getCssVar('--warning-active'));
                        const danger = lDom.colorToHex(lDom.getCssVar('--danger'));
                        const dangerHover = lDom.colorToHex(lDom.getCssVar('--danger-hover'));
                        const dangerActive = lDom.colorToHex(lDom.getCssVar('--danger-active'));
                        const fontFamily = lDom.getCssVar('--pe-font-life');
                        const borderRadius = lDom.getCssVar('--pe-radius');
                        const borderColor = lDom.colorToHex(lDom.getCssVar('--pe-border'));
                        const popShadow = lDom.getCssVar('--pe-pop-shadow');
                        const outlineShadow = lDom.getCssVar('--pe-outline-shadow');
                        const fontSize = lDom.getCssVar('--pe-size');
                        const fontSizeS = lDom.getCssVar('--pe-size-s');
                        const fontSizeXs = lDom.getCssVar('--pe-size-xs');
                        const fontSizeL = lDom.getCssVar('--pe-size-l');
                        const fontSizeXl = lDom.getCssVar('--pe-size-xl');
                        // --- 计算高度：padding * 2 + fontSize * lineHeight ---
                        const lineHeight = parseFloat(getComputedStyle(bodys[0]).lineHeight) / parseFloat(fontSize);
                        const paddingXxs = parseFloat(lDom.getCssVar('--pe-padding-xxs'));
                        const paddingXs = parseFloat(lDom.getCssVar('--pe-padding-xs'));
                        const paddingS = parseFloat(lDom.getCssVar('--pe-padding-s'));
                        const fontSizeNum = parseFloat(fontSize);
                        const fontSizeSNum = parseFloat(fontSizeS);
                        const fontSizeLNum = parseFloat(fontSizeL);
                        const fontSizeXlNum = parseFloat(fontSizeXl);
                        this.themeOverrides = {
                            'common': {
                                'fontFamily': fontFamily,
                                'fontFamilyMono': 'Consolas, Menlo, Monaco, "Courier New", monospace',
                                'borderRadius': borderRadius,
                                'borderColor': borderColor,
                                // --- 弹出层阴影 ---
                                'boxShadow1': popShadow,
                                'boxShadow2': popShadow,
                                'boxShadow3': popShadow,
                                // --- 字号 ---
                                'fontSize': fontSize,
                                'fontSizeMini': fontSizeXs,
                                'fontSizeTiny': fontSizeXs,
                                'fontSizeSmall': fontSizeS,
                                'fontSizeMedium': fontSize,
                                'fontSizeLarge': fontSizeL,
                                'fontSizeHuge': fontSizeXl,
                                'lineHeight': lineHeight.toString(),
                                // --- 高度 ---
                                'heightMini': `${paddingXxs * 2 + fontSizeNum * lineHeight}px`,
                                'heightTiny': `${paddingXxs * 2 + fontSizeSNum * lineHeight}px`,
                                'heightSmall': `${paddingXs * 2 + fontSizeSNum * lineHeight}px`,
                                'heightMedium': `${paddingXs * 2 + fontSizeNum * lineHeight}px`,
                                'heightLarge': `${paddingS * 2 + fontSizeLNum * lineHeight}px`,
                                'heightHuge': `${paddingS * 2 + fontSizeXlNum * lineHeight}px`,
                                // --- 主题色 ---
                                'primaryColor': pe,
                                'primaryColorHover': peHover,
                                'primaryColorPressed': peActive,
                                'primaryColorSuppl': pe,
                                'infoColor': info,
                                'infoColorHover': infoHover,
                                'infoColorPressed': infoActive,
                                'infoColorSuppl': info,
                                'successColor': success,
                                'successColorHover': successHover,
                                'successColorPressed': successActive,
                                'successColorSuppl': success,
                                'warningColor': warning,
                                'warningColorHover': warningHover,
                                'warningColorPressed': warningActive,
                                'warningColorSuppl': warning,
                                'errorColor': danger,
                                'errorColorHover': dangerHover,
                                'errorColorPressed': dangerActive,
                                'errorColorSuppl': danger,
                            },
                            // --- 输入框 focus 发光 ---
                            'Input': {
                                'boxShadowFocus': outlineShadow,
                            },
                            // --- 级联选择器 ---
                            'Cascader': {
                                'menuBorderRadius': borderRadius,
                                'menuBoxShadow': popShadow,
                            },
                            // --- 选择器 ---
                            'Select': {
                                'peers': {
                                    'InternalSelection': {
                                        'boxShadowFocus': outlineShadow,
                                        'boxShadowActive': outlineShadow,
                                    },
                                },
                            },
                            // --- 内部选择菜单 ---
                            'InternalSelection': {
                                'boxShadowFocus': outlineShadow,
                                'boxShadowActive': outlineShadow,
                            },
                            // --- 内部选择菜单列表 ---
                            'InternalSelectMenu': {
                                'borderRadius': borderRadius,
                            },
                            // --- 下拉菜单 ---
                            'Dropdown': {
                                'borderRadius': borderRadius,
                                'optionBorderRadius': borderRadius,
                            },
                            // --- 弹出层 ---
                            'Popover': {
                                'boxShadow': popShadow,
                                'borderRadius': borderRadius,
                            },
                            // --- 按钮 ---
                            'Button': {
                                'colorPrimary': pe,
                                'colorHoverPrimary': peHover,
                                'colorPressedPrimary': peActive,
                                'colorFocusPrimary': peHover,
                                'borderPrimary': `1px solid ${pe}`,
                                'borderHoverPrimary': `1px solid ${peHover}`,
                                'borderPressedPrimary': `1px solid ${peActive}`,
                                'borderFocusPrimary': `1px solid ${peHover}`,
                                'rippleColorPrimary': peBg,
                            },
                        };
                    };
                    updateThemeOverrides();
                    window.addEventListener('resize', () => {
                        this.windowWidth = window.innerWidth;
                        bodys[0].style.setProperty('--pe-windowwidth', window.innerWidth + 'px');
                        bodys[0].style.setProperty('--pe-windowheight', window.innerHeight + 'px');
                        updateThemeOverrides();
                    });
                    // --- 判断是否显示右下角 toTop 按钮 ---
                    document.addEventListener('scroll', () => {
                        if (document.documentElement.scrollTop > 300) {
                            // --- 显示 ---
                            this.$refs.toTop.classList.add('pe-show');
                        }
                        else {
                            // --- 隐藏 ---
                            this.$refs.toTop.classList.remove('pe-show');
                        }
                    });
                    if (document.documentElement.scrollTop > 300) {
                        // --- 显示 ---
                        this.$refs.toTop.classList.add('pe-show');
                    }
                    else {
                        // --- 隐藏 ---
                        this.$refs.toTop.classList.remove('pe-show');
                    }
                    // ---------------
                    // --- pe-tree ---
                    // ---------------
                    const ptms = document.querySelectorAll('.pe-tree-menu');
                    for (const ptm of ptms) {
                        ptm.style.height = '0';
                    }
                    // --- 选中的默认展开 ---
                    const pitems = document.querySelectorAll('.pe-tree-item.pe-selected');
                    for (let pitem of pitems) {
                        // --- 从单个 pitem 往上找 pe-tree-menu ---
                        let parent = null;
                        while (parent = lDom.findParentByClass(pitem, 'pe-tree-menu')) {
                            parent.style.height = '';
                            parent.previousElementSibling?.classList.add('pe-open');
                            pitem = parent;
                        }
                    }
                    const trees = document.querySelectorAll('.pe-tree');
                    for (const tree of trees) {
                        tree.addEventListener('click', (e) => {
                            let target = e.target;
                            if (target.tagName.toLowerCase() !== 'div') {
                                return;
                            }
                            if (target.classList.contains('pe-tree-item')) {
                                // --- 正常 ---
                            }
                            else {
                                const parent = lDom.findParentByClass(target, 'pe-tree-item');
                                if (!parent) {
                                    return;
                                }
                                target = parent;
                            }
                            const next = target.nextElementSibling;
                            if (!next) {
                                return;
                            }
                            if (!next.classList.contains('pe-tree-menu')) {
                                return;
                            }
                            if (target.classList.contains('pe-open')) {
                                target.classList.remove('pe-open');
                                next.style.height = next.scrollHeight + 'px';
                                setTimeout(() => {
                                    next.style.height = '0';
                                }, 50);
                            }
                            else {
                                target.classList.add('pe-open');
                                next.style.height = next.scrollHeight + 'px';
                                setTimeout(() => {
                                    next.style.height = '';
                                }, 300);
                            }
                        });
                    }
                    // --- 判断是否显示 popbtn lnav ---
                    if (document.querySelector('.pe-lnav')) {
                        this.$refs.lnavBtn.classList.add('pe-show');
                    }
                    // --- 判断是不是 rtl 模式，以及监听 style 变化以更新 themeOverrides ---
                    const observer = new MutationObserver(mutations => {
                        for (const mutation of mutations) {
                            if (mutation.attributeName === 'class') {
                                this.isRtl = lDom.isRtl();
                            }
                            else if (mutation.attributeName === 'style') {
                                updateThemeOverrides();
                            }
                        }
                    });
                    observer.observe(htmls[0], {
                        'attributes': true,
                        'attributeFilter': ['class', 'style'],
                    });
                    // --- 完成 ---
                    resolve({
                        'vapp': vapp,
                        'vroot': this
                    });
                },
                'beforeUpdate': function () {
                    this.onBeforeUpdate();
                },
                'updated': async function () {
                    await this.$nextTick();
                    this.onUpdated();
                },
                'beforeUnmount': function () {
                    this.onBeforeUnmount();
                },
                'unmounted': async function () {
                    await this.$nextTick();
                    this.onUnmounted();
                }
            });
            vapp.config.errorHandler = function (err, vm, info) {
                display(err.message, err, vm, info);
            };
            // --- 剔除 script ---
            const scripts = bodys[0].querySelectorAll('script');
            for (const script of scripts) {
                script.remove();
            }
            // --- 挂载控件对象到 vapp ---
            for (const key in lControl.list) {
                lControl.list[key].computed ??= {};
                lControl.list[key].computed = {
                    ...lControl.list[key].computed,
                    ...lTool.clone(lControl.common.computed),
                };
                vapp.component(key, lControl.list[key]);
            }
            // --- 挂载 panel ---
            for (const key in panelComponents) {
                vapp.component(key, panelComponents[key]);
            }
            // --- 挂载 loading、系统 dialog ---
            bodys[0].insertAdjacentHTML('beforeend', `<pe-dialog :title="dialogInfo.title" :content="dialogInfo.content" :buttons="dialogInfo.buttons" :show="dialogInfo.show" @select="dialogInfo.select"></pe-dialog>` +
                // --- 右下角按钮 ---
                '<div class="pe-popbtns">' +
                // --- 滚动到顶部 ---
                '<div class="pe-popbtn pe-popbtn-top" ref="toTop" @click="toTop">' +
                '<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none"><path d="M19 15L12 9L10.25 10.5M5 15L7.33333 13" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
                '</div>' +
                // --- lnav ---
                '<div class="pe-popbtn pe-popbtn-lnav" ref="lnavBtn" @click="showLnav">' +
                '<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none"><path d="M4 7L7 7M20 7L11 7" stroke-width="1.5" stroke-linecap="round"></path><path d="M20 17H17M4 17L13 17" stroke-width="1.5" stroke-linecap="round"></path><path d="M4 12H7L20 12" stroke-width="1.5" stroke-linecap="round"></path></svg>' +
                '</div>' +
                '</div>' +
                // --- loading ---
                `<div class="pe-loading" :class="[loading&&'pe-show']">` +
                '<div class="pe-loading-item">' +
                '<div class="pe-loading-item-1"></div>' +
                '<div class="pe-loading-item-2"></div>' +
                '</div>' +
                '</div>' +
                // --- 下方提示框 ---
                `<div class="pe-alert" :class="[alertInfo.show&&'pe-show','pe-'+alertInfo.type]">` +
                '<div class="pe-alert-content">' +
                `<div class="pe-alert-icon"></div>` +
                `<div v-html="alertInfo.content"></div>` +
                '</div>' +
                '</div>' +
                `<div class="pe-captchadialog" :class="[captchaInfo.show&&'pe-show']">` +
                `<div></div>` +
                `<div class="pe-button" @click="hideCaptcha">` +
                `<pe-icon name="fa-solid fa-xmark"></pe-icon>` +
                `</div>` +
                `</div>`);
            bodys[0].style.setProperty('--pe-windowwidth', window.innerWidth + 'px');
            bodys[0].style.setProperty('--pe-windowheight', window.innerHeight + 'px');
            // --- 处理 body ---
            bodys[0].innerHTML = `<n-config-provider :theme-overrides="themeOverrides">${lTool.purify(bodys[0].innerHTML)}</n-config-provider>`;
            // --- 真正挂载 ---
            vapp.use(window.naive);
            vapp.mount(bodys[0]);
        });
        // --- 将 panel 的 style 加到 head 里 ---
        if (styles.length) {
            const head = document.getElementsByTagName('head');
            if (head[0]) {
                head[0].insertAdjacentHTML('beforeend', '<style data-pe-panels>' + styles.join('') + '</style>');
            }
        }
        // --- 执行回调 ---
        await lTool.sleep(34);
        await cpage.main.call(rtn.vroot);
        htmls[0].style.overflow = '';
        htmls[0].style.visibility = '';
        // --- 执行 onReady ---
        await cpage.onReady.call(rtn.vroot);
    })().catch(function (e) {
        display('launcher', e);
    });
}
/**
 * --- 打印调试信息，线上环境不会打印 ---
 * @param message 参数
 * @param optionalParams 参数
 */
export function debug(message, ...optionalParams) {
    if (!global.debug) {
        return;
    }
    // eslint-disable-next-line no-console
    console.debug(message, ...optionalParams);
}
/**
 * --- 向控制台直接显示内容，一般情况下禁止使用 ---
 * @param message 参数
 * @param optionalParams 参数
 */
export function display(message, ...optionalParams) {
    // eslint-disable-next-line no-console
    console.log(message, ...optionalParams);
}
