import * as purease from 'purease';
class Page extends purease.AbstractPage {
    // --- RTL ---
    rtl = false;
    // --- SPA 控件 ---
    /** --- SPA 是否 plain --- */
    spaPlain = false;
    /** --- SPA 是否全屏 --- */
    spaFull = false;
    /** --- SPA 底部选项卡 --- */
    spaFooter = 'home';
    /** --- SPA 标签选择 --- */
    spaTag = '1';
    /** --- 通知开关 --- */
    notifications = true;
    /** --- 深色模式 --- */
    darkMode = false;
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
     * --- SPA 导航 ---
     */
    spaGo(path) {
        window.location.hash = '#' + path;
    }
    /**
     * --- SPA 显示事件 ---
     */
    spaShow(e) {
        purease.display('spaShow', e);
    }
    /**
     * --- SPA 隐藏事件 ---
     */
    spaHide(e) {
        purease.display('spaHide', e);
    }
    /**
     * --- 页面入口 ---
     */
    main() {
        purease.display('SPA page initialized.');
    }
}
purease.launcher(Page, {
    'debug': true
});
