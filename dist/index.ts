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

export let vue: types.IVueObject;

/** ---运行当前页面 --- */
export function launcher(page: AbstractPage): void {
    (async function() {
        const body = document.getElementsByTagName('body')[0];
        document.addEventListener('touchstart', function() {
            return;
        });
        // --- 添加全局 scroll class 如果不在顶部的话 ---
        window.addEventListener('scroll', function() {
            const st = document.documentElement.scrollTop || document.body.scrollTop;
            if (st === 0) {
                body.classList.remove('scroll');
            }
            else {
                body.classList.add('scroll');
            }
        });
        const st = document.documentElement.scrollTop || document.body.scrollTop;
        if (st > 0) {
            body.classList.add('scroll');
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
    })().catch(function(e) {
        console.log('launcher', e);
    });
}