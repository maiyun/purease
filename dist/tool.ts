/**
 * Copyright 2024 Han Guoshuai <zohegs@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as types from '../types';

interface IClassPrototype {
    'method': Record<string, any>;
    'access': Record<string, {
        'get'?: any;
        'set'?: any;
    }>;
}

/**
 * --- 完整的克隆一份数组/对象 ---
 * @param obj 要克隆的对象
 */
export function clone(obj: Record<string, any> | any[]): any[] | any {
    let newObj: any = {};
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

/**
 * --- 获取 class 的所有 method 和 get/set ---
 * @param obj 实例化 class 对象
 * @param over 不传入此参数
 * @param level 不传入此参数
 */
export function getClassPrototype(obj: object, over: string[] = [], level: number = 0): IClassPrototype {
    if (level === 0) {
        return getClassPrototype(Object.getPrototypeOf(obj), over, level + 1);
    }
    const rtn: IClassPrototype = {
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
            // --- method ---
            rtn.method[item] = des.value;
        }
        else if (des.get ?? des.set) {
            if (!rtn.access[item]) {
                rtn.access[item] = {};
            }
            if (des.get) {
                rtn.access[item].get = (des as any).get;
            }
            if (des.set) {
                rtn.access[item].set = (des as any).set;
            }
        }
    }
    // --- 往上级检查 ---
    const rtn2 = getClassPrototype(Object.getPrototypeOf(obj), over, level + 1);
    Object.assign(rtn.method, rtn2.method);
    Object.assign(rtn.access, rtn2.access);
    return rtn;
}

/**
 * --- 等待毫秒 ---
 * @param ms 等待的毫秒，默认 0
 */
export function sleep(ms: number = 0): Promise<boolean> {
    return new Promise(function(resolve) {
        window.setTimeout(function() {
            resolve(true);
        }, ms);
    });
}

/**
 * --- 生成范围内的随机数 ---
 * @param min 最新范围
 * @param max 最大范围
 */
export function rand(min: number, max: number): number {
    if (min > max) {
        [min, max] = [max, min];
    }
    return min + Math.round(Math.random() * (max - min));
}

export const RANDOM_N = '0123456789';
export const RANDOM_U = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const RANDOM_L = 'abcdefghijklmnopqrstuvwxyz';

export const RANDOM_UN = RANDOM_U + RANDOM_N;
export const RANDOM_LN = RANDOM_L + RANDOM_N;
export const RANDOM_LU = RANDOM_L + RANDOM_U;
export const RANDOM_LUN = RANDOM_L + RANDOM_U + RANDOM_N;
export const RANDOM_V = 'ACEFGHJKLMNPRSTWXY34567';
export const RANDOM_LUNS = RANDOM_LUN + '()`~!@#$%^&*-+=_|{}[]:;\'<>,.?/]"';
export function random(length: number = 8, source: string = RANDOM_LN, block: string = ''): string {
    // --- 剔除 block 字符 ---
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

/**
 * --- 根据参数获取最终的布尔值 ---
 * @param param 参数
 */
export function getBoolean(param: boolean | string | number | undefined): boolean {
    const t = typeof param;
    if (t === 'boolean') {
        return param as boolean;
    }
    if (t === 'string') {
        return param === 'false' ? false : true;
    }
    return param ? true : false;
}

/**
 * --- 根据参数获取最终的数字型 ---
 * @param param 参数
 */
export function getNumber(param: string | number): number {
    if (typeof param === 'number') {
        return param;
    }
    return parseFloat(param);
}

/**
 * --- 根据参数获取最终的数组型，可传入类似 [1,2,3] 或 1,2,3 ---
 * @param param 参数
 */
export function getArray(param: string | any[]): any[] {
    if (typeof param !== 'string') {
        return param;
    }
    param = param.trim();
    let rtn: any[] = [];
    if (param.startsWith('[')) {
        try {
            rtn = JSON.parse(param);
        }
        catch {
            return [];
        }
    }
    else {
        param = param.replace(/ /g, '');
        rtn = param.split(',');
    }
    return rtn;
}

/** --- 获取数字的单纯小数点部分 --- */
export function getDecimal(number: number): number {
    const integerPart = Math.sign(number) === 1 ? Math.floor(number) : Math.ceil(number);
    return number - integerPart;
}

/**
 * --- 转义 HTML ---
 * @param html HTML 字符
 */
export function escapeHTML(html: string): string {
    return html.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * --- 发起一个网络请求 ---
 * @param url 网址
 * @param opt 选项
 */
export function request(url: string, opt: types.IRequestOptions): Promise<null | any> {
    return new Promise(function(resove) {
        const xhr = new XMLHttpRequest();
        if (opt.credentials === false) {
            xhr.withCredentials = false;
        }
        xhr.upload.onloadstart = function(e: ProgressEvent): void {
            const r = opt.uploadStart?.(e.total);
            if (r && (r instanceof Promise)) {
                r.catch(function(e) {
                    console.log(e);
                });
            }
        };
        xhr.upload.onprogress = function(e: ProgressEvent): void {
            const r = opt.uploadProgress?.(e.loaded, e.total);
            if (r && (r instanceof Promise)) {
                r.catch(function(e) {
                    console.log(e);
                });
            }
        };
        xhr.upload.onloadend = function(): void {
            const r = opt.uploadEnd?.();
            if (r && (r instanceof Promise)) {
                r.catch(function(e) {
                    console.log(e);
                });
            }
        };
        xhr.onloadstart = function(e: ProgressEvent): void {
            const r = opt.start?.(e.total);
            if (r && (r instanceof Promise)) {
                r.catch(function(e) {
                    console.log(e);
                });
            }
        };
        xhr.onprogress = function(e: ProgressEvent): void {
            const r = opt.progress?.(e.loaded, e.total);
            if (r && (r instanceof Promise)) {
                r.catch(function(e) {
                    console.log(e);
                });
            }
        };
        xhr.onloadend = function(): void {
            const r = opt.end?.();
            if (r && (r instanceof Promise)) {
                r.catch(function(e) {
                    console.log(e);
                });
            }
        };
        xhr.onload = function(): void {
            let res = this.response;
            if (this.getResponseHeader('content-type')?.includes('json')) {
                try {
                    res = JSON.parse(res);
                }
                catch {
                    res = this.response;
                }
            }
            const r = opt.load?.(res);
            if (r && (r instanceof Promise)) {
                r.catch(function(e) {
                    console.log(e);
                });
            }
            resove(res);
        };
        xhr.onerror = function(): void {
            const r = opt.error?.();
            if (r && (r instanceof Promise)) {
                r.catch(function(e) {
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
                xhr.setRequestHeader(k, (opt.headers as any)[k]);
            }
        }
        xhr.open(opt.method ?? 'GET', url, true);
        xhr.send(opt.body);
    });
}

export function fetch(url: string, init?: RequestInit): Promise<string | Blob | null> {
    return loader.fetch(url, init);
}

export function get(url: string, opt?: {
    'credentials'?: 'include' | 'same-origin' | 'omit';
    'headers'?: HeadersInit;
}): Promise<Response | null> {
    return loader.get(url, opt);
}

export function post(url: string, data: Record<string, any> | FormData, opt?: {
    'credentials'?: 'include' | 'same-origin' | 'omit';
    'headers'?: HeadersInit;
}): Promise<Response | null> {
    return loader.post(url, data, opt);
}

/** --- 发送 get 响应为 json 的网络数据，无需 try，失败返回 null --- */
export async function getResponseJson(url: string, opt?: {
    'credentials'?: 'include' | 'same-origin' | 'omit';
    'headers'?: HeadersInit;
}): Promise<any | null> {
    return loader.getResponseJson(url, opt);
}

/** --- 发送 post 响应为 json 的网络数据，无需 try，失败返回 null --- */
export async function postResponseJson(url: string, data: Record<string, any> | FormData, opt?: {
    'credentials'?: 'include' | 'same-origin' | 'omit';
    'headers'?: HeadersInit;
}): Promise<any | null> {
    return loader.postResponseJson(url, data, opt);
}

export function parseUrl(url: string): ILoaderUrl {
    return loader.parseUrl(url);
}

export function urlResolve(from: string, to: string): string {
    return loader.urlResolve(from, to);
}

export function urlAtom(url: string): string {
    return loader.urlAtom(url);
}

export function blob2Text(blob: Blob): Promise<string> {
    return loader.blob2Text(blob);
}

export function blob2DataUrl(blob: Blob): Promise<string> {
    return loader.blob2DataUrl(blob);
}

/** --- 将秒数格式化为 0:0:0 的字符串 --- */
export function formatSecond(second: number): string {
    const h = Math.floor(second / 3600);
    second = second - h * 3600;
    const m = Math.floor(second / 60);
    const s = Math.floor(second - m * 60);
    return (h ? h.toString().padStart(2, '0') + ':' : '') + m.toString().padStart(2, '0') + ':' + s.toString().padStart(2, '0');
}

/**
 * --- 将日期对象或毫秒级时间戳转换为字符串 ---
 * @param ts 时间戳或日期对象
 * @param tz 传入要显示的时区，小时，如 8，默认以当前客户端时区为准
 */
export function formatTime(ts: number | Date, tz?: number): {
    'date': string;
    'time': string;
    'zone': string;
} {
    const rtn = {
        'date': '',
        'time': '',
        'zone': ''
    };
    // --- 代码开始 ---
    if (typeof ts === 'number') {
        ts = new Date(ts);
    }
    /** --- 当前设定的时区 --- */
    const ntz = tz ?? -(ts.getTimezoneOffset() / 60);
    ts.setTime(ts.getTime() + ntz * 60 * 60_000);
    rtn.date = ts.getUTCFullYear().toString() + '-' + (ts.getUTCMonth() + 1).toString().padStart(2, '0') + '-' + ts.getUTCDate().toString().padStart(2, '0');
    rtn.time = ts.getUTCHours().toString().padStart(2, '0') + ':' + ts.getUTCMinutes().toString().padStart(2, '0') + ':' + ts.getUTCSeconds().toString().padStart(2, '0');
    rtn.zone = 'UTC' + (ntz >= 0 ? '+' : '') + ntz.toString();
    return rtn;
}

/**
 * --- 将对象转换为 query string ---
 * @param query 要转换的对象
 */
export function queryStringify(query: Record<string, any>): string {
    return Object.entries(query).map(([k, v]) => {
        if (Array.isArray(v)) {
            return v.map((i) => `${encodeURIComponent(k)}=${encodeURIComponent(`${i}`)}`).join('&');
        }
        return `${encodeURIComponent(k)}=${encodeURIComponent(`${v}`)}`;
    }).join('&');
}

/**
 * --- 将 query string 转换为对象 ---
 * @param query 要转换的字符串
 */
export function queryParse(query: string): Record<string, string | string[]> {
    const ret: Record<string, string | string[]> = {};
    const arrayKeys: Record<string, boolean> = {};
    for (const i of query.split('&')) {
        if (!i.length) {
            continue;
        }

        const pos = i.indexOf('=');

        const key = decodeURIComponent(pos === -1 ? i : i.slice(0, pos));
        const value = pos === -1 ? '' : decodeURIComponent(i.slice(pos + 1));

        if (arrayKeys[key]) {
            (ret[key] as string[]).push(value);
        }
        else if (undefined === ret[key]) {
            ret[key] = value;
        }
        else {
            ret[key] = [ret[key] as string, value];
            arrayKeys[key] = true;
        }
    }
    return ret;
}

/**
 * --- 是否是邮件地址 ---
 * @param email
 */
export function isEMail(email: string): boolean {
    return /^[-_\w.]+@[-_\w.]+\.([a-zA-Z]+)$/i.test(email);
}

/**
 * --- 是否是 IPv4 ---
 * @param ip
 */
export function isIPv4(ip: string): boolean {
    return /^[0-9]{1,3}(\.[0-9]{1,3}){3}$/.test(ip);
}

/**
 * --- 是否是 IPv6 ---
 * @param ip
 */
export function isIPv6(ip: string): boolean {
    return /^(\w*?:){2,7}[\w.]*$/.test(ip + ':');
}

/**
 * --- 判断是否是域名 ---
 * @param string $domain
 * @return bool
 */
export function isDomain(domain: string): boolean {
    return /^.+?\.((?![0-9]).)+$/i.test(domain);
}

// --- 以下是适用于中国大陆的方法 ---

/**
 * --- 判断手机号是否是 11 位，不做真实性校验 ---
 * @param p 手机号
 */
export function isPhoneCN(p: string): boolean {
    return /^1[0-9]{10}$/.test(p);
}
