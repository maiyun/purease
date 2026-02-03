/**
 * Copyright 2007 - 2025 MAIYUN.NET
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

export interface IClassPrototype {
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
export function clone<T>(obj: T): T {
    if (Array.isArray(obj)) {
        // --- 数组 ---
        const newObj = [];
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
        return newObj as T;
    }
    // --- 对象 ---
    const newObj: any = {};
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
        setTimeout(function() {
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
    return html.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&#34;')
        .replace(/'/g, '&#39;');
}

/**
 * --- 还原转义后的 HTML ---
 * @param html 已转义的 HTML 字符
 */
export function unescapeHTML(html: string): string {
    return html.replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&#34;/g, '"')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, '\'')
        .replace(/&apos;/g, '\'');
}

/**
 * --- 发起一个网络请求，若是返回值是 JSON 则自动解析，否则直接返回字符串 ---
 * @param url 网址
 * @param opt 选项
 */
export function request(url: string, opt: IRequestOptions): Promise<null | any> {
    return new Promise(function(resove) {
        const xhr = new XMLHttpRequest();
        if (opt.credentials === false) {
            xhr.withCredentials = false;
        }
        xhr.upload.onloadstart = function(e: ProgressEvent): void {
            const r = opt.uploadStart?.(e.total);
            if (r && (r instanceof Promise)) {
                r.catch(() => {});
            }
        };
        xhr.upload.onprogress = function(e: ProgressEvent): void {
            const r = opt.uploadProgress?.(e.loaded, e.total);
            if (r && (r instanceof Promise)) {
                r.catch(() => {});
            }
        };
        xhr.upload.onloadend = function(): void {
            const r = opt.uploadEnd?.();
            if (r && (r instanceof Promise)) {
                r.catch(() => {});
            }
        };
        xhr.onloadstart = function(e: ProgressEvent): void {
            const r = opt.start?.(e.total);
            if (r && (r instanceof Promise)) {
                r.catch(() => {});
            }
        };
        xhr.onprogress = function(e: ProgressEvent): void {
            const r = opt.progress?.(e.loaded, e.total);
            if (r && (r instanceof Promise)) {
                r.catch(() => {});
            }
        };
        xhr.onloadend = function(): void {
            const r = opt.end?.();
            if (r && (r instanceof Promise)) {
                r.catch(() => {});
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
                r.catch(() => {});
            }
            resove(res);
        };
        xhr.onerror = function(): void {
            const r = opt.error?.();
            if (r && (r instanceof Promise)) {
                r.catch(() => {});
            }
            resove(null);
        };
        if (opt.responseType) {
            xhr.responseType = opt.responseType;
        }
        if (opt.timeout) {
            xhr.timeout = opt.timeout;
        }
        if (opt.headers && !Array.isArray(opt.headers)) {
            for (const k in opt.headers) {
                xhr.setRequestHeader(k, (opt.headers as any)[k]);
            }
        }
        xhr.open(opt.method ?? 'GET', url, true);
        xhr.send(opt.body);
    });
}

/**
 * --- 发起 fetch 请求 ---
 * @param url 网址
 * @param init 选项
 * @returns 文本或二进制数据，失败时返回 null
 */
export async function fetch(url: string, init?: RequestInit): Promise<string | Blob | null> {
    try {
        const res = await window.fetch(url, init);
        if (res.status === 200 || res.status === 304) {
            /** --- 内容类型 --- */
            const ct = res.headers.get('content-type')?.toLowerCase() ?? '';
            const types = ['text/', 'javascript', 'json', 'css', 'xml', 'html'];
            return types.some(item => ct.includes(item)) ? await res.text() : await res.blob();
        }
        return null;
    }
    catch {
        return null;
    }
}

/** --- 重试间隔 --- */
const retryTimes = [300, 1_000, 2_000];

/**
 * --- 发起 GET 请求 ---
 * @param url 网址
 * @param init 选项
 * @param opt 选项
 * @returns 文本或二进制数据，失败时返回 null
 */
export async function get(url: string, init?: RequestInit, opt: {
    /** --- 重试次数，默认 3 次 --- */
    'retry'?: number;
} = {}): Promise<string | Blob | null> {
    init ??= {};
    init.method = 'GET';
    const retry = opt.retry ?? 3;
    for (let i = 0; i <= retry; ++i) {
        const res = await fetch(url, init);
        if (res !== null) {
            return res;
        }
        if (i === retry) {
            return null;
        }
        await sleep(retryTimes[i]);
    }
    return null;
}

/**
 * --- 发起 POST 请求 ---
 * @param url 网址
 * @param data 数据
 * @param init 选项
 * @returns 文本或二进制数据，失败时返回 null
 */
export async function post(
    url: string, data: Record<string, any> | FormData, init?: RequestInit
): Promise<string | Blob | null> {
    init ??= {};
    init.method = 'POST';
    init.headers ??= {};
    if (!(data instanceof FormData)) {
        if (init.headers instanceof Headers) {
            init.headers.set('content-type', 'application/json');
        }
        else {
            (init.headers as Record<string, string>)['content-type'] = 'application/json';
        }
    }
    init.body = data instanceof FormData ? data : JSON.stringify(data);
    const res = await fetch(url, init);
    return res;
}

/**
 * --- 发起 GET 请求并解析 JSON 响应 ---
 * @param url 网址
 * @param init 选项
 * @returns JSON 数据，失败时返回 null
 */
export async function getResponseJson(url: string, init?: RequestInit): Promise<any | null> {
    const res = await get(url, init);
    if (!res) {
        return null;
    }
    if (typeof res !== 'string') {
        return null;
    }
    try {
        return JSON.parse(res);
    }
    catch {
        return null;
    }
}

/**
 * --- 发起 POST 请求并解析 JSON 响应 ---
 * @param url 网址
 * @param data 数据
 * @param init 选项
 * @returns JSON 数据，失败时返回 null
 */
export async function postResponseJson(
    url: string, data: Record<string, any> | FormData, init?: RequestInit
): Promise<any | null> {
    const res = await post(url, data, init);
    if (!res) {
        return null;
    }
    if (typeof res !== 'string') {
        return null;
    }
    try {
        return JSON.parse(res);
    }
    catch {
        return null;
    }
}

/**
 * --- 传输 url 并解析为 IUrl 对象 ---
 * @param url url 字符串
 */
export function parseUrl(url: string): IUrl {
    // --- test: https://ab-3dc:aak9()$@github.com:80/nodejs/node/blob/master/lib/url.js?mail=abc@def.com#223 ---
    const rtn: IUrl = {
        'protocol': null,
        'auth': null,
        'user': null,
        'pass': null,
        'host': null,
        'hostname': null,
        'port': null,
        'pathname': '/',
        'path': null,
        'query': null,
        'hash': null
    };
    const hash = url.indexOf('#');
    if (hash > -1) {
        rtn['hash'] = url.slice(hash + 1);
        url = url.slice(0, hash);
    }
    const query = url.indexOf('?');
    if (query > -1) {
        rtn['query'] = url.slice(query + 1);
        url = url.slice(0, query);
    }
    const protocol = url.indexOf(':');
    if (protocol > -1) {
        rtn['protocol'] = url.slice(0, protocol + 1).toLowerCase();
        url = url.slice(protocol + 1);
        if (url.startsWith('//')) {
            url = url.slice(2);
        }
        let path = url.indexOf('/');
        if (path === -1) {
            path = url.indexOf('\\');
        }
        if (path > -1) {
            rtn['pathname'] = url.slice(path);
            url = url.slice(0, path);
        }
        const auth = url.indexOf('@');
        if (auth > -1) {
            const authStr = url.slice(0, auth);
            const authSplit = authStr.indexOf(':');
            if (authSplit > -1) {
                // --- 有密码 ---
                rtn['user'] = authStr.slice(0, authSplit);
                rtn['pass'] = authStr.slice(authSplit + 1);
                rtn['auth'] = rtn['user'] + ':' + rtn['pass'];
            }
            else {
                rtn['user'] = authStr;
                rtn['auth'] = authStr;
            }
            url = url.slice(auth + 1);
        }
        if (url) {
            const port = url.indexOf(':');
            if (port > -1) {
                rtn['hostname'] = url.slice(0, port).toLowerCase();
                rtn['port'] = url.slice(port + 1);
                rtn['host'] = rtn['hostname'] + (rtn['port'] ? ':' + rtn['port'] : '');
            }
            else {
                rtn['hostname'] = url.toLowerCase();
                rtn['host'] = rtn['hostname'];
            }
        }
    }
    else {
        // --- 没有 protocol ---
        rtn['pathname'] = url;
    }
    // --- 组合 ---
    rtn['path'] = rtn['pathname'] + (rtn['query'] ? '?' + rtn['query'] : '');
    return rtn;
}

/**
 * --- 将相对路径根据基准路径进行转换 ---
 * @param from 基准路径
 * @param to 相对路径
 */
export function urlResolve(from: string, to: string): string {
    from = from.replace(/\\/g, '/');
    to = to.replace(/\\/g, '/');
    // --- to 为空，直接返回 form ---
    if (to === '') {
        return urlAtom(from);
    }
    // --- 获取 from 的 scheme, host, path ---
    const f = parseUrl(from);
    // --- 以 // 开头的，加上 from 的 protocol 返回 ---
    if (to.startsWith('//')) {
        return urlAtom(f.protocol ? f.protocol + to : to);
    }
    if (f.protocol) {
        // --- 获取小写的 protocol ---
        from = f.protocol + from.slice(f.protocol.length);
    }
    // --- 获取 to 的 scheme, host, path ---
    const t = parseUrl(to);
    // --- 已经是绝对路径，直接返回 ---
    if (t.protocol) {
        // --- 获取小写的 protocol ---
        return urlAtom(t.protocol + to.slice(t.protocol.length));
    }
    // --- # 或 ? 替换后返回 ---
    if (to.startsWith('#') || to.startsWith('?')) {
        const sp = from.indexOf(to[0]);
        if (sp !== -1) {
            return urlAtom(from.slice(0, sp) + to);
        }
        else {
            return urlAtom(from + to);
        }
    }
    // --- 处理后面的尾随路径 ---
    let abs = (f.auth ? f.auth + '@' : '') + (f.host ?? '');
    if (to.startsWith('/')) {
        // -- abs 类似是 /xx/xx ---
        abs += to;
    }
    else {
        // --- to 是 xx/xx 这样的 ---
        // --- 移除基准 path 不是路径的部分，如 /ab/c 变成了 /ab，/ab 变成了 空 ---
        const path = f.pathname.replace(/\/[^/]*$/g, '');
        // --- abs 是 /xx/xx 了，因为如果 path 是空，则跟上了 /，如果 path 不为空，也是 / 开头 ---
        abs += path + '/' + to;
    }
    // --- 返回最终结果 ---
    if (f.protocol && (f.protocol !== 'file:') && !f.host) {
        // --- 类似 c:/ ---
        return urlAtom(f.protocol + abs);
    }
    else {
        // --- 类似 http:// ---
        return urlAtom((f.protocol ? f.protocol + '//' : '') + abs);
    }
}

/** --- 处理 URL 中的 .. / . 等 --- */
export function urlAtom(url: string): string {
    // --- 删掉 ./ ---
    while (url.includes('/./')) {
        url = url.replace(/\/\.\//g, '/');
    }
    // --- 删掉 ../ ---
    while (/\/(?!\.\.)[^/]+\/\.\.\//.test(url)) {
        url = url.replace(/\/(?!\.\.)[^/]+\/\.\.\//g, '/');
    }
    url = url.replace(/\.\.\//g, '');
    return url;
}

/**
 * --- 将 blob 对象转换为 text ---
 * @param blob 对象
 */
export function blob2Text(blob: Blob): Promise<string> {
    return new Promise(function(resove) {
        const fr = new FileReader();
        fr.addEventListener('load', function(e) {
            if (e.target) {
                resove(e.target.result as string);
            }
            else {
                resove('');
            }
        });
        fr.readAsText(blob);
    });
}

/**
 * --- 将 blob 对象转换为 base64 url ---
 * @param blob 对象
 */
export function blob2DataUrl(blob: Blob): Promise<string> {
    return new Promise(function(resove) {
        const fr = new FileReader();
        fr.addEventListener('load', function(e) {
            if (e.target) {
                resove(e.target.result as string);
            }
            else {
                resove('');
            }
        });
        fr.readAsDataURL(blob);
    });
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
 * @param domain 域名
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

/**
 * --- 去除 html 的空白符、换行以及注释 ---
 * @param text 要纯净的字符串
 */
export function purify(text: string): string {
    text = '>' + text + '<';
    const scripts: string[] = [];
    let num: number = -1;
    text = text.replace(/<!--([\s\S]*?)-->/g, '').replace(/<script[\s\S]+?<\/script>/g, function(t: string): string {
        scripts.push(t);
        return '[SCRIPT]';
    }).replace(/>([\s\S]*?)</g, function(t: string, t1: string): string {
        return '>' + t1.replace(/\t|\r\n| {2}/g, '').replace(/\n|\r/g, '') + '<';
    }).replace(/\[SCRIPT\]/g, function(): string {
        ++num;
        return scripts[num];
    });
    return text.slice(1, -1);
}

let headElement: HTMLHeadElement;
function getHeadElement(): HTMLHeadElement {
    if (!headElement) {
        const heads = document.querySelectorAll('head');
        headElement = heads[heads.length - 1];
    }
    return headElement;
}

/**
 * --- 加载脚本 ---
 * @param url 脚本网址
 */
export async function loadScript(url: string): Promise<boolean> {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.addEventListener('load', function() {
            resolve(true);
        });
        script.addEventListener('error', function() {
            resolve(false);
        });
        script.src = url;
        getHeadElement().appendChild(script);
    });
}

/**
 * --- 批量加载 js 文件 ---
 * @param urls js 文件列表
 * @param opt 选项
 */
export async function loadScripts(urls: string[], opt: {
    'loaded'?: (url: string, state: number) => void;
} = {}): Promise<void> {
    return new Promise((resolve) => {
        let count = 0;
        for (const url of urls) {
            loadScript(url).then(res => {
                ++count;
                if (res) {
                    opt.loaded?.(url, 1);
                }
                else {
                    opt.loaded?.(url, 0);
                }
                if (count === urls.length) {
                    resolve();
                }
            }).catch(() => {
                ++count;
                opt.loaded?.(url, -1);
                if (count === urls.length) {
                    resolve();
                }
            });
        }
    });
}

/**
 * --- 加载 css 文件 ---
 * @param url css 文件网址
 * @returns 加载是否成功
 */
export async function loadLink(url: string, pos: 'before' | 'after' = 'after'): Promise<boolean> {
    return new Promise((resolve) => {
        const head = getHeadElement();
        const link = document.createElement('link');
        link.addEventListener('load', function() {
            resolve(true);
        });
        link.addEventListener('error', function() {
            resolve(false);
        });
        link.href = url;
        link.rel = 'stylesheet';
        if (pos === 'before') {
            head.insertBefore(link, head.firstChild);
        }
        else {
            head.appendChild(link);
        }
    });
}

/**
 * --- 批量加载 css 文件 ---
 * @param urls css 文件列表
 * @param opt 选项
 */
export async function loadLinks(urls: string[], opt: {
    'loaded'?: (url: string, state: number) => void;
} = {}): Promise<void> {
    return new Promise((resolve) => {
        let count = 0;
        for (const url of urls) {
            loadLink(url).then(res => {
                ++count;
                if (res) {
                    opt.loaded?.(url, 1);
                }
                else {
                    opt.loaded?.(url, 0);
                }
                if (count === urls.length) {
                    resolve();
                }
            }).catch(() => {
                ++count;
                opt.loaded?.(url, -1);
                if (count === urls.length) {
                    resolve();
                }
            });
        }
    });
}

// --- 类型 ---

/** --- 网址对象 --- */
export interface IUrl {
    'auth': string | null;
    'hash': string | null;
    'host': string | null;
    'hostname': string | null;
    'pass': string | null;
    'path': string | null;
    'pathname': string;
    'protocol': string | null;
    'port': string | null;
    'query': string | null;
    'user': string | null;
}

export interface IRequestOptions {
    'credentials'?: boolean;
    'method'?: 'GET' | 'POST';
    'body'?: FormData;
    'timeout'?: number;
    'responseType'?: XMLHttpRequestResponseType;
    'headers'?: HeadersInit;

    'uploadStart'?: (total: number) => void | Promise<void>;
    'uploadProgress'?: (loaded: number, total: number) => void | Promise<void>;
    'uploadEnd'?: () => void | Promise<void>;
    'start'?: (total: number) => void | Promise<void>;
    'end'?: () => void | Promise<void>;
    'progress'?: (loaded: number, total: number) => void | Promise<void>;
    'load'?: (res: any) => void | Promise<void>;
    'error'?: () => void | Promise<void>;
}
