"use strict";
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
exports.isPhoneCN = exports.isDomain = exports.isIPv6 = exports.isIPv4 = exports.isEMail = exports.queryParse = exports.queryStringify = exports.formatSecond = exports.blob2DataUrl = exports.blob2Text = exports.urlAtom = exports.urlResolve = exports.parseUrl = exports.postResponseJson = exports.getResponseJson = exports.post = exports.get = exports.fetch = exports.request = exports.escapeHTML = exports.getDecimal = exports.getArray = exports.getNumber = exports.getBoolean = exports.random = exports.RANDOM_LUNS = exports.RANDOM_V = exports.RANDOM_LUN = exports.RANDOM_LU = exports.RANDOM_LN = exports.RANDOM_UN = exports.RANDOM_L = exports.RANDOM_U = exports.RANDOM_N = exports.rand = exports.sleep = exports.getClassPrototype = exports.clone = void 0;
function clone(obj) {
    let newObj = {};
    if (obj instanceof Array) {
        newObj = [];
        for (let i = 0; i < obj.length; ++i) {
            if (obj[i] instanceof Date) {
                newObj[i] = new Date(obj[i].getTime());
            }
            else if (obj[i] instanceof FormData) {
                const fd = new FormData();
                for (const item of obj[i]) {
                    fd.append(item[0], item[1]);
                }
                newObj[i] = fd;
            }
            else if (obj[i] === null) {
                newObj[i] = null;
            }
            else if (typeof obj[i] === 'object') {
                newObj[i] = clone(obj[i]);
            }
            else {
                newObj[i] = obj[i];
            }
        }
    }
    else {
        for (const key in obj) {
            if (obj[key] instanceof Date) {
                newObj[key] = new Date(obj[key].getTime());
            }
            else if (obj[key] instanceof FormData) {
                const fd = new FormData();
                for (const item of obj[key]) {
                    fd.append(item[0], item[1]);
                }
                newObj[key] = fd;
            }
            else if (obj[key] === null) {
                newObj[key] = null;
            }
            else if (typeof obj[key] === 'object') {
                newObj[key] = clone(obj[key]);
            }
            else {
                newObj[key] = obj[key];
            }
        }
    }
    return newObj;
}
exports.clone = clone;
function getClassPrototype(obj, over = [], level = 0) {
    if (level === 0) {
        return getClassPrototype(Object.getPrototypeOf(obj), over, level + 1);
    }
    const rtn = {
        'method': {},
        'access': {}
    };
    const names = Object.getOwnPropertyNames(obj);
    if (names.includes('toString')) {
        return rtn;
    }
    for (const item of names) {
        if (item === 'constructor') {
            continue;
        }
        if (over.includes(item)) {
            continue;
        }
        const des = Object.getOwnPropertyDescriptor(obj, item);
        if (!des) {
            continue;
        }
        over.push(item);
        if (des.value) {
            rtn.method[item] = des.value;
        }
        else if (des.get || des.set) {
            if (!rtn.access[item]) {
                rtn.access[item] = {};
            }
            if (des.get) {
                rtn.access[item].get = des.get;
            }
            if (des.set) {
                rtn.access[item].set = des.set;
            }
        }
    }
    const rtn2 = getClassPrototype(Object.getPrototypeOf(obj), over, level + 1);
    Object.assign(rtn.method, rtn2.method);
    Object.assign(rtn.access, rtn2.access);
    return rtn;
}
exports.getClassPrototype = getClassPrototype;
function sleep(ms = 0) {
    return new Promise(function (resolve) {
        window.setTimeout(function () {
            resolve(true);
        }, ms);
    });
}
exports.sleep = sleep;
function rand(min, max) {
    if (min > max) {
        [min, max] = [max, min];
    }
    return min + Math.round(Math.random() * (max - min));
}
exports.rand = rand;
exports.RANDOM_N = '0123456789';
exports.RANDOM_U = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
exports.RANDOM_L = 'abcdefghijklmnopqrstuvwxyz';
exports.RANDOM_UN = exports.RANDOM_U + exports.RANDOM_N;
exports.RANDOM_LN = exports.RANDOM_L + exports.RANDOM_N;
exports.RANDOM_LU = exports.RANDOM_L + exports.RANDOM_U;
exports.RANDOM_LUN = exports.RANDOM_L + exports.RANDOM_U + exports.RANDOM_N;
exports.RANDOM_V = 'ACEFGHJKLMNPRSTWXY34567';
exports.RANDOM_LUNS = exports.RANDOM_LUN + '()`~!@#$%^&*-+=_|{}[]:;\'<>,.?/]';
function random(length = 8, source = exports.RANDOM_LN, block = '') {
    let len = block.length;
    if (len > 0) {
        for (let i = 0; i < len; ++i) {
            source = source.replace(block[i], '');
        }
    }
    len = source.length;
    if (len === 0) {
        return '';
    }
    let temp = '';
    for (let i = 0; i < length; ++i) {
        temp += source[rand(0, len - 1)];
    }
    return temp;
}
exports.random = random;
function getBoolean(param) {
    const t = typeof param;
    if (t === 'boolean') {
        return param;
    }
    if (t === 'string') {
        return param === 'false' ? false : true;
    }
    return param ? true : false;
}
exports.getBoolean = getBoolean;
function getNumber(param) {
    if (typeof param === 'number') {
        return param;
    }
    return parseFloat(param);
}
exports.getNumber = getNumber;
function getArray(param) {
    if (typeof param !== 'string') {
        return param;
    }
    param = param.trim();
    let rtn = [];
    if (param.startsWith('[')) {
        try {
            rtn = JSON.parse(param);
        }
        catch (_a) {
            return [];
        }
    }
    else {
        param = param.replace(/ /g, '');
        rtn = param.split(',');
    }
    return rtn;
}
exports.getArray = getArray;
function getDecimal(number) {
    const integerPart = Math.sign(number) === 1 ? Math.floor(number) : Math.ceil(number);
    return number - integerPart;
}
exports.getDecimal = getDecimal;
function escapeHTML(html) {
    return html.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
exports.escapeHTML = escapeHTML;
function request(url, opt) {
    return new Promise(function (resove) {
        var _a;
        const xhr = new XMLHttpRequest();
        if (opt.credentials === false) {
            xhr.withCredentials = false;
        }
        xhr.upload.onloadstart = function (e) {
            var _a;
            const r = (_a = opt.uploadStart) === null || _a === void 0 ? void 0 : _a.call(opt, e.total);
            if (r && (r instanceof Promise)) {
                r.catch(function (e) {
                    console.log(e);
                });
            }
        };
        xhr.upload.onprogress = function (e) {
            var _a;
            const r = (_a = opt.uploadProgress) === null || _a === void 0 ? void 0 : _a.call(opt, e.loaded, e.total);
            if (r && (r instanceof Promise)) {
                r.catch(function (e) {
                    console.log(e);
                });
            }
        };
        xhr.upload.onloadend = function () {
            var _a;
            const r = (_a = opt.uploadEnd) === null || _a === void 0 ? void 0 : _a.call(opt);
            if (r && (r instanceof Promise)) {
                r.catch(function (e) {
                    console.log(e);
                });
            }
        };
        xhr.onloadstart = function (e) {
            var _a;
            const r = (_a = opt.start) === null || _a === void 0 ? void 0 : _a.call(opt, e.total);
            if (r && (r instanceof Promise)) {
                r.catch(function (e) {
                    console.log(e);
                });
            }
        };
        xhr.onprogress = function (e) {
            var _a;
            const r = (_a = opt.progress) === null || _a === void 0 ? void 0 : _a.call(opt, e.loaded, e.total);
            if (r && (r instanceof Promise)) {
                r.catch(function (e) {
                    console.log(e);
                });
            }
        };
        xhr.onloadend = function () {
            var _a;
            const r = (_a = opt.end) === null || _a === void 0 ? void 0 : _a.call(opt);
            if (r && (r instanceof Promise)) {
                r.catch(function (e) {
                    console.log(e);
                });
            }
        };
        xhr.onload = function () {
            var _a, _b;
            let res = this.response;
            if ((_a = this.getResponseHeader('content-type')) === null || _a === void 0 ? void 0 : _a.includes('json')) {
                try {
                    res = JSON.parse(res);
                }
                catch (_c) {
                    res = this.response;
                }
            }
            const r = (_b = opt.load) === null || _b === void 0 ? void 0 : _b.call(opt, res);
            if (r && (r instanceof Promise)) {
                r.catch(function (e) {
                    console.log(e);
                });
            }
            resove(res);
        };
        xhr.onerror = function () {
            var _a;
            const r = (_a = opt.error) === null || _a === void 0 ? void 0 : _a.call(opt);
            if (r && (r instanceof Promise)) {
                r.catch(function (e) {
                    console.log(e);
                });
            }
            resove(null);
        };
        if (opt.responseType) {
            xhr.responseType = opt.responseType;
        }
        if (opt.timeout) {
            xhr.timeout = opt.timeout;
        }
        if (opt.headers) {
            for (const k in opt.headers) {
                xhr.setRequestHeader(k, opt.headers[k]);
            }
        }
        xhr.open((_a = opt.method) !== null && _a !== void 0 ? _a : 'GET', url, true);
        xhr.send(opt.body);
    });
}
exports.request = request;
function fetch(url, init) {
    return loader.fetch(url, init);
}
exports.fetch = fetch;
function get(url, opt) {
    return loader.get(url, opt);
}
exports.get = get;
function post(url, data, opt) {
    return loader.post(url, data, opt);
}
exports.post = post;
function getResponseJson(url, opt) {
    return __awaiter(this, void 0, void 0, function* () {
        return loader.getResponseJson(url, opt);
    });
}
exports.getResponseJson = getResponseJson;
function postResponseJson(url, data, opt) {
    return __awaiter(this, void 0, void 0, function* () {
        return loader.postResponseJson(url, data, opt);
    });
}
exports.postResponseJson = postResponseJson;
function parseUrl(url) {
    return loader.parseUrl(url);
}
exports.parseUrl = parseUrl;
function urlResolve(from, to) {
    return loader.urlResolve(from, to);
}
exports.urlResolve = urlResolve;
function urlAtom(url) {
    return loader.urlAtom(url);
}
exports.urlAtom = urlAtom;
function blob2Text(blob) {
    return loader.blob2Text(blob);
}
exports.blob2Text = blob2Text;
function blob2DataUrl(blob) {
    return loader.blob2DataUrl(blob);
}
exports.blob2DataUrl = blob2DataUrl;
function formatSecond(second) {
    const h = Math.floor(second / 3600);
    second = second - h * 3600;
    const m = Math.floor(second / 60);
    const s = Math.floor(second - m * 60);
    return (h ? h.toString().padStart(2, '0') + ':' : '') + m.toString().padStart(2, '0') + ':' + s.toString().padStart(2, '0');
}
exports.formatSecond = formatSecond;
function queryStringify(query) {
    return Object.entries(query).map(([k, v]) => {
        if (Array.isArray(v)) {
            return v.map((i) => `${encodeURIComponent(k)}=${encodeURIComponent(`${i}`)}`).join('&');
        }
        return `${encodeURIComponent(k)}=${encodeURIComponent(`${v}`)}`;
    }).join('&');
}
exports.queryStringify = queryStringify;
function queryParse(query) {
    const ret = {};
    const arrayKeys = {};
    for (const i of query.split('&')) {
        if (!i.length) {
            continue;
        }
        const pos = i.indexOf('=');
        const key = decodeURIComponent(pos === -1 ? i : i.slice(0, pos));
        const value = pos === -1 ? '' : decodeURIComponent(i.slice(pos + 1));
        if (arrayKeys[key]) {
            ret[key].push(value);
        }
        else if (undefined === ret[key]) {
            ret[key] = value;
        }
        else {
            ret[key] = [ret[key], value];
            arrayKeys[key] = true;
        }
    }
    return ret;
}
exports.queryParse = queryParse;
function isEMail(email) {
    return /^[-_\w.]+@[-_\w.]+\.([a-zA-Z]+)$/i.test(email);
}
exports.isEMail = isEMail;
function isIPv4(ip) {
    return /^[0-9]{1,3}(\.[0-9]{1,3}){3}$/.test(ip);
}
exports.isIPv4 = isIPv4;
function isIPv6(ip) {
    return /^(\w*?:){2,7}[\w.]*$/.test(ip + ':');
}
exports.isIPv6 = isIPv6;
function isDomain(domain) {
    return /^.+?\.((?![0-9]).)+$/i.test(domain);
}
exports.isDomain = isDomain;
function isPhoneCN(p) {
    return /^1[0-9]{10}$/.test(p);
}
exports.isPhoneCN = isPhoneCN;
