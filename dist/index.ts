import * as types from '../types';
import * as control from './control';
import * as tool from './tool';

export abstract class AbstractPage {

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

/** --- 刷新所有应该绑定的 pe-link、pe-icon 对象 --- */
export function refresh() {
    const icons = document.querySelectorAll('svg.pe-auto');
    for (const icon of icons) {
        icon.remove();
    }
    // --- 先绑定 link ---
    const links = document.querySelectorAll('.pe-link');
    for (const link of links) {
        link.insertAdjacentHTML('beforeend', '<svg class="pe-auto" width="18px" height="18px" viewBox="0 0 24 24" fill="none"><path d="M13 11L22 2M22 2H16.6562M22 2V7.34375" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2.49073 19.5618 2.16444 18.1934 2.0551 16" stroke-width="1.5" stroke-linecap="round"/></svg>');
    }
    // --- 再转义时间 ---
    const dates = document.querySelectorAll('.pe-date');
    for (const el of dates) {
        const date = new Date(Number(el.getAttribute('time')) * 1000);
        el.innerHTML = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');
    }
}

/** ---运行当前页面 --- */
export function launcher(page: AbstractPage): void {
    (async function() {
        const html = document.getElementsByTagName('html')[0];
        document.addEventListener('touchstart', function() {
            return;
        });
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
            loader.cdn + '/npm/vue@3.4.21/dist/vue.global.prod.min.js'
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
            vapp.mount(bodys[0]);
        });
        // --- 执行回调 ---
        await tool.sleep(34);
        await page.main.call(rtn.vroot);
        refresh();
    })().catch(function(e) {
        console.log('launcher', e);
    });
}