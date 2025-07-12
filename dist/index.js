"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.global = exports.vue = exports.AbstractPanel = exports.AbstractPage = exports.tool = void 0;
exports.launcher = launcher;
const control = __importStar(require("./control"));
const tool = __importStar(require("./tool"));
exports.tool = tool;
const dom = __importStar(require("./dom"));
class AbstractPage {
    get locale() {
        return this._locale;
    }
    get localePath() {
        return this._localePath;
    }
    constructor(opt) {
        this._locale = 'en';
        this._localePath = '';
        this.dialogInfo = {
            'show': false,
            'title': '',
            'content': '',
            'buttons': ['OK'],
            'select': undefined
        };
        this.alertInfo = {
            'show': false,
            'content': '',
            'timer': 0,
            'type': 'default'
        };
        this.windowWidth = 0;
        this.windowHeight = 0;
        this.loading = false;
        if (opt.locale) {
            this._locale = opt.locale;
        }
        if (opt.localePath) {
            this._localePath = opt.localePath;
        }
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
    get refs() {
        return this.$refs;
    }
    get nextTick() {
        return this.$nextTick;
    }
    get l() {
        return (key, data) => {
            var _a, _b;
            const loc = (_b = (_a = window.localeData) === null || _a === void 0 ? void 0 : _a[key]) !== null && _b !== void 0 ? _b : '[LocaleError]' + key;
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
    watch(name, cb, opt = {}) {
        return this.$watch(name, cb, opt);
    }
    dialog(opt) {
        var _a, _b;
        const o = typeof opt === 'string' ? {
            'content': opt
        } : opt;
        this.dialogInfo.show = true;
        this.dialogInfo.title = (_a = o.title) !== null && _a !== void 0 ? _a : '';
        this.dialogInfo.content = o.content;
        this.dialogInfo.buttons = (_b = o.buttons) !== null && _b !== void 0 ? _b : ['OK'];
        return new Promise((resolve) => {
            this.dialogInfo.select = (button) => __awaiter(this, void 0, void 0, function* () {
                if (!o.select) {
                    this.dialogInfo.show = false;
                    resolve(button);
                    return;
                }
                const res = o.select(button);
                const r = res instanceof Promise ? yield res : res;
                if (r === false) {
                    return;
                }
                this.dialogInfo.show = false;
                resolve(button);
            });
        });
    }
    confirm(opt) {
        return __awaiter(this, void 0, void 0, function* () {
            const o = typeof opt === 'string' ? {
                'content': opt
            } : opt;
            const buttons = ['No', 'Yes'];
            if (o.cancel) {
                buttons.unshift('Cancel');
            }
            const res = yield this.dialog({
                'title': o.title,
                'content': o.content,
                'buttons': buttons
            });
            if (res === 'Yes') {
                return true;
            }
            if (res === 'Cancel') {
                return 0;
            }
            return false;
        });
    }
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
    toTop() {
        window.scrollTo({
            'top': 0,
            'behavior': 'smooth',
        });
    }
    showLnav() {
        var _a;
        (_a = document.querySelector('.pe-lnav-left')) === null || _a === void 0 ? void 0 : _a.classList.add('pe-show');
    }
}
exports.AbstractPage = AbstractPage;
class AbstractPanel {
    onBeforeUnmount() {
        return;
    }
    onUnmounted() {
        return;
    }
    get l() {
        return (key, data) => {
            return this.rootPage.l(key, data);
        };
    }
    get refs() {
        return this.$refs;
    }
    get nextTick() {
        return this.$nextTick;
    }
    watch(name, cb, opt = {}) {
        return this.$watch(name, cb, opt);
    }
}
exports.AbstractPanel = AbstractPanel;
exports.global = Object.assign({ 'headerPop': false }, ((_a = window.pureaseGlobal) !== null && _a !== void 0 ? _a : {}));
function launcher(page, options = {}) {
    (function () {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const html = document.getElementsByTagName('html')[0];
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
            const paths = [
                `${loader.cdn}/npm/vue@3.4.27/dist/vue.global${options.debug ? '' : '.prod.min'}.js`
            ];
            yield loader.loadScripts(paths);
            yield loader.loadLink(__dirname + '/index.css', undefined, 'before');
            const htmls = document.getElementsByTagName('html');
            if (!htmls[0]) {
                return;
            }
            const bodys = document.getElementsByTagName('body');
            if (!bodys[0]) {
                return;
            }
            if (options.localePath && options.locale) {
                const path = options.localePath.endsWith('/') ? options.localePath : options.localePath + '/';
                const res = yield tool.getResponseJson(path + options.locale + '.json', {
                    'credentials': 'omit'
                });
                if (res) {
                    window.localeData = res;
                }
            }
            const cpage = new page({
                'locale': options.locale,
                'localePath': options.localePath,
            });
            exports.vue = window.Vue;
            exports.global = exports.vue.reactive(exports.global);
            const styles = [];
            const panelComponents = {};
            (_a = options.panels) !== null && _a !== void 0 ? _a : (options.panels = []);
            for (const p of options.panels) {
                const el = document.querySelector(p.selector);
                if (!el) {
                    continue;
                }
                const panel = new p.panel();
                const idata = {};
                const cdata = Object.entries(panel);
                for (const item of cdata) {
                    if (item[0] === 'access') {
                        continue;
                    }
                    idata[item[0]] = item[1];
                }
                const prot = tool.getClassPrototype(panel);
                const methods = prot.method;
                const computed = prot.access;
                const layout = el.outerHTML.replace(/<script>([\s\S]*?)<\/script>/gi, () => {
                    return '';
                }).replace(/<style>([\s\S]*?)<\/style>/gi, function (t, t1) {
                    styles.push(t1);
                    return '';
                });
                const panelname = 'pe-panel-' + tool.random(16);
                panelComponents[panelname] = {
                    'template': layout,
                    'data': function () {
                        return tool.clone(idata);
                    },
                    'methods': methods,
                    'computed': computed,
                    'created': function () {
                        if (page.access) {
                            this.access = tool.clone(page.access);
                        }
                    },
                    'mounted': function () {
                        return __awaiter(this, void 0, void 0, function* () {
                            yield this.$nextTick();
                            this.rootPage = this.$root;
                            this.main();
                        });
                    },
                    'beforeUnmount': function () {
                        this.onBeforeUnmount();
                    },
                    'unmounted': function () {
                        return __awaiter(this, void 0, void 0, function* () {
                            yield this.$nextTick();
                            this.onUnmounted();
                        });
                    }
                };
                el.replaceWith(document.createElement(panelname));
            }
            const idata = {};
            const cdata = Object.entries(cpage);
            for (const item of cdata) {
                if (item[0] === 'access') {
                    continue;
                }
                idata[item[0]] = item[1];
            }
            const prot = tool.getClassPrototype(cpage);
            const methods = prot.method;
            const computed = prot.access;
            const rtn = yield new Promise(function (resolve) {
                var _a;
                var _b;
                const vapp = exports.vue.createApp({
                    'data': function () {
                        return tool.clone(idata);
                    },
                    'methods': methods,
                    'computed': computed,
                    'created': function () {
                        if (page.access) {
                            this.access = tool.clone(page.access);
                        }
                    },
                    'mounted': function () {
                        return __awaiter(this, void 0, void 0, function* () {
                            var _a, _b;
                            yield this.$nextTick();
                            this.windowWidth = window.innerWidth;
                            this.windowHeight = window.innerHeight;
                            window.addEventListener('resize', () => {
                                this.windowWidth = window.innerWidth;
                                bodys[0].style.setProperty('--pe-windowwidth', window.innerWidth + 'px');
                                bodys[0].style.setProperty('--pe-windowheight', window.innerHeight + 'px');
                            });
                            document.addEventListener('scroll', () => {
                                if (document.documentElement.scrollTop > 300) {
                                    this.$refs.toTop.classList.add('pe-show');
                                }
                                else {
                                    this.$refs.toTop.classList.remove('pe-show');
                                }
                            });
                            if (document.documentElement.scrollTop > 300) {
                                this.$refs.toTop.classList.add('pe-show');
                            }
                            else {
                                this.$refs.toTop.classList.remove('pe-show');
                            }
                            const ptms = document.querySelectorAll('.pe-tree-menu');
                            for (const ptm of ptms) {
                                ptm.style.height = '0';
                            }
                            const pitems = document.querySelectorAll('.pe-tree-item.pe-selected');
                            for (let pitem of pitems) {
                                let parent = null;
                                while (parent = dom.findParentByClass(pitem, 'pe-tree-menu')) {
                                    parent.style.height = '';
                                    (_a = parent.previousElementSibling) === null || _a === void 0 ? void 0 : _a.classList.add('pe-open');
                                    pitem = parent;
                                }
                            }
                            (_b = document.querySelector('.pe-tree')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', (e) => {
                                let target = e.target;
                                if (target.tagName.toLowerCase() !== 'div') {
                                    return;
                                }
                                if (target.classList.contains('pe-tree-item')) {
                                }
                                else {
                                    const parent = dom.findParentByClass(target, 'pe-tree-item');
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
                            if (document.querySelector('.pe-lnav')) {
                                this.$refs.lnavBtn.classList.add('pe-show');
                            }
                            resolve({
                                'vapp': vapp,
                                'vroot': this
                            });
                        });
                    },
                    'beforeUpdate': function () {
                        this.onBeforeUpdate();
                    },
                    'updated': function () {
                        return __awaiter(this, void 0, void 0, function* () {
                            yield this.$nextTick();
                            this.onUpdated();
                        });
                    },
                    'beforeUnmount': function () {
                        this.onBeforeUnmount();
                    },
                    'unmounted': function () {
                        return __awaiter(this, void 0, void 0, function* () {
                            yield this.$nextTick();
                            this.onUnmounted();
                        });
                    }
                });
                vapp.config.errorHandler = function (err, vm, info) {
                    console.error(err.message, err, vm, info);
                };
                const scripts = bodys[0].querySelectorAll('script');
                for (const script of scripts) {
                    script.remove();
                }
                for (const key in control.list) {
                    (_a = (_b = control.list[key]).computed) !== null && _a !== void 0 ? _a : (_b.computed = {});
                    control.list[key].computed = Object.assign(Object.assign({}, control.list[key].computed), tool.clone(control.common.computed));
                    vapp.component(key, control.list[key]);
                }
                for (const key in panelComponents) {
                    vapp.component(key, panelComponents[key]);
                }
                bodys[0].insertAdjacentHTML('beforeend', `<pe-dialog :title="dialogInfo.title" :content="dialogInfo.content" :buttons="dialogInfo.buttons" :show="dialogInfo.show" @select="dialogInfo.select"></pe-dialog>` +
                    '<div class="pe-popbtns">' +
                    '<div class="pe-popbtn pe-popbtn-top" ref="toTop" @click="toTop">' +
                    '<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none"><path d="M19 15L12 9L10.25 10.5M5 15L7.33333 13" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
                    '</div>' +
                    '<div class="pe-popbtn pe-popbtn-lnav" ref="lnavBtn" @click="showLnav">' +
                    '<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none"><path d="M4 7L7 7M20 7L11 7" stroke-width="1.5" stroke-linecap="round"></path><path d="M20 17H17M4 17L13 17" stroke-width="1.5" stroke-linecap="round"></path><path d="M4 12H7L20 12" stroke-width="1.5" stroke-linecap="round"></path></svg>' +
                    '</div>' +
                    '</div>' +
                    `<div class="pe-loading" :class="[loading&&'pe-show']">` +
                    '<div class="pe-loading-item">' +
                    '<div class="pe-loading-item-1"></div>' +
                    '<div class="pe-loading-item-2"></div>' +
                    '</div>' +
                    '</div>' +
                    `<div class="pe-alert" :class="[alertInfo.show&&'pe-show','pe-'+alertInfo.type]">` +
                    '<div class="pe-alert-content">' +
                    `<div class="pe-alert-icon"></div>` +
                    `<div v-html="alertInfo.content"></div>` +
                    '</div>' +
                    '</div>');
                bodys[0].style.setProperty('--pe-windowwidth', window.innerWidth + 'px');
                bodys[0].style.setProperty('--pe-windowheight', window.innerHeight + 'px');
                bodys[0].innerHTML = tool.purify(bodys[0].innerHTML);
                vapp.mount(bodys[0]);
            });
            if (styles.length) {
                const head = document.getElementsByTagName('head');
                if (head[0]) {
                    head[0].insertAdjacentHTML('beforeend', '<style data-pe-panels>' + styles.join('') + '</style>');
                }
            }
            yield tool.sleep(34);
            yield cpage.main.call(rtn.vroot);
            htmls[0].style.overflow = '';
            htmls[0].style.visibility = '';
        });
    })().catch(function (e) {
        console.log('launcher', e);
    });
}
