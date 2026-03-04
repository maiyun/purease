import * as purease from '../purease.js';
const base = purease.getDirname(import.meta.url);
// --- 主页面 ---
class Page extends purease.AbstractPage {
    // --- RTL ---
    rtl = false;
    /** --- 当前高亮 tab --- */
    activeTab = '/';
    /**
     * --- 切换 RTL ---
     */
    changeRTL() {
        this.rtl = !this.rtl;
        if (this.rtl) {
            document.documentElement.classList.add('pe-rtl');
        }
        else {
            document.documentElement.classList.remove('pe-rtl');
        }
    }
    /**
     * --- 导航跳转 ---
     * @param path 目标路径
     */
    async go(path) {
        await this.routerPush(path);
    }
    main() {
        purease.display('Router page initialized.');
        // --- 监听路由变化来更新高亮 tab ---
        purease.router?.afterEach((to) => {
            this.activeTab = to.path;
        });
        // --- 初始化 activeTab ---
        if (this.routeInfo) {
            this.activeTab = this.routeInfo.path;
        }
    }
}
purease.launcher(Page, {
    'debug': true,
    'version': purease.version,
    'router': {
        'mode': 'history',
        'routes': [
            {
                'path': '/',
                'name': 'home',
                'component': purease.routeLoad(`${base}/pages/home`, () => import('./pages/home/code.js')),
            },
            {
                'path': '/about',
                'name': 'about',
                'component': purease.routeLoad(`${base}/pages/about`, () => import('./pages/about/code.js')),
            },
            {
                'path': '/user/:id',
                'name': 'user',
                'component': purease.routeLoad(`${base}/pages/user`, () => import('./pages/user/code.js')),
            },
            {
                'path': '/settings',
                'name': 'settings',
                'component': purease.routeLoad(`${base}/pages/settings/main`, () => import('./pages/settings/main/code.js')),
                'children': [
                    {
                        'path': '',
                        'redirect': '/settings/profile',
                    },
                    {
                        'path': 'profile',
                        'component': purease.routeLoad(`${base}/pages/settings/profile`),
                    },
                    {
                        'path': 'account',
                        'component': purease.routeLoad(`${base}/pages/settings/account`),
                    },
                ],
            },
            {
                'path': '/:pathMatch(.*)*',
                'name': 'not-found',
                'component': purease.routeLoad(`${base}/pages/not-found`),
            },
        ],
    },
});
