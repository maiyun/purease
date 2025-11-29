import * as purease from 'purease';

class Page extends purease.AbstractPage {

    // --- RTL ---

    public rtl = false;

    // --- 登录表单 ---

    /** --- 选项卡 --- */
    public tab = 0;

    /** --- 用户名 --- */
    public user = '';

    /** --- 密码 --- */
    public pwd = '';

    /** --- 同意协议 --- */
    public agree = false;

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
     * --- 登录 ---
     */
    public async login(): Promise<void> {
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
    public main(): void {
        purease.display('Login page initialized.');
    }

}

purease.launcher(Page, {
    'debug': true
});
