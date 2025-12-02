import * as purease from 'purease';

class Page extends purease.AbstractPage {

    // --- RTL ---

    public rtl = false;

    // --- 表单控件 ---

    /** --- 文本框值 --- */
    public text = 'Hello';

    /** --- 多行文本框值 --- */
    public textMulti = 'Line 1\nLine 2';

    /** --- 数字输入框值 --- */
    public textNumber = '100';

    /** --- 密码框值 --- */
    public textPassword = '';

    /** --- 文本框前缀选择 --- */
    public textSelect = ['http://', 'https://'];

    /** --- 文本框是否禁用 --- */
    public textDisabled = false;

    /** --- 文本框是否朴素 --- */
    public textPlain = false;

    /** --- 文本框是否只读 --- */
    public textReadonly = false;

    /** --- 下拉选择值 --- */
    public select = 'apple';

    /** --- 下拉选择数据 --- */
    public selectData = [
        'apple',
        { 'value': 'banana', 'label': 'Banana 🍌' },
        'cherry',
        { 'value': 'disabled', 'label': 'Disabled', 'disabled': true },
        'elderberry'
    ];

    /** --- 下拉选择是否搜索 --- */
    public selectSearch = false;

    /** --- 下拉选择是否禁用 --- */
    public selectDisabled = false;

    /** --- 下拉选择是否朴素 --- */
    public selectPlain = false;

    /** --- 复选框值 --- */
    public check = false;

    /** --- 开关值 --- */
    public switch1 = false;

    /** --- 开关映射值 --- */
    public switch2 = 'on';

    /** --- 开关是否禁用 --- */
    public switchDisabled = false;

    /** --- 下拉列表值 --- */
    public dlist = 'item1';

    /** --- 下拉列表数据 --- */
    public dlistData = [
        { 'label': 'Item 1', 'value': 'item1' },
        { 'title': true, 'label': 'Title' },
        { 'label': 'Item 2', 'value': 'item2' },
        {
            'label': 'Item 3',
            'value': 'item3',
            'children': [
                { 'label': 'Sub 3-1', 'value': 'item3-1' },
                { 'label': 'Sub 3-2', 'value': 'item3-2' }
            ]
        }
    ];

    /** --- 下拉列表是否树形 --- */
    public dlistTree = false;

    /** --- 滑块值 --- */
    public slider = [30, 0];

    /** --- 滑块范围值 --- */
    public sliderRange = [100, 200];

    /** --- 验证码数字 --- */
    public vnumber = '';

    /** --- 验证码数字是否禁用 --- */
    public vnumberDisabled = false;

    /** --- 数字键盘值 --- */
    public nboard = '';

    /** --- 数字键盘是否禁用 --- */
    public nboardDisabled = false;

    /** --- 数字键盘是否朴素 --- */
    public nboardPlain = false;

    /** --- 数字键盘是否分隔 --- */
    public nboardSplit = false;

    /** --- 数字键盘是否显示标题 --- */
    public nboardTitle = false;

    public nboardCustom: boolean = false;

    /** --- 数字键盘尺寸 --- */
    public nboardSize = 'default';

    /** --- 数字键盘按钮参数 --- */
    public nboardButtons?: string[] = undefined;

    // --- captcha ---

    public tcResult: string = 'waiting...';

    public cfResult: string = 'waiting...';

    public tcKey = '';

    public cfKey = '';

    // --- 数据展示控件 ---

    /** --- 标签列表 --- */
    public tagList: string[] = ['Tag 1', 'Tag 2'];

    /** --- 标签是否显示关闭 --- */
    public tagClose = false;

    /** --- 标签类型 --- */
    public tagType = 'default';

    /** --- 标签是否朴素 --- */
    public tagPlain = false;

    /** --- 标签尺寸 --- */
    public tagSize = 'm';

    // --- 日期控件 ---

    /** --- 日期面板时间戳 --- */
    public dpTimestamp?: number = undefined;

    /** --- 日期面板时区 --- */
    public dpTimezone?: number = undefined;

    /** --- 日期面板年月 --- */
    public dpYearMonth = '';

    /** --- 日期面板时分 --- */
    public dpHourMinute = '';

    /** --- 日期面板是否显示时间 --- */
    public dpTime = true;

    /** --- 日期面板是否显示时区 --- */
    public dpZone = true;

    /** --- 日期面板是否禁用 --- */
    public dpDisabled = false;

    /** --- 日期面板是否朴素 --- */
    public dpPlain = false;

    /** --- 日期面板是否范围选择 --- */
    public dpRange = false;

    /** --- 日期面板 slot 是否启用 --- */
    public dpSlotEnabled = false;

    /** --- 日期控件时间戳 --- */
    public dateTimestamp?: number = undefined;

    /** --- 日期控件是否显示日期 --- */
    public dateShowDate = true;

    /** --- 日期范围时间戳 --- */
    public daterangeTimestamp: number[] = [];

    // --- 反馈控件 ---

    /** --- 自定义对话框是否显示 --- */
    public customDialog = false;

    /** --- 自定义对话框文本 --- */
    public customDialogText = '';

    /** --- 抽屉是否显示 --- */
    public drawer = false;

    /** --- 抽屉2是否显示 --- */
    public drawer2 = false;

    /** --- 分页页码 --- */
    public page1 = 1;

    public page2 = 5;

    public page3 = 1;

    /** --- 分页总数 --- */
    public pageTotal = 500;

    /** --- 分页每页条数 --- */
    public pageCount = 20;

    // --- 选项卡控件 ---

    /** --- 选项卡值 --- */
    public tab = 0;

    /** --- 选项卡是否 hover --- */
    public tabHover = false;

    /** --- 选项卡类型 --- */
    public tabType = 'default';

    /** --- 大选项卡值 --- */
    public btab = 0;

    /** --- 大选项卡类型 --- */
    public btabType = 'default';

    // --- 容器控件 ---

    /** --- Setting 是否 hover --- */
    public settingHover = false;

    /** --- Setting 是否 plain --- */
    public settingPlain = false;

    /** --- Setting 是否 light --- */
    public settingLight = false;

    // --- 单页应用控件 ---

    /** --- SPA 是否 plain --- */
    public spaPlain = false;

    /** --- SPA 是否全屏 --- */
    public spaFull = false;

    /** --- SPA 底部选项卡 --- */
    public spaFooter = '1';

    // --- 头部导航控件 ---

    /** --- 是否显示底部栏 --- */
    public headerBottom = false;

    /** --- 底部栏主题 --- */
    public headerBottomTheme = 'default';

    // --- 表格控件 ---

    /** --- 表格是否自适应 --- */
    public tableAdaption = false;

    /** --- 表格是否朴素 --- */
    public tablePlain = false;

    // --- 折叠面板控件 ---

    /** --- 折叠面板展开项 --- */
    public collapse: string[] = ['1'];

    /** --- 手风琴模式折叠面板展开项 --- */
    public collapseAccordion = '1';

    // --- 方法 ---

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
     * --- 显示对话框 ---
     */
    public async showDialog(): Promise<void> {
        await this.dialog('This is a simple dialog message.');
    }

    /**
     * --- 显示带标题的对话框 ---
     */
    public async showDialog2(): Promise<void> {
        await this.dialog({
            'title': 'Dialog Title',
            'content': 'This dialog has a title and custom buttons.',
            'buttons': ['Cancel', 'OK']
        });
    }

    /**
     * --- 显示确认框 ---
     */
    public async showConfirm(): Promise<void> {
        const res = await this.confirm('Do you want to continue?');
        await this.dialog(`Result: ${res}`);
    }

    /**
     * --- 显示带取消的确认框 ---
     */
    public async showConfirm2(): Promise<void> {
        const res = await this.confirm({
            'title': 'Confirm',
            'content': 'Do you want to continue?',
            'cancel': true
        });
        await this.dialog(`Result: ${res}`);
    }

    /**
     * --- 显示自定义对话框 ---
     */
    public showCustomDialog(): void {
        this.customDialogText = '';
        this.customDialog = true;
    }

    /**
     * --- 自定义对话框确认 ---
     */
    public customDialogConfirm(): void {
        if (!this.customDialogText) {
            this.alert('Please input some text.', 'warning');
            return;
        }
        this.customDialog = false;
        this.alert(`You entered: ${this.customDialogText}`, 'pe');
    }

    /**
     * --- 显示加载 ---
     */
    public async showLoading(): Promise<void> {
        this.loading = true;
        await purease.tool.sleep(1500);
        this.loading = false;
    }

    /**
     * --- 添加标签 ---
     */
    public addTag(): void {
        this.tagList.push(`Tag ${this.tagList.length + 1}`);
    }

    /**
     * --- 删除标签 ---
     */
    public removeTag(index: number): void {
        this.tagList.splice(index, 1);
    }

    /**
     * --- 数字键盘按钮点击 ---
     */
    public nboardButton(btn: string): void {
        this.alert(`Button clicked: ${btn}`, 'pe');
    }

    // --- captcha ---

    public tcOnResult(res: any): void {
        this.tcResult = res;
    }

    public tcOnReset(): void {
        this.tcResult = 'waiting...';
        this.refs.tc.reset();
    }

    public async tcOnFunc(): Promise<void> {
        const res = await this.showCaptcha({
            'factory': 'tc',
            'akey': this.tcKey,
        });
        this.tcResult = JSON.stringify(res);
    }

    public cfOnResult(res: any): void {
        this.cfResult = res;
    }

    public cfOnReset(): void {
        this.cfResult = 'waiting...';
        this.refs.cf.reset();
    }

    public async cfOnFunc(): Promise<void> {
        const res = await this.showCaptcha({
            'factory': 'cf',
            'akey': this.cfKey,
        });
        this.tcResult = JSON.stringify(res);
    }

    /**
     * --- 日期面板改变事件 ---
     */
    public dpOnChanged(e: purease.control.IDatepanelChangedEvent): void {
        purease.display('dpOnChanged', e);
    }

    /**
     * --- 日期面板范围事件 ---
     */
    public dpOnRange(e: purease.control.IDatepanelRangeEvent): void {
        purease.display('dpOnRange', e);
    }

    /**
     * --- 设置随机时间戳 ---
     */
    public setRandomTimestamp(): void {
        this.dpTimestamp = purease.tool.rand(1504304812000, 1704304812000);
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
        purease.display('spaShow', e);
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
        purease.display('Page initialized.');
    }

}

purease.launcher(Page, {
    'debug': true,
    'locale': 'en',
    'localePath': purease.getDirname(import.meta.url) + '/locale'
});
