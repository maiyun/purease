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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
function purify(text) {
    text = '>' + text + '<';
    text = text.replace(/<!--([\s\S]*?)-->/g, '').replace(/>([\s\S]*?)</g, function (t, t1) {
        return '>' + t1.replace(/\t|\r\n| {2}/g, '').replace(/\n|\r/g, '') + '<';
    });
    return text.slice(1, -1);
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        let list = yield fs.promises.readdir('dist/control/', {
            'withFileTypes': true
        });
        let code = '';
        let style = '';
        for (const item of list) {
            if (item.name.startsWith('.')) {
                continue;
            }
            const flayout = purify((yield fs.promises.readFile('dist/control/' + item.name + '/layout.html')).toString()).replace(/`/g, '\\`');
            const fcode = (yield fs.promises.readFile('dist/control/' + item.name + '/code.ts')).toString().replace(/'template': ''/, `'template': \`${flayout}\``);
            code += `list['pe-${item.name}'] = ` + fcode.slice(fcode.indexOf('export const code = ') + 20) + '\n';
            style += (yield fs.promises.readFile('dist/control/' + item.name + '/style.scss')).toString() + '\n\n';
        }
        code = code.slice(0, -1);
        style = style.slice(0, -2);
        const scode = /^[\s\S]+?\/\/ --- AUTO CODE ---/.exec((yield fs.promises.readFile('dist/control.ts')).toString());
        if (scode) {
            yield fs.promises.writeFile('dist/control.ts', scode[0] + '\n\n' + code);
        }
        const sstyle = /^[\s\S]+?\/\/ --- AUTO CODE ---/.exec((yield fs.promises.readFile('dist/index.scss')).toString());
        if (sstyle) {
            yield fs.promises.writeFile('dist/index.scss', sstyle[0] + '\n\n' + style);
        }
    });
}
run().catch(function (e) {
    console.log(e);
});
