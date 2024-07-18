"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const purease = __importStar(require("../index"));
const footer_1 = __importDefault(require("../test/footer"));
class Page extends purease.AbstractPage {
    constructor() {
        super(...arguments);
        this.text = '123';
        this.select = 'h';
        this.textSelect = ['a', { 'value': 'ok', 'label': 'v is ok' }, 'c', this.l('ok')];
        this.search = false;
        this.tab = 0;
        this.swipePage = 'center';
        this.swipeControl = 'inner';
        this.user = '';
        this.pwd = '';
        this.nbottom = true;
        this.dbottom = 'dark';
        this.slider1 = [15, 0];
        this.slider2 = [200, 300];
        this.drawer = false;
        this.drawer2 = false;
        this.sheader = false;
        this.customDialog = false;
        this.customDialogText = '';
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
    }
    changeNBottom() {
        this.nbottom = !this.nbottom;
        if (this.nbottom) {
            document.getElementsByTagName('html')[0].classList.add('pe-dheader');
        }
        else {
            document.getElementsByTagName('html')[0].classList.remove('pe-dheader');
        }
    }
    changeSheader() {
        this.sheader = !this.sheader;
        if (this.sheader) {
            document.getElementsByTagName('html')[0].classList.add('pe-sheader');
        }
        else {
            document.getElementsByTagName('html')[0].classList.remove('pe-sheader');
        }
    }
    main() {
        console.log('Inited.', purease);
    }
    showDialog() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dialog('This is a dialog.');
        });
    }
    showDialog2() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dialog({
                'title': 'Title',
                'content': 'Has title',
                'buttons': ['Cancel', 'OK']
            });
        });
    }
    showConfirm() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.confirm('This is a confirm');
            yield this.dialog('Result: ' + JSON.stringify(res) + ' (' + typeof res + ')');
        });
    }
    showConfirm2() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.confirm({
                'title': 'Has cancel',
                'content': 'This is a confirm',
                'cancel': true
            });
            yield this.dialog('Result: ' + JSON.stringify(res) + ' (' + typeof res + ')');
        });
    }
    showCustom() {
        this.customDialogText = '';
        this.customDialog = true;
    }
    customDialogSelect() {
        if (!this.customDialogText) {
            this.notify('Name can not be empty.');
            return;
        }
        this.customDialog = false;
    }
    showLoading() {
        return __awaiter(this, void 0, void 0, function* () {
            this.loading = true;
            yield purease.tool.sleep(1500);
            this.loading = false;
        });
    }
}
purease.launcher(Page, {
    'debug': true,
    'locale': 'sc',
    'localePath': __dirname + '/locale',
    'panels': [
        {
            'selector': '#footer',
            'panel': footer_1.default
        }
    ]
});
