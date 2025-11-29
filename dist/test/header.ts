import * as purease from 'purease';

class Page extends purease.AbstractPage {

    // --- RTL ---

    public rtl = false;

    // --- Header 控件 ---

    /** --- Header 主题 --- */
    public headerTheme = 'default';

    /** --- Header 底部 --- */
    public headerBottom = true;

    /** --- Header 线条 --- */
    public headerLine = false;

    /** --- 小 Header --- */
    public sheader = false;

    /** --- Bar 主题 --- */
    public barTheme = 'default';

    /** --- Bar Logo --- */
    public barLogo = false;

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
     * --- 切换底部栏 ---
     */
    public toggleBottom(): void {
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
    public toggleSheader(): void {
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
    public main(): void {
        purease.display('Header page initialized.');
    }

}

purease.launcher(Page, {
    'debug': true
});
