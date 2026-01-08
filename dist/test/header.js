import * as purease from 'purease';
class Page extends purease.AbstractPage {
    // --- RTL ---
    rtl = false;
    // --- Header 控件 ---
    /** --- Header 主题 --- */
    headerTheme = 'default';
    /** --- Header 底部 --- */
    headerBottom = true;
    /** --- Header 线条 --- */
    headerLine = false;
    /** --- 小 Header --- */
    sheader = false;
    /** --- Bar 主题 --- */
    barTheme = 'default';
    /** --- Bar Logo --- */
    barLogo = false;
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
     * --- 切换底部栏 ---
     */
    toggleBottom() {
        this.headerBottom = !this.headerBottom;
        if (this.headerBottom) {
            document.documentElement.classList.add('pe-dheader');
        }
        else {
            document.documentElement.classList.remove('pe-dheader');
        }
    }
    /**
     * --- 切换小 Header ---
     */
    toggleSheader() {
        this.sheader = !this.sheader;
        if (this.sheader) {
            document.documentElement.classList.add('pe-sheader');
        }
        else {
            document.documentElement.classList.remove('pe-sheader');
        }
    }
    /**
     * --- 页面入口 ---
     */
    main() {
        purease.display('Header page initialized.');
    }
}
purease.launcher(Page, {
    'debug': true
});
