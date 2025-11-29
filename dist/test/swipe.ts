import * as purease from 'purease';

class Page extends purease.AbstractPage {

    // --- RTL ---

    public rtl = false;

    // --- Swipe 控件 ---

    /** --- Swipe 页面位置 --- */
    public swipePage = 'center';

    /** --- Swipe 控制器位置 --- */
    public swipeControl = 'inner';

    /** --- Tab 值 --- */
    public tab = 0;

    /**
     * --- 切换 RTL ---
     */
    public changeRTL(): void {
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
    public main(): void {
        purease.display('Swipe page initialized.');
    }

}

purease.launcher(Page, {
    'debug': true
});
