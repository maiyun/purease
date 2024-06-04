import * as purease from '../index';
import footer from '../test/footer';

class Page extends purease.AbstractPage {

    public text = '123';

    public select = 'h';

    // --- swipe ---

    public tab = 0;

    public swipePage = 'center';

    public swipeControl = 'inner';

    // --- login ---

    public user = '';

    public pwd = '';

    // --- double 页 ---
    
    public nbottom = true;

    public dbottom = 'dark';

    public changeNBottom() {
        this.nbottom = !this.nbottom;
        if (this.nbottom) {
            // --- 不显示 -> 显示 ---
            document.getElementsByTagName('html')[0].classList.add('pe-dheader');
        }
        else {
            // --- 显示 -> 不显示 ---
            document.getElementsByTagName('html')[0].classList.remove('pe-dheader');
        }
    }

    public sheader = false;

    public changeSheader() {
        this.sheader = !this.sheader;
        if (this.sheader) {
            // --- 大 -> 小 ---
            document.getElementsByTagName('html')[0].classList.add('pe-sheader');
        }
        else {
            // --- 小 -> 大 ---
            document.getElementsByTagName('html')[0].classList.remove('pe-sheader');
        }
    }
 
    public main(): void | Promise<void> {
        console.log('Inited.', purease);
    }

    public showDialog() {
        this.dialog('This is a dialog.');
    }

    public showDialog2() {
        this.dialog({
            'title': 'Title',
            'content': 'Has title',
            'buttons': ['Cancel', 'OK']
        });
    }

    public async showConfirm() {
        const res = await this.confirm('This is a confirm');
        await this.dialog('Result: ' + JSON.stringify(res) + ' (' + typeof res + ')');
    }

    public async showConfirm2() {
        const res = await this.confirm({
            'title': 'Has cancel',
            'content': 'This is a confirm',
            'cancel': true
        });
        await this.dialog('Result: ' + JSON.stringify(res) + ' (' + typeof res + ')');
    }

    public showCustom() {
        this.customDialogText = '';
        this.customDialog = true;
    }

    public customDialog = false;

    public customDialogText = '';

    public customDialogSelect() {
        if (!this.customDialogText)  {
            // --- 弹出不可为空的提示 ---
            this.notify('Name can not be empty.');
            return;
        }
        // --- 隐藏窗体 ---
        this.customDialog = false;
    }

    public async showLoading() {
        this.loading = true;
        await purease.tool.sleep(1500);
        this.loading = false;
    }

}
purease.launcher(new Page({
    'debug': true
}), [
    {
        'selector': '#footer',
        'panel': footer
    }
]);