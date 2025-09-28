import * as purease from 'purease';
import footer from '../test/footer.js';
class Page extends purease.AbstractPage {
    constructor() {
        super(...arguments);
        this.text = '123';
        this.textmulti = '456';
        this.select = 'h';
        this.textSelect = ['a', { 'value': 'ok', 'label': 'v is ok' }, 'c', this.l('ok')];
        this.dlist = 'a';
        this.search = false;
        // --- swipe ---
        this.tab = 0;
        this.swipePage = 'center';
        this.swipeControl = 'inner';
        // --- login ---
        this.user = '';
        this.pwd = '';
        // --- double 页 ---
        this.nbottom = true;
        this.dbottom = 'dark';
        // --- slider ---
        this.slider1 = [15, 0];
        this.slider2 = [200, 300];
        // --- drawer ---
        this.drawer = false;
        this.drawer2 = false;
        this.sheader = false;
        this.slogo = false;
        this.rtl = false;
        this.settingHover = false;
        this.settingPlain = false;
        this.tabHover = false;
        this.customDialog = false;
        this.customDialogText = '';
        // --- page 控件演示 ---
        this.p1 = 3;
        this.p2 = 25;
        this.p3 = 30;
        this.p4 = 50;
        this.p5 = 1;
        this.p6 = 2;
        this.total5 = 0;
        this.count6 = 20;
        this.control = 2;
        this.switch1 = false;
        this.switch2 = 'a';
        // --- Tag 控件 ---
        this.taglist = [];
        this.tagclose = false;
        // --- Datepanel 控件 ---
        this.dpbottom = false;
        this.dptime = true;
        this.dpzone = true;
        /** --- 当前选中的时间戳 --- */
        this.dpts = undefined;
        /** --- 当前设置的日历组件的时区 --- */
        this.dptz = undefined;
        this.dpdisabled = false;
        this.dpplain = false;
        this.dprange = false;
        this.dpstart = false;
        this.dpym = '';
        this.dphm = '';
        this.dplockhm = false;
        // --- date 控件 ---
        this.ddate = true;
        /** --- 当前选中的时间戳 --- */
        this.dts = undefined;
        /** --- daterange 的时间戳 --- */
        this.drts = [];
        // --- vnumber ---
        this.vnumber = '';
        this.vnumberDisabled = false;
        // --- nboard ---
        this.nboard = '';
        this.nboardDisabled = false;
        this.nboardTitle = false;
        this.nboardPlain = false;
        this.nboardSplit = false;
        this.nboardCustom = false;
        this.nboardButtons = false;
        // --- captcha ---
        this.tcResult = 'waiting...';
        this.cfResult = 'waiting...';
        this.tcKey = '';
        this.cfKey = '';
        // --- spa ---
        this.spaPlain = false;
        /** --- 全屏 --- */
        this.spaFull = false;
        this.spaFooter = '1';
    }
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
    nboardButton(btn) {
        this.alert(btn, 'pe');
    }
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
