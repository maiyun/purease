import * as purease from 'purease';
class Page extends purease.AbstractPage {
    constructor() {
        // --- RTL ---
        super(...arguments);
        this.rtl = false;
        // --- Swipe 控件 ---
        /** --- Swipe 页面位置 --- */
        this.swipePage = 'center';
        /** --- Swipe 控制器位置 --- */
        this.swipeControl = 'inner';
        /** --- Tab 值 --- */
        this.tab = 0;
    }
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
     * --- 页面入口 ---
     */
    main() {
        purease.display('Swipe page initialized.');
    }
}
purease.launcher(Page, {
    'debug': true
});
