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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tool = exports.launcher = exports.global = exports.vue = exports.AbstractPanel = exports.AbstractPage = void 0;
const control = __importStar(require("./control"));
const tool = __importStar(require("./tool"));
exports.tool = tool;
class AbstractPage {
    isDebug() {
        return this._debug;
    }
    constructor(opt = {}) {
        this._debug = false;
        this.dialogInfo = {
            'show': false,
            'title': '',
            'content': '',
            'buttons': ['OK'],
            'select': (button) => { }
        };
        this.notifyInfo = {
            'show': false,
            'content': '',
            'timer': 0
        };
        if (opt.debug) {
            this._debug = true;
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
    notify(content) {
        if (this.notifyInfo.timer) {
            clearTimeout(this.notifyInfo.timer);
            this.notifyInfo.timer = 0;
        }
        this.notifyInfo.content = content;
        this.notifyInfo.show = true;
        this.notifyInfo.timer = window.setTimeout(() => {
            this.notifyInfo.show = false;
        }, 3000);
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
exports.global = {
    'headerPop': false
};
function launcher(page, panels = []) {
    (function () {
        return __awaiter(this, void 0, void 0, function* () {
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
                `${loader.cdn}/npm/vue@3.4.21/dist/vue.global${page.isDebug() ? '' : '.prod.min'}.js`
            ];
            yield loader.loadScripts(paths);
            const bodys = document.getElementsByTagName('body');
            if (!bodys[0]) {
                return;
            }
            exports.vue = window.Vue;
            exports.global = exports.vue.reactive({
                'headerPop': false
            });
            const panelComponents = {};
            for (const p of panels) {
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
                const panelname = 'pe-panel-' + tool.random(16);
                panelComponents[panelname] = {
                    'template': el.outerHTML,
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
            const cdata = Object.entries(page);
            for (const item of cdata) {
                if (item[0] === 'access') {
                    continue;
                }
                idata[item[0]] = item[1];
            }
            const prot = tool.getClassPrototype(page);
            const methods = prot.method;
            const computed = prot.access;
            const rtn = yield new Promise(function (resolve) {
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
                            yield this.$nextTick();
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
                };
                for (const key in control.list) {
                    vapp.component(key, control.list[key]);
                }
                for (const key in panelComponents) {
                    vapp.component(key, panelComponents[key]);
                }
                bodys[0].insertAdjacentHTML('beforeend', `<pe-dialog :title="dialogInfo.title" :content="dialogInfo.content" :buttons="dialogInfo.buttons" :show="dialogInfo.show" @select="dialogInfo.select"></pe-dialog>` +
                    '<div class="pe-popbtns">' +
                    '<div class="pe-popbtn"></div>' +
                    '</div>' +
                    '<div class="pe-loading"></div>' +
                    `<div class="pe-notify" :class="[notifyInfo.show&&'pe-show']">` +
                    '<div class="pe-notify-content" v-html="notifyInfo.content"></div>' +
                    '</div>');
                vapp.mount(bodys[0]);
            });
            yield tool.sleep(34);
            yield page.main.call(rtn.vroot);
            document.getElementsByTagName('body')[0].style.visibility = 'initial';
        });
    })().catch(function (e) {
        console.log('launcher', e);
    });
}
exports.launcher = launcher;
