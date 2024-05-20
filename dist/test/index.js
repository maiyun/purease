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
        this.tab = 0;
        this.swipePage = 'center';
        this.swipeControl = 'inner';
        this.user = '';
        this.pwd = '';
        this.customDialog = false;
        this.customDialogText = '';
    }
    main() {
        console.log('Inited.', purease);
    }
    showDialog() {
        this.dialog('This is a dialog.');
    }
    showDialog2() {
        this.dialog({
            'title': 'Title',
            'content': 'Has title',
            'buttons': ['Cancel', 'OK']
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
}
purease.launcher(new Page({
    'debug': true
}), [
    {
        'selector': '#footer',
        'panel': footer_1.default
    }
]);
