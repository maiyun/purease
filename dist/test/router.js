import * as purease from '../purease.js';
// --- 手动注册路由 ---
purease.router.register([
    {
        'path': '',
        'component': () => purease.loadPage('home'),
    },
]);
class Page extends purease.AbstractPage {
    main() {
        purease.display('Router page initialized.');
    }
    get router() {
        return purease.router;
    }
}
purease.launcher(Page, {
    'debug': true,
    'router': {
        'prefix': '../pages/',
    }
});
