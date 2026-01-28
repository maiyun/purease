import * as purease from 'purease';
import footer from './footer.js';
class Page extends purease.AbstractPage {
    text = '123';
    textmulti = '456';
    select = 'h';
    textSelect = ['a', { 'value': 'ok', 'label': 'v is ok' }, 'c', this.l('ok')];
    dlist = 'a';
    dlistChildren = 'item1';
    dlistChildrenTree = 'item1';
    dlistChildrenData = [
        { 'label': 'Item 1', 'value': 'item1' },
        {
            'label': 'Item 2',
            'value': 'item2',
            'children': [
                {
                    'label': 'Sub Item 2-1',
                    'value': 'item2-1'
                },
                {
                    'label': 'Sub Item 2-2',
                    'value': 'item2-2',
                    'children': [
                        { 'label': 'Deep Item 2-2-1', 'value': 'item2-2-1' },
                        { 'label': 'Deep Item 2-2-2', 'value': 'item2-2-2' }
                    ]
                }
            ]
        },
        { 'label': 'Item 3', 'value': 'item3' }
    ];
    search = false;
    // --- swipe ---
    tab = 0;
    swipePage = 'bottom';
    swipeControl = 'hide';
    // --- login ---
    user = '';
    pwd = '';
    // --- double 页 ---
    nbottom = true;
    dbottom = 'dark';
    // --- slider ---
    slider1 = [15, 0];
    slider2 = [200, 300];
    // --- drawer ---
    drawer = false;
    drawer2 = false;
    changeNBottom() {
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
    sheader = false;
    changeSheader() {
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
    slogo = false;
    rtl = false;
    settingHover = false;
    settingPlain = false;
    settingLight = false;
    rectTabItemValue = 0;
    tabHover = false;
    changeRTL() {
        this.rtl = !this.rtl;
        if (this.rtl) {
            document.getElementsByTagName('html')[0].classList.add('pe-rtl');
        }
        else {
            document.getElementsByTagName('html')[0].classList.remove('pe-rtl');
        }
    }
    main() {
        purease.display('Inited.', purease);
    }
    onReady() {
        purease.display('onReady', purease);
    }
    async showDialog() {
        await this.dialog('This is a dialog.');
    }
    async showDialog2() {
        await this.dialog({
            'title': 'Title',
            'content': 'Has title',
            'buttons': ['Cancel', 'OK'],
        });
    }
    async showConfirm() {
        const res = await this.confirm('This is a confirm');
        await this.dialog('Result: ' + JSON.stringify(res) + ' (' + typeof res + ')');
    }
    async showConfirm2() {
        const res = await this.confirm({
            'title': 'Has cancel',
            'content': 'This is a confirm',
            'cancel': true
        });
        await this.dialog('Result: ' + JSON.stringify(res) + ' (' + typeof res + ')');
    }
    showCustom() {
        this.customDialogText = '';
        this.customDialog = true;
    }
    customDialog = false;
    customDialogText = '';
    customDialogSelect() {
        if (!this.customDialogText) {
            // --- 弹出不可为空的提示 ---
            this.alert('Name can not be empty.', 'warning');
            return;
        }
        // --- 隐藏窗体 ---
        this.customDialog = false;
    }
    async showLoading() {
        this.loading = true;
        await purease.tool.sleep(1500);
        this.loading = false;
    }
    get testhead() {
        return purease.global.head ?? 'none';
    }
    // --- page 控件演示 ---
    p1 = 3;
    p2 = 25;
    p3 = 30;
    p4 = 50;
    p5 = 1;
    p6 = 2;
    total5 = 0;
    count6 = 20;
    control = 2;
    switch1 = false;
    switch2 = 'a';
    // --- Tag 控件 ---
    taglist = [];
    tagclose = false;
    // --- Datepanel 控件 ---
    dpbottom = false;
    dptime = true;
    dpzone = true;
    /** --- 当前选中的时间戳 --- */
    dpts = undefined;
    /** --- 当前设置的日历组件的时区 --- */
    dptz = undefined;
    dpdisabled = false;
    dpplain = false;
    dprange = false;
    dpstart = false;
    dpym = '';
    dphm = '';
    dplockhm = false;
    // --- 指定时间戳 ---
    dpsettime() {
        this.dpts = purease.tool.rand(1504304812000, 1704304812000);
    }
    dpOnChanged(e) {
        purease.display('onChanged', e, JSON.stringify(e));
    }
    dpOnRange(e) {
        purease.display('onRange', e);
    }
    // --- date 控件 ---
    ddate = true;
    /** --- 当前选中的时间戳 --- */
    dts = undefined;
    /** --- daterange 的时间戳 --- */
    drts = [];
    // --- vnumber ---
    vnumber = '';
    vnumberDisabled = false;
    // --- nboard ---
    nboard = '';
    nboardDisabled = false;
    nboardTitle = false;
    nboardPlain = false;
    nboardSplit = false;
    nboardCustom = false;
    nboardButtons = false;
    nboardButton(btn) {
        this.alert(btn, 'pe');
    }
    nboardSize = 'default';
    // --- captcha ---
    tcResult = 'waiting...';
    cfResult = 'waiting...';
    tcKey = '';
    cfKey = '';
    tcOnResult(res) {
        this.tcResult = res;
    }
    tcOnReset() {
        this.tcResult = 'waiting...';
        this.refs.tc.reset();
    }
    cfOnResult(res) {
        this.cfResult = res;
    }
    cfOnReset() {
        this.cfResult = 'waiting...';
        this.refs.cf.reset();
    }
    // --- spa ---
    spaPlain = false;
    /** --- 全屏 --- */
    spaFull = false;
    spaFooter = '1';
    spaTag = '1';
    spaGo(path) {
        window.location.hash = '#' + path;
    }
    spaShow2(e) {
        purease.display('spaShow2', e);
    }
    spaHide2(e) {
        purease.display('spaHide2', e);
    }
}
purease.launcher(Page, {
    'debug': true,
    'locale': 'sc',
    'localePath': purease.getDirname(import.meta.url) + '/locale',
    'panels': [
        {
            'selector': '#footer',
            'panel': footer,
        }
    ]
});
