import * as types from '../types';
import * as control from './control';
import * as tool from './tool';

export { tool };

/** --- 总大页面 --- */
export abstract class AbstractPage {

    /** --- 当前是否是 debug 模式 --- */
    private _debug: boolean = false;

    /** --- 判断当前是否是 debug 模式 --- */
    public isDebug(): boolean {
        return this._debug;
    }

    public constructor(opt: {
        'debug'?: boolean;
    } = {}) {
        if (opt.debug) {
            this._debug = true;
        }
    }

    /** --- 入口方法 --- */
    public abstract main(): void | Promise<void>;

    public onBeforeUpdate(): void | Promise<void> {
        return;
    }

    public onUpdated(): void | Promise<void> {
        return;
    }

    public onBeforeUnmount(): void | Promise<void> {
        return;
    }

    public onUnmounted():  void | Promise<void> {
        return;
    }

    /**
     * --- 获取 refs 情况 ---
     */
    public get refs(): Record<string, HTMLElement & types.IVue & Record<string, any>> {
        return (this as any).$refs;
    }

    /**
     * --- 等待渲染 ---
     */
    public get nextTick(): () => Promise<void> {
        return (this as any).$nextTick;
    }

    /*
    public get l() {
        return (key: string, data?: string[]): string => {
            const loc = (this as any).localeData?.[this.$root.locale][key] ?? '[LocaleError]' + key;
            if (!data) {
                return loc;
            }
            let i: number = -1;
            return (this as any).localeData[this.$root.locale][key].replace(/\?/g, function() {
                ++i;
                if (!data[i]) {
                    return '';
                }
                return data[i];
            });
        };
    }
    */

    /**
     * --- 监视变动 ---
     * @param name 监视的属性
     * @param cb 回调
     * @param opt 参数
     */
    public watch<T extends this, TK extends keyof T, TR>(
        name: TK | (() => TR),
        cb: (val: T[TK] & TR, old: T[TK] & TR) => void | Promise<void>,
        opt: {
            'immediate'?: boolean;
            'deep'?: boolean;
        } = {}
    ): () => void {
        return (this as any).$watch(name, cb, opt);
    }

    public dialogInfo = {
        'show': false,
        'title': '',
        'content': '',
        'buttons': ['OK'],
        'select': (button: string) => {}
    };

    /** --- 弹出一个框框 --- */
    public dialog(opt: string | types.IDialogOptions): Promise<string> {
        const o = typeof opt === 'string' ? {
            'content': opt
        } : opt;
        this.dialogInfo.show = true;
        this.dialogInfo.title = o.title ?? '';
        this.dialogInfo.content = o.content;
        this.dialogInfo.buttons = o.buttons ?? ['OK'];
        return new Promise((resolve) => {
            this.dialogInfo.select = async (button: string) => {
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

    /** --- 弹出一个询问框 --- */
    public async confirm(opt: string | types.IConfirmOptions): Promise<boolean | number> {
        const o = typeof opt === 'string' ? {
            'content': opt
        } : opt;
        const buttons = ['No', 'Yes'];
        if (o.cancel) {
            buttons.unshift('Cancel');
        }
        const res = await this.dialog({
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
    }

    public notifyInfo = {
        'show': false,
        'content': '',
        'timer': 0
    };

    /** --- 显示一个 notify，支持 html，请注意传入内容的安全 --- */
    public notify(content: string) {
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

    /** --- 整个网页的宽度 --- */
    public windowWidth: number = 0;

    /** --- 是否显示加载框 --- */
    public loading: boolean = false;

    /** --- 滚动到顶部 --- */
    public toTop() {
        document.getElementsByTagName('body')[0].scrollIntoView({
            'behavior': 'smooth'
        });
    }

    /** --- 当前语言 --- */
    public locale: string = 'en';

}

/** --- 大页面的内嵌页面 --- */
export abstract class AbstractPanel {

    /** --- 入口方法 --- */
    public abstract main(): void | Promise<void>;

    public onBeforeUnmount(): void | Promise<void> {
        return;
    }

    public onUnmounted():  void | Promise<void> {
        return;
    }

    /** --- 获取总大页面对象 --- */
    public rootPage!: AbstractPage & Record<string, any>;

    /**
     * --- 获取 refs 情况 ---
     */
    public get refs(): Record<string, HTMLElement & types.IVue & Record<string, any>> {
        return (this as any).$refs;
    }

    /**
     * --- 等待渲染 ---
     */
    public get nextTick(): () => Promise<void> {
        return (this as any).$nextTick;
    }

    /**
     * --- 监视变动 ---
     * @param name 监视的属性
     * @param cb 回调
     * @param opt 参数
     */
    public watch<T extends this, TK extends keyof T, TR>(
        name: TK | (() => TR),
        cb: (val: T[TK] & TR, old: T[TK] & TR) => void | Promise<void>,
        opt: {
            'immediate'?: boolean;
            'deep'?: boolean;
        } = {}
    ): () => void {
        return (this as any).$watch(name, cb, opt);
    }

}

/** --- vue 对象 --- */
export let vue: types.IVueObject;

/** --- 全局属性 --- */
export let global = {
    'headerPop': false
};

/** ---运行当前页面 --- */
export function launcher(page: AbstractPage, panels: Array<{
    'selector': string;
    'panel': new () => AbstractPanel;
}> = [], opts: {
    'locale'?: 'en';
} = {}): void {
    (async function() {
        const html = document.getElementsByTagName('html')[0];
        // --- 添加全局 scroll class 如果不在顶部的话 ---
        window.addEventListener('scroll', function() {
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
        // --- 通过标签加载库 ---
        const paths: string[] = [
            `${loader.cdn}/npm/vue@3.4.21/dist/vue.global${page.isDebug() ? '' : '.prod.min'}.js`
        ];
        // --- 加载 vue 以及必要库 ---
        await loader.loadScripts(paths);
        const bodys = document.getElementsByTagName('body');
        if (!bodys[0]) {
            return;
        }
        // --- 将整个网页 vue 化 ---
        vue = (window as any).Vue;
        global = vue.reactive({
            'headerPop': false
        });
        /** --- panel 的控件列表 --- */
        const panelComponents: Record<string, any> = {};
        for (const p of panels) {
            const el: HTMLElement | null = document.querySelector(p.selector);
            if (!el) {
                continue;
            }
            const panel = new p.panel();
            /** --- class 对象类的属性列表 --- */
            const idata: Record<string, any> = {};
            const cdata = Object.entries(panel);
            for (const item of cdata) {
                if (item[0] === 'access') {
                    // --- access 属性不放在 data 当中 ---
                    continue;
                }
                idata[item[0]] = item[1];
            }
            /** --- class 对象的方法和 getter/setter 列表 --- */
            const prot = tool.getClassPrototype(panel);
            const methods = prot.method;
            const computed = prot.access;

            /** --- panel 自定义 --- */
            const panelname = 'pe-panel-' + tool.random(16);
            panelComponents[panelname] = {
                'template': el.outerHTML,
                'data': function() {
                    return tool.clone(idata);
                },
                'methods': methods,
                'computed': computed,
                'created': function(this: types.IVue) {
                    if ((page as any).access) {
                        this.access = tool.clone((page as any).access);
                    }
                },
                'mounted': async function(this: types.IVue) {
                    await this.$nextTick();
                    this.rootPage = this.$root;
                    // --- 完成 ---
                    this.main();
                },
                'beforeUnmount': function(this: types.IVue) {
                    this.onBeforeUnmount();
                },
                'unmounted': async function(this: types.IVue) {
                    await this.$nextTick();
                    this.onUnmounted();
                }
            };
            el.replaceWith(document.createElement(panelname));
        }
        /** --- class 对象类的属性列表 --- */
        const idata: Record<string, any> = {};
        const cdata = Object.entries(page);
        for (const item of cdata) {
            if (item[0] === 'access') {
                // --- access 属性不放在 data 当中 ---
                continue;
            }
            idata[item[0]] = item[1];
        }
        /** --- class 对象的方法和 getter/setter 列表 --- */
        const prot = tool.getClassPrototype(page);
        const methods = prot.method;
        const computed = prot.access;
        const rtn: {
            'vapp': types.IVApp;
            'vroot': types.IVue;
        } = await new Promise(function(resolve) {
            const vapp = vue.createApp({
                'data': function() {
                    return tool.clone(idata);
                },
                'methods': methods,
                'computed': computed,
                'created': function(this: types.IVue) {
                    if ((page as any).access) {
                        this.access = tool.clone((page as any).access);
                    }
                },
                'mounted': async function(this: types.IVue) {
                    await this.$nextTick();
                    this.windowWidth = window.innerWidth;
                    this.locale = opts.locale ?? 'en';
                    window.addEventListener('resize', () => {
                        this.windowWidth = window.innerWidth;
                        bodys[0].style.setProperty('--pe-windowwidth', window.innerWidth + 'px');
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
                    // --- 完成 ---
                    resolve({
                        'vapp': vapp,
                        'vroot': this
                    });
                },
                'beforeUpdate': function(this: types.IVue) {
                    this.onBeforeUpdate();
                },
                'updated': async function(this: types.IVue) {
                    await this.$nextTick();
                    this.onUpdated();
                },
                'beforeUnmount': function(this: types.IVue) {
                    this.onBeforeUnmount();
                },
                'unmounted': async function(this: types.IVue) {
                    await this.$nextTick();
                    this.onUnmounted();
                }
            });
            vapp.config.errorHandler = function(err: Error, vm: types.IVue, info: string): void {
                /*
                notify({
                    'title': 'Runtime Error',
                    'content': `Message: ${err.message}\nTask id: ${vm.taskId}\nForm id: ${vm.formId}`,
                    'type': 'danger'
                });
                core.trigger('error', vm.taskId, vm.formId, err, info + '(-3,' + vm.taskId + ',' + vm.formId + ')');
                */
            };
            // --- 挂载控件对象到 vapp ---
            for (const key in control.list) {
                vapp.component(key, control.list[key]);
            }
            // --- 挂载 panel ---
            for (const key in panelComponents) {
                vapp.component(key, panelComponents[key]);
            }
            // --- 挂载 loading、系统 dialog ---
            bodys[0].insertAdjacentHTML('beforeend', `<pe-dialog :title="dialogInfo.title" :content="dialogInfo.content" :buttons="dialogInfo.buttons" :show="dialogInfo.show" @select="dialogInfo.select"></pe-dialog>` +
            '<div class="pe-popbtns">' +
                // --- 滚动到顶部 ---
                '<div class="pe-popbtn" ref="toTop" @click="toTop">' +
                    '<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none"><path d="M19 15L12 9L10.25 10.5M5 15L7.33333 13" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
                '</div>' +
            '</div>' +
            `<div class="pe-loading" :class="[loading&&'pe-show']">` +
                '<div class="pe-loading-item">' +
                    '<div class="pe-loading-item-1"></div>' +
                    '<div class="pe-loading-item-2"></div>' +
                '</div>' +
            '</div>' +
            `<div class="pe-notify" :class="[notifyInfo.show&&'pe-show']">` +
                '<div class="pe-notify-content" v-html="notifyInfo.content"></div>' +
            '</div>');
            bodys[0].style.setProperty('--pe-windowwidth', window.innerWidth + 'px');
            vapp.mount(bodys[0]);
        });
        // --- 执行回调 ---
        await tool.sleep(34);
        await page.main.call(rtn.vroot);
        bodys[0].style.visibility = 'initial';
    })().catch(function(e) {
        console.log('launcher', e);
    });
}
