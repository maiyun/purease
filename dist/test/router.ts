import * as purease from '../purease.js';

// --- 手动注册路由 ---
purease.router.register([
    {
        'path': '',
        'component': () => purease.loadPage('home'),
    },
]);

class Page extends purease.AbstractPage {

    public main(): void {
        purease.display('Router page initialized.');
    }

    public get router(): any {
        return purease.router;
    }

}

purease.launcher(Page, {
    'debug': true,
    'version': purease.version,
    'router': {
        'prefix': '../pages/',
    }
});
