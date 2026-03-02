import * as purease from 'purease';
class Page extends purease.AbstractPage {
    // --- RTL ---
    rtl = false;
    // --- 表单控件 ---
    /** --- 文本框值 --- */
    text = 'Hello';
    /** --- 多行文本框值 --- */
    textMulti = 'Line 1\nLine 2';
    /** --- 数字输入框值 --- */
    textNumber = '100';
    /** --- 密码框值 --- */
    textPassword = '';
    /** --- 文本框前缀选择 --- */
    textSelect = ['http://', 'https://'];
    /** --- 文本框是否禁用 --- */
    textDisabled = false;
    /** --- 文本框是否朴素 --- */
    textPlain = false;
    /** --- 文本框是否只读 --- */
    textReadonly = false;
    /** --- 下拉选择值 --- */
    select = 'apple';
    /** --- 下拉选择数据 --- */
    selectData = [
        'apple',
        { 'value': 'banana', 'label': 'Banana 🍌' },
        'cherry',
        { 'value': 'disabled', 'label': 'Disabled', 'disabled': true },
        'elderberry'
    ];
    /** --- 下拉选择是否搜索 --- */
    selectSearch = false;
    /** --- 下拉选择是否禁用 --- */
    selectDisabled = false;
    /** --- 下拉选择是否朴素 --- */
    selectPlain = false;
    /** --- 级联选择值 --- */
    cascader = null;
    /** --- 级联选择数据 --- */
    cascaderOptions = [
        {
            'label': 'Asia 亚洲',
            'value': 'asia',
            'children': [
                {
                    'label': 'China 中国',
                    'value': 'china',
                    'children': [
                        { 'label': '北京 Beijing', 'value': 'beijing' },
                        { 'label': '上海 Shanghai', 'value': 'shanghai' },
                        { 'label': '广州 Guangzhou', 'value': 'guangzhou' },
                        { 'label': '深圳 Shenzhen', 'value': 'shenzhen' }
                    ]
                },
                {
                    'label': '日本 Japan',
                    'value': 'japan',
                    'children': [
                        { 'label': '東京 Tokyo', 'value': 'tokyo' },
                        { 'label': '大阪 Osaka', 'value': 'osaka' },
                        { 'label': '京都 Kyoto', 'value': 'kyoto' }
                    ]
                },
                {
                    'label': '한국 Korea',
                    'value': 'korea',
                    'children': [
                        { 'label': '서울 Seoul', 'value': 'seoul' },
                        { 'label': '부산 Busan', 'value': 'busan' }
                    ]
                }
            ]
        },
        {
            'label': 'Europe 欧洲',
            'value': 'europe',
            'children': [
                {
                    'label': 'United Kingdom',
                    'value': 'uk',
                    'children': [
                        { 'label': 'London', 'value': 'london' },
                        { 'label': 'Manchester', 'value': 'manchester' }
                    ]
                },
                {
                    'label': 'France 法国',
                    'value': 'france',
                    'children': [
                        { 'label': 'Paris 巴黎', 'value': 'paris' },
                        { 'label': 'Lyon 里昂', 'value': 'lyon' }
                    ]
                },
                {
                    'label': 'Deutschland',
                    'value': 'germany',
                    'children': [
                        { 'label': 'Berlin 柏林', 'value': 'berlin' },
                        { 'label': 'München', 'value': 'munich' }
                    ]
                }
            ]
        },
        {
            'label': 'Americas 美洲',
            'value': 'americas',
            'children': [
                { 'label': 'New York', 'value': 'newyork' },
                { 'label': 'Los Angeles', 'value': 'la' },
                { 'label': 'São Paulo', 'value': 'saopaulo', 'disabled': true }
            ]
        }
    ];
    /** --- 级联选择长列表数据 --- */
    cascaderLongOptions = [
        {
            'label': 'Category A',
            'value': 'a',
            'children': Array.from({ 'length': 20 }, (_, i) => ({
                'label': `Item A-${i + 1}`,
                'value': `a-${i + 1}`
            }))
        },
        {
            'label': 'Category B',
            'value': 'b',
            'children': Array.from({ 'length': 20 }, (_, i) => ({
                'label': `Item B-${i + 1}`,
                'value': `b-${i + 1}`
            }))
        },
        {
            'label': 'Category C',
            'value': 'c',
            'children': Array.from({ 'length': 20 }, (_, i) => ({
                'label': `Item C-${i + 1}`,
                'value': `c-${i + 1}`
            }))
        }
    ];
    /** --- 级联选择长列表值 --- */
    cascaderLong = null;
    /** --- 级联选择异步加载选项 --- */
    cascaderLazyOptions = [
        { 'label': 'Province 1', 'value': 'province1', 'isLeaf': false },
        { 'label': 'Province 2', 'value': 'province2', 'isLeaf': false },
        { 'label': 'Province 3', 'value': 'province3', 'isLeaf': false }
    ];
    /** --- 级联选择异步加载值 --- */
    cascaderLazy = null;
    /** --- 级联选择异步加载方法（Naive UI on-load 格式） --- */
    cascaderOnLoad = (option) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (option.value.startsWith('province')) {
                    // --- 加载城市 ---
                    option['children'] = [
                        { 'label': `${option.label} - City 1`, 'value': `${option.value}-city1`, 'isLeaf': false },
                        { 'label': `${option.label} - City 2`, 'value': `${option.value}-city2`, 'isLeaf': false }
                    ];
                }
                else {
                    // --- 加载区县 ---
                    option['children'] = [
                        { 'label': `${option.label} - District 1`, 'value': `${option.value}-district1`, 'isLeaf': true },
                        { 'label': `${option.label} - District 2`, 'value': `${option.value}-district2`, 'isLeaf': true }
                    ];
                }
                resolve();
            }, 800);
        });
    };
    /** --- 级联选择是否搜索 --- */
    cascaderSearch = false;
    /** --- 级联选择是否可清空 --- */
    cascaderClearable = false;
    /** --- 级联选择是否禁用 --- */
    cascaderDisabled = false;
    /** --- 级联选择是否仅显示最后一级 --- */
    cascaderShowLastLevel = false;
    /** --- 级联选择触发方式 --- */
    cascaderExpandTrigger = 'click';
    /** --- 菜单是否折叠 --- */
    menuCollapsed = false;
    /** --- Vant 级联选择显示状态 --- */
    vanCascaderShow = false;
    /** --- Vant 级联选择值 --- */
    vanCascaderValue = '';
    /** --- Vant 级联选择文本值 --- */
    vanCascaderField = '';
    /** --- Vant 级联数据 --- */
    vanCascaderOptions = [
        {
            'text': 'Zhejiang 浙江',
            'value': '330000',
            'children': [
                { 'text': 'Hangzhou 杭州', 'value': '330100' },
                { 'text': 'Ningbo 宁波', 'value': '330200' },
            ],
        },
        {
            'text': 'Jiangsu 江苏',
            'value': '320000',
            'children': [
                { 'text': 'Nanjing 南京', 'value': '320100' },
                { 'text': 'Wuxi 无锡', 'value': '320200' },
            ],
        },
    ];
    /** --- 复选框值 --- */
    check = false;
    /** --- 开关值 --- */
    switch1 = false;
    /** --- 开关映射值 --- */
    switch2 = 'on';
    /** --- 开关是否禁用 --- */
    switchDisabled = false;
    /** --- 下拉列表值 --- */
    dlist = 'item1';
    /** --- 下拉列表数据 --- */
    dlistData = [
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
    dlistTree = false;
    /** --- 滑块值 --- */
    slider = [30, 0];
    /** --- 滑块范围值 --- */
    sliderRange = [100, 200];
    /** --- 验证码数字 --- */
    vnumber = '';
    /** --- 验证码数字是否禁用 --- */
    vnumberDisabled = false;
    /** --- 数字键盘值 --- */
    nboard = '';
    /** --- 数字键盘是否禁用 --- */
    nboardDisabled = false;
    /** --- 数字键盘是否朴素 --- */
    nboardPlain = false;
    /** --- 数字键盘是否分隔 --- */
    nboardSplit = false;
    /** --- 数字键盘是否显示标题 --- */
    nboardTitle = false;
    nboardCustom = false;
    /** --- 数字键盘尺寸 --- */
    nboardSize = 'default';
    /** --- 数字键盘按钮参数 --- */
    nboardButtons = undefined;
    // --- captcha ---
    tcResult = 'waiting...';
    cfResult = 'waiting...';
    tcKey = '';
    cfKey = '';
    // --- uploader ---
    /** --- 上传图片列表 --- */
    uploaderImages = [];
    /** --- 是否禁用 --- */
    uploaderDisabled = false;
    /** --- 是否多选 --- */
    uploaderMulti = false;
    /** --- 是否可拖拽 --- */
    uploaderDrag = false;
    /** --- 上传进度 --- */
    uploaderProgress = undefined;
    // --- 数据展示控件 ---
    /** --- 标签列表 --- */
    tagList = ['Tag 1', 'Tag 2'];
    /** --- 标签是否显示关闭 --- */
    tagClose = false;
    /** --- 标签类型 --- */
    tagType = 'default';
    /** --- 标签是否朴素 --- */
    tagPlain = false;
    /** --- 标签尺寸 --- */
    tagSize = 'm';
    // --- 日期控件 ---
    /** --- 日期面板时间戳 --- */
    dpTimestamp = undefined;
    /** --- 日期面板时区 --- */
    dpTimezone = undefined;
    /** --- 日期面板年月 --- */
    dpYearMonth = '';
    /** --- 日期面板时分 --- */
    dpHourMinute = '';
    /** --- 日期面板是否显示时间 --- */
    dpTime = true;
    /** --- 日期面板是否显示时区 --- */
    dpZone = true;
    /** --- 日期面板是否禁用 --- */
    dpDisabled = false;
    /** --- 日期面板是否朴素 --- */
    dpPlain = false;
    /** --- 日期面板是否范围选择 --- */
    dpRange = false;
    /** --- 日期面板 slot 是否启用 --- */
    dpSlotEnabled = false;
    /** --- 日期控件时间戳 --- */
    dateTimestamp = undefined;
    /** --- 日期控件是否显示日期 --- */
    dateShowDate = true;
    /** --- 日期范围时间戳 --- */
    daterangeTimestamp = [];
    // --- 反馈控件 ---
    /** --- 自定义对话框是否显示 --- */
    customDialog = false;
    /** --- 自定义对话框文本 --- */
    customDialogText = '';
    /** --- 抽屉是否显示 --- */
    drawer = false;
    /** --- 抽屉2是否显示 --- */
    drawer2 = false;
    /** --- 分页页码 --- */
    page1 = 1;
    page2 = 5;
    page3 = 1;
    /** --- 分页总数 --- */
    pageTotal = 500;
    /** --- 分页每页条数 --- */
    pageCount = 20;
    // --- 选项卡控件 ---
    /** --- 选项卡值 --- */
    tab = 0;
    /** --- 选项卡是否 hover --- */
    tabHover = false;
    /** --- 选项卡类型 --- */
    tabType = 'default';
    /** --- 大选项卡值 --- */
    btab = 0;
    /** --- 大选项卡类型 --- */
    btabType = 'default';
    // --- 容器控件 ---
    /** --- Setting 是否 hover --- */
    settingHover = false;
    /** --- Setting 是否 plain --- */
    settingPlain = false;
    /** --- Setting 是否 light --- */
    settingLight = false;
    // --- 单页应用控件 ---
    /** --- SPA 是否 plain --- */
    spaPlain = false;
    /** --- SPA 是否全屏 --- */
    spaFull = false;
    /** --- SPA 底部选项卡 --- */
    spaFooter = '1';
    // --- 头部导航控件 ---
    /** --- 是否显示底部栏 --- */
    headerBottom = false;
    /** --- 底部栏主题 --- */
    headerBottomTheme = 'default';
    // --- 表格控件 ---
    /** --- 表格是否自适应 --- */
    tableAdaption = false;
    /** --- 表格是否朴素 --- */
    tablePlain = false;
    // --- 折叠面板控件 ---
    /** --- 折叠面板展开项 --- */
    collapse = ['1'];
    /** --- 手风琴模式折叠面板展开项 --- */
    collapseAccordion = '1';
    // --- 菜单控件 ---
    /** --- 菜单选项 --- */
    menuOptions = [
        {
            'label': () => purease.vue.h('a', {
                'href': 'https://en.wikipedia.org/wiki/Hear_the_Wind_Sing',
                'target': '_blank',
                'rel': 'noopenner noreferrer'
            }, 'Hear the Wind Sing'),
            'key': 'hear-the-wind-sing',
            'icon': () => purease.vue.h(purease.vue.resolveComponent('pe-icon'), { 'name': 'fa-solid fa-book' })
        },
        {
            'label': 'Pinball, 1973',
            'key': 'pinball-1973',
            'disabled': true,
            'children': [
                {
                    'label': 'Rat',
                    'key': 'rat'
                }
            ]
        },
        {
            'label': 'A Wild Sheep Chase',
            'key': 'a-wild-sheep-chase',
            'disabled': true
        },
        {
            'label': 'Dance Dance Dance',
            'key': 'Dance Dance Dance',
            'children': [
                {
                    'type': 'group',
                    'label': 'People',
                    'key': 'people',
                    'children': [
                        {
                            'label': 'Narrator',
                            'key': 'narrator'
                        },
                        {
                            'label': 'Sheep Man',
                            'key': 'sheep-man'
                        }
                    ]
                },
                {
                    'label': 'Beverage',
                    'key': 'beverage',
                    'children': [
                        {
                            'label': () => purease.vue.h('a', {
                                'href': 'https://en.wikipedia.org/wiki/Whisky',
                                'target': '_blank',
                                'rel': 'noopenner noreferrer'
                            }, 'Whisky'),
                            'key': 'whisky'
                        }
                    ]
                },
                {
                    'label': 'Food',
                    'key': 'food',
                    'children': [
                        {
                            'label': 'Sandwich',
                            'key': 'sandwich'
                        }
                    ]
                },
                {
                    'label': 'The past increases. The future recedes.',
                    'key': 'the-past-increases-the-future-recedes'
                }
            ]
        }
    ];
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
    // --- captcha ---
    tcOnResult(res) {
        this.tcResult = res;
    }
    tcOnReset() {
        this.tcResult = 'waiting...';
        this.refs.tc.reset();
    }
    async tcOnFunc() {
        const res = await this.showCaptcha({
            'factory': 'tc',
            'akey': this.tcKey,
        });
        this.tcResult = JSON.stringify(res);
    }
    cfOnResult(res) {
        this.cfResult = res;
    }
    cfOnReset() {
        this.cfResult = 'waiting...';
        this.refs.cf.reset();
    }
    async cfOnFunc() {
        const res = await this.showCaptcha({
            'factory': 'cf',
            'akey': this.cfKey,
        });
        this.tcResult = JSON.stringify(res);
    }
    // --- uploader ---
    /**
     * --- 选择图片事件 ---
     */
    uploaderOnSelect() {
        purease.display('uploaderOnSelect');
        // --- 模拟选择图片后添加 ---
        this.uploaderAddImage();
    }
    /**
     * --- 模拟上传进度 ---
     */
    uploaderSimulateProgress() {
        this.uploaderProgress = 0;
        const timer = setInterval(() => {
            if (this.uploaderProgress === undefined) {
                clearInterval(timer);
                return;
            }
            this.uploaderProgress += 10;
            if (this.uploaderProgress >= 100) {
                clearInterval(timer);
                this.uploaderProgress = undefined;
                this.uploaderAddImage();
            }
        }, 200);
    }
    /**
     * --- 添加图片 ---
     */
    uploaderAddImage() {
        const index = this.uploaderImages.length + 1;
        this.uploaderImages.push({
            'title': `Image ${index}`,
            'src': `./images/bg.jpg`
        });
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
     * --- Vant 级联选择完成事件 ---
     * @param result 结果对象
     */
    vanCascaderOnFinish(result) {
        this.vanCascaderShow = false;
        this.vanCascaderField = result.selectedOptions.map((option) => option.text).join(' / ');
        purease.display('vanCascaderOnFinish', result);
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
    'localePath': purease.getDirname(import.meta.url) + '/locale',
    'modules': ['naive-ui', 'vant'],
});
