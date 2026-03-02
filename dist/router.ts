import * as purease from './purease.js';
import * as lTool from './tool.js';

/** --- Route configuration --- */
export interface IRoute {
    /** --- 路径 --- */
    'path': string;
    /**
     * --- 组件加载器 ---
     * --- 可以直接返回组件对象，或者返回 Promise<组件对象> ---
     */
    'component': any | (() => Promise<any>);
    /** --- 路由名称 --- */
    'name'?: string;
    /** --- 元数据 --- */
    'meta'?: Record<string, any>;
}

/** --- 路由对象 --- */
export const router = {

    /** --- 路由表 --- */
    'routes': {} as Record<string, IRoute>,

    /**
     * --- 加载路由的前缀，以 / 开头 / 结尾 ---
     * --- 例如设置为 /page/，则访问 home 时会自动加载 /page/home/home.js 和 /page/home/home.html、css ---
     */
    'prefix': '/',

    /**
     * --- URL 前缀，以 / 开头 / 结尾 ---
     * --- 例如设置为 /app/，则访问 /app/home 时会自动加载 {prefix}home/home.js 和 {prefix}home/home.html、css ---
     */
    'urlPrefix': window.location.pathname.slice(0, window.location.pathname.lastIndexOf('/') + 1),

    /** --- 当前路由信息 --- */
    'current': {
        /** --- 路径 --- */
        'path': '',
        /** --- 参数 --- */
        'query': {} as Record<string, string>,
        /** --- 元数据 --- */
        'meta': {} as Record<string, any>,
        /** --- 组件 --- */
        'component': null as any
    },

    /** --- 历史记录 --- */
    'history': [] as string[],

    /** --- 注册路由 --- */
    register: function(routes: IRoute[]): void {
        for (const route of routes) {
            router.routes[route.path || '@'] = route;
        }
    },

    /** --- 导航到指定路径，如 home，不以 / 开头 --- */
    push: async function(path: string): Promise<void> {
        if (router.current.path === path) {
            return;
        }
        await router.load(path);
        window.history.pushState(null, '', router.urlPrefix + path);
    },

    /** --- 替换当前路径，如 home，不以 / 开头 --- */
    replace: async function(path: string): Promise<void> {
        if (router.current.path === path) {
            return;
        }
        await router.load(path);
        window.history.replaceState(null, '', router.urlPrefix + path);
    },

    /** --- 返回上一页 --- */
    back: function(): void {
        window.history.back();
    },

    /** --- 加载路由（可能被加载过，内部使用） --- */
    load: async function(ppath: string): Promise<void> {
        // --- 解析路径和参数 ---
        let [path, queryStr] = ppath.split('?');
        const query: Record<string, string> = {};
        if (queryStr) {
            const search = new URLSearchParams(queryStr);
            for (const [k, v] of search) {
                query[k] = v;
            }
        }

        let route = router.routes[path || '@'];

        // --- 如果没找到路由 ---
        if (!route) {
            if (!router.routes['@']) {
                // --- 根路径且没定义 @ 路由，说明没用 router ---
                return;
            }
            // --- 尝试自动加载 ---
            route = {
                'path': path,
                'component': () => loadPage(path),
            };

            // --- 保存到路由表，避免重复创建 ---
            router.routes[path] = route;
        }

        if (!route) {
            purease.display(`[Purease] Route not found: ${path}`);
            return;
        }

        let component = route.component;
        if (typeof component === 'function') {
            // --- 是加载函数 ---
            try {
                component = await component();
                // --- 如果是 ESM 模块，取 default ---
                if (component.default) {
                    component = component.default;
                }
                route.component = component;
            }
            catch {
                // --- 自动加载失败，可能是不存在 ---
                purease.display(`[Purease] Failed to load component for ${path}`);
                return;
            }
        }

        // --- 更新状态 ---
        router.current.path = path;
        router.current.query = query;
        router.current.meta = route.meta ?? {};
        router.current.component = purease.vue.markRaw(component);
    },

    /** --- 启动路由监听 --- */
    start: function(): void {
        window.addEventListener('popstate', () => {
            let path = window.location.pathname;
            if (router.urlPrefix && path.startsWith(router.urlPrefix)) {
                path = path.slice(router.urlPrefix.length);
            }
            router.load(path + window.location.search).catch(() => {});
        });
        router.current = purease.vue.reactive(router.current);
        let path = window.location.pathname;
        if (router.urlPrefix && path.startsWith(router.urlPrefix)) {
            path = path.slice(router.urlPrefix.length);
        }
        router.load(path + window.location.search).catch(() => {});
    },

};

/**
 * --- 加载页面辅助函数 ---
 * @param path 页面路径，如 home，会加载 /home.js 和 /home.html 和 css
 */
export async function loadPage(path: string): Promise<any> {
    const filename = path.split('/').pop() ?? '';
    const fullPath = lTool.urlResolve(router.urlPrefix, router.prefix) + path + '/' + filename;
    // --- 加载 JS ---
    let component: any;
    try {
        const module = await import(fullPath + '.js');
        component = module.default ?? module;
    }
    catch (e) {
        purease.display(`[Purease] Failed to load JS: ${fullPath}.js`, e);
        throw e;
    }

    // --- 加载 RouterView ---
    const instance = new component();

    /** --- class 对象类的属性列表 --- */
    const idata: Record<string, any> = {};
    const cdata = Object.entries(instance);
    for (const item of cdata) {
        if (item[0] === 'access') {
            // --- access 属性不放在 data 当中 ---
            continue;
        }
        idata[item[0]] = item[1];
    }

    /** --- class 对象的方法和 getter/setter 列表 --- */
    const prot = lTool.getClassPrototype(instance);
    const methods = prot.method;
    const computed = prot.access;

    // --- 重构 component 为 vue 对象 ---
    component = {
        'data': function() {
            return lTool.clone(idata);
        },
        'methods': methods,
        'computed': computed,
        created: function(this: purease.IVue) {
            if (instance.access) {
                this.access = lTool.clone(instance.access);
            }
        },
        mounted: async function(this: purease.IVue) {
            await this.$nextTick();
            this.rootPage = this.$root;
            // --- 完成 ---
            this.main();
        },
        beforeUnmount: function(this: purease.IVue) {
            this.onBeforeUnmount();
        },
        unmounted: async function(this: purease.IVue) {
            await this.$nextTick();
            this.onUnmounted();
        },
    };

    // --- 加载 HTML ---
    const [htmlRes, cssRes] = await Promise.all([
        lTool.get(fullPath + '.html'),
        lTool.get(fullPath + '.css', undefined, {
            'retry': 0,
        }),
    ]);

    if (typeof htmlRes === 'string' && htmlRes) {
        const html = htmlRes.replace(/<script>([\s\S]*?)<\/script>/gi, () => {
            return '';
        }).replace(/<style>([\s\S]*?)<\/style>/gi, () => {
            return '';
        });

        component.template = html;
    }

    if (typeof cssRes === 'string' && cssRes) {
        const head = document.getElementsByTagName('head');
        if (head[0]) {
            // --- 检查是否已存在 ---
            const exist = head[0].querySelector(`style[data-pe-page="${path}"]`);
            if (!exist) {
                head[0].insertAdjacentHTML('beforeend', '<style data-pe-page="' + path + '">' + cssRes + '</style>');
            }
        }
    }

    return component;
}
