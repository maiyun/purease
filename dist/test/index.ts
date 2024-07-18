import * as purease from '../index';
import footer from '../test/footer';

class Page extends purease.AbstractPage {

    public text = '123';

    public select = 'h';

    public textSelect = ['a', { 'value': 'ok', 'label': 'v is ok' }, 'c', this.l('ok')];

    public search = false;

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

    // --- slider ---

    public slider1 = [15, 0];

    public slider2 = [200, 300];

    // --- drawer ---

    public drawer = false;

    public drawer2 = false;

    public changeNBottom(): void {
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

    public changeSheader(): void {
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

    public async showDialog(): Promise<void> {
        await this.dialog('This is a dialog.');
    }

    public async showDialog2(): Promise<void> {
        await this.dialog({
            'title': 'Title',
            'content': 'Has title',
            'buttons': ['Cancel', 'OK']
        });
    }

    public async showConfirm(): Promise<void> {
        const res = await this.confirm('This is a confirm');
        await this.dialog('Result: ' + JSON.stringify(res) + ' (' + typeof res + ')');
    }

    public async showConfirm2(): Promise<void> {
        const res = await this.confirm({
            'title': 'Has cancel',
            'content': 'This is a confirm',
            'cancel': true
        });
        await this.dialog('Result: ' + JSON.stringify(res) + ' (' + typeof res + ')');
    }

    public showCustom(): void {
        this.customDialogText = '';
        this.customDialog = true;
    }

    public customDialog = false;

    public customDialogText = '';

    public customDialogSelect(): void {
        if (!this.customDialogText)  {
            // --- 弹出不可为空的提示 ---
            this.notify('Name can not be empty.');
            return;
        }
        // --- 隐藏窗体 ---
        this.customDialog = false;
    }

    public async showLoading(): Promise<void> {
        this.loading = true;
        await purease.tool.sleep(1500);
        this.loading = false;
    }

    // --- page 控件演示 ---

    public p1: number = 3;

    public p2: number = 25;

    public p3: number = 30;

    public p4: number = 50;

    public p5: number = 1;

    public p6: number = 2;

    public total5: number = 0;

    public count6: number = 20;

    public control: number = 2;

    public switch1: boolean = false;

    public switch2: string = 'a';

    // --- Tag 控件 ---

    public taglist: string[] = [];

    public tagclose = false;

}

purease.launcher(Page, {
    'debug': true,
    'locale': 'sc',
    'localePath': __dirname + '/locale',
    'panels': [
        {
            'selector': '#footer',
            'panel': footer
        }
    ]
});
