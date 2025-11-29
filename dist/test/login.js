import * as purease from 'purease';
class Page extends purease.AbstractPage {
    constructor() {
        // --- RTL ---
        super(...arguments);
        this.rtl = false;
        // --- 登录表单 ---
        /** --- 选项卡 --- */
        this.tab = 0;
        /** --- 用户名 --- */
        this.user = '';
        /** --- 密码 --- */
        this.pwd = '';
        /** --- 同意协议 --- */
        this.agree = false;
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
     * --- 登录 ---
     */
    async login() {
        if (!this.user) {
            this.alert('Please enter your email or phone.', 'warning');
            return;
        }
        if (!this.pwd) {
            this.alert('Please enter your password.', 'warning');
            return;
        }
        if (!this.agree) {
            this.alert('Please agree to the terms.', 'warning');
            return;
        }
        this.loading = true;
        await purease.tool.sleep(1500);
        this.loading = false;
        this.alert('Login successful.', 'pe');
    }
    /**
     * --- 页面入口 ---
     */
    main() {
        purease.display('Login page initialized.');
    }
}
purease.launcher(Page, {
    'debug': true
});
