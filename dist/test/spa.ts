import * as purease from 'purease';

class Page extends purease.AbstractPage {

    // --- RTL ---

    public rtl = false;

    // --- SPA 控件 ---

    /** --- SPA 是否 plain --- */
    public spaPlain = false;

    /** --- SPA 是否全屏 --- */
    public spaFull = false;

    /** --- SPA 底部选项卡 --- */
    public spaFooter = 'home';

    /** --- SPA 标签选择 --- */
    public spaTag = '1';

    /** --- 通知开关 --- */
    public notifications = true;

    /** --- 深色模式 --- */
    public darkMode = false;

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
     * --- SPA 导航 ---
     */
    public spaGo(path: string): void {
        window.location.hash = '#' + path;
    }

    /**
     * --- SPA 显示事件 ---
     */
    public spaShow(e: purease.control.ISpaShowEvent): void {
        purease.display('spaShow', e.detail.path, e.detail.query);
    }

    /**
     * --- SPA 隐藏事件 ---
     */
    public spaHide(e: purease.control.ISpaHideEvent): void {
        purease.display('spaHide', e);
    }

    /**
     * --- 页面入口 ---
     */
    public main(): void {
        purease.display('SPA page initialized.');
    }

}

purease.launcher(Page, {
    'debug': true
});
