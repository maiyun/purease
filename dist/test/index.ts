import * as purease from '../index';
import footer from '../test/footer';

class Page extends purease.AbstractPage {

    public text = '123';

    public select = 'h';

    // --- swipe ---

    public tab = 0;

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
            this.notify('Nmae can not be empty.');
            return;
        }
        // --- 隐藏窗体 ---
        this.customDialog = false;
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