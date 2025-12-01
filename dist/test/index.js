import * as purease from 'purease';
class Page extends purease.AbstractPage {
    constructor() {
        // --- RTL ---
        super(...arguments);
        this.rtl = false;
        // --- 表单控件 ---
        /** --- 文本框值 --- */
        this.text = 'Hello';
        /** --- 多行文本框值 --- */
        this.textMulti = 'Line 1\nLine 2';
        /** --- 数字输入框值 --- */
        this.textNumber = '100';
        /** --- 密码框值 --- */
        this.textPassword = '';
        /** --- 文本框前缀选择 --- */
        this.textSelect = ['http://', 'https://'];
        /** --- 文本框是否禁用 --- */
        this.textDisabled = false;
        /** --- 文本框是否朴素 --- */
        this.textPlain = false;
        /** --- 文本框是否只读 --- */
        this.textReadonly = false;
        /** --- 下拉选择值 --- */
        this.select = 'apple';
        /** --- 下拉选择数据 --- */
        this.selectData = [
            'apple',
            { 'value': 'banana', 'label': 'Banana 🍌' },
            'cherry',
            { 'value': 'disabled', 'label': 'Disabled', 'disabled': true },
            'elderberry'
        ];
        /** --- 下拉选择是否搜索 --- */
        this.selectSearch = false;
        /** --- 下拉选择是否禁用 --- */
        this.selectDisabled = false;
        /** --- 下拉选择是否朴素 --- */
        this.selectPlain = false;
        /** --- 复选框值 --- */
        this.check = false;
        /** --- 开关值 --- */
        this.switch1 = false;
        /** --- 开关映射值 --- */
        this.switch2 = 'on';
        /** --- 开关是否禁用 --- */
        this.switchDisabled = false;
        /** --- 下拉列表值 --- */
        this.dlist = 'item1';
        /** --- 下拉列表数据 --- */
        this.dlistData = [
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
        this.dlistTree = false;
        /** --- 滑块值 --- */
        this.slider = [30, 0];
        /** --- 滑块范围值 --- */
        this.sliderRange = [100, 200];
        /** --- 验证码数字 --- */
        this.vnumber = '';
        /** --- 验证码数字是否禁用 --- */
        this.vnumberDisabled = false;
        /** --- 数字键盘值 --- */
        this.nboard = '';
        /** --- 数字键盘是否禁用 --- */
        this.nboardDisabled = false;
        /** --- 数字键盘是否朴素 --- */
        this.nboardPlain = false;
        /** --- 数字键盘是否分隔 --- */
        this.nboardSplit = false;
        /** --- 数字键盘是否显示标题 --- */
        this.nboardTitle = false;
        /** --- 数字键盘尺寸 --- */
        this.nboardSize = 'default';
        /** --- 数字键盘按钮参数 --- */
        this.nboardButtons = undefined;
        /** --- 数字键盘自定义参数 --- */
        this.nboardCustom = undefined;
        // --- 数据展示控件 ---
        /** --- 标签列表 --- */
        this.tagList = ['Tag 1', 'Tag 2'];
        /** --- 标签是否显示关闭 --- */
        this.tagClose = false;
        /** --- 标签类型 --- */
        this.tagType = 'default';
        /** --- 标签是否朴素 --- */
        this.tagPlain = false;
        /** --- 标签尺寸 --- */
        this.tagSize = 'm';
        // --- 日期控件 ---
        /** --- 日期面板时间戳 --- */
        this.dpTimestamp = undefined;
        /** --- 日期面板时区 --- */
        this.dpTimezone = undefined;
        /** --- 日期面板年月 --- */
        this.dpYearMonth = '';
        /** --- 日期面板时分 --- */
        this.dpHourMinute = '';
        /** --- 日期面板是否显示时间 --- */
        this.dpTime = true;
        /** --- 日期面板是否显示时区 --- */
        this.dpZone = true;
        /** --- 日期面板是否禁用 --- */
        this.dpDisabled = false;
        /** --- 日期面板是否朴素 --- */
        this.dpPlain = false;
        /** --- 日期面板是否范围选择 --- */
        this.dpRange = false;
        /** --- 日期控件时间戳 --- */
        this.dateTimestamp = undefined;
        /** --- 日期控件是否显示日期 --- */
        this.dateShowDate = true;
        /** --- 日期范围时间戳 --- */
        this.daterangeTimestamp = [];
        // --- 反馈控件 ---
        /** --- 自定义对话框是否显示 --- */
        this.customDialog = false;
        /** --- 自定义对话框文本 --- */
        this.customDialogText = '';
        /** --- 抽屉是否显示 --- */
        this.drawer = false;
        /** --- 抽屉2是否显示 --- */
        this.drawer2 = false;
        /** --- 分页页码 --- */
        this.page1 = 1;
        this.page2 = 5;
        this.page3 = 1;
        /** --- 分页总数 --- */
        this.pageTotal = 500;
        /** --- 分页每页条数 --- */
        this.pageCount = 20;
        // --- 选项卡控件 ---
        /** --- 选项卡值 --- */
        this.tab = 0;
        /** --- 选项卡是否 hover --- */
        this.tabHover = false;
        /** --- 选项卡类型 --- */
        this.tabType = 'default';
        /** --- 大选项卡值 --- */
        this.btab = 0;
        /** --- 大选项卡类型 --- */
        this.btabType = 'default';
        // --- 容器控件 ---
        /** --- Setting 是否 hover --- */
        this.settingHover = false;
        /** --- Setting 是否 plain --- */
        this.settingPlain = false;
        /** --- Setting 是否 light --- */
        this.settingLight = false;
        // --- 单页应用控件 ---
        /** --- SPA 是否 plain --- */
        this.spaPlain = false;
        /** --- SPA 是否全屏 --- */
        this.spaFull = false;
        /** --- SPA 底部选项卡 --- */
        this.spaFooter = '1';
        // --- 头部导航控件 ---
        /** --- 是否显示底部栏 --- */
        this.headerBottom = false;
        /** --- 底部栏主题 --- */
        this.headerBottomTheme = 'default';
        // --- 表格控件 ---
        /** --- 表格是否自适应 --- */
        this.tableAdaption = false;
        /** --- 表格是否朴素 --- */
        this.tablePlain = false;
    }
    // --- 方法 ---
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
     * --- 显示对话框 ---
     */
    async showDialog() {
        await this.dialog('This is a simple dialog message.');
    }
    /**
     * --- 显示带标题的对话框 ---
     */
    async showDialog2() {
        await this.dialog({
            'title': 'Dialog Title',
            'content': 'This dialog has a title and custom buttons.',
            'buttons': ['Cancel', 'OK']
        });
    }
    /**
     * --- 显示确认框 ---
     */
    async showConfirm() {
        const res = await this.confirm('Do you want to continue?');
        await this.dialog(`Result: ${res}`);
    }
    /**
     * --- 显示带取消的确认框 ---
     */
    async showConfirm2() {
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
    showCustomDialog() {
        this.customDialogText = '';
        this.customDialog = true;
    }
    /**
     * --- 自定义对话框确认 ---
     */
    customDialogConfirm() {
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
    async showLoading() {
        this.loading = true;
        await purease.tool.sleep(1500);
        this.loading = false;
    }
    /**
     * --- 添加标签 ---
     */
    addTag() {
        this.tagList.push(`Tag ${this.tagList.length + 1}`);
    }
    /**
     * --- 删除标签 ---
     */
    removeTag(index) {
        this.tagList.splice(index, 1);
    }
    /**
     * --- 数字键盘按钮点击 ---
     */
    nboardButton(btn) {
        this.alert(`Button clicked: ${btn}`, 'pe');
    }
    /**
     * --- 日期面板改变事件 ---
     */
    dpOnChanged(e) {
        purease.display('dpOnChanged', e);
    }
    /**
     * --- 日期面板范围事件 ---
     */
    dpOnRange(e) {
        purease.display('dpOnRange', e);
    }
    /**
     * --- 设置随机时间戳 ---
     */
    setRandomTimestamp() {
        this.dpTimestamp = purease.tool.rand(1504304812000, 1704304812000);
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
        purease.display('Page initialized.');
    }
}
purease.launcher(Page, {
    'debug': true,
    'locale': 'en',
    'localePath': purease.getDirname(import.meta.url) + '/locale'
});
