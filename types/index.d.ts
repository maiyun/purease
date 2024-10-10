export * as dom from '../dist/dom';
export * as tool from '../dist/tool';

import { AbstractPage, AbstractPanel } from '../dist/index';
export { AbstractPage, AbstractPanel };

export const global: typeof import('../dist/index').global;

export function launcher<T extends AbstractPage>(page: new (opt: {
    'locale'?: string;
    'localePath'?: string;
}) => T, options?: {
        /** --- 生产环境请不要开启，默认不开启 --- */
        'debug'?: boolean;
        /** --- 设定当前的程序语言 --- */
        'locale'?: string;
        /** --- 设定语言包所在路径，无所谓是否 / 结尾 --- */
        'localePath'?: string;
        /** --- 要加载的子 panels --- */
        'panels'?: Array<{
            'selector': string;
            'panel': new () => AbstractPanel;
        }>;
    }): void;

// -------------------------
// ---------- vue ----------
// -------------------------

export interface IVueObject {
    createApp(opt: any): IVApp;
    ref<T extends number | string>(obj: T): { 'value': T; };
    reactive<T>(obj: T): T;
    watch(
        v: any,
        cb: (n: any, o: any) => void | Promise<void>,
        opt: Record<string, string | boolean>
    ): void;
    h(tag: string, props?: Record<string, any> | any[], list?: any[]): any;
}

export type IVueOptionMergeFunction = (to: unknown, from: unknown, instance: IVue) => any;

export interface IVueConfig {
    errorHandler?(err: unknown, instance: IVue | null, info: string): void;
    'globalProperties': Record<string, any>;
    isCustomElement(tag: string): boolean;
    'optionMergeStrategies': Record<string, IVueOptionMergeFunction>;
    'performance': boolean;
    warnHandler?(msg: string, instance: IVue | null, trace: string): void;
}

export interface IVApp {
    component(name: string): any | undefined;
    component(name: string, config: any): this;
    'config': IVueConfig;
    directive(name: string): any | undefined;
    directive(name: string, config: any): this;
    mixin(mixin: any): this;
    mount(rootContainer: HTMLElement | string): IVue;
    provide<T>(key: string, value: T): this;
    unmount(): void;
    'version': string;

    ['_container']: HTMLElement;
}

export interface IVue {
    '$attrs': Record<string, string>;
    '$data': Record<string, any>;
    '$el': HTMLElement;
    $emit(name: string, ...arg: any): void;
    $forceUpdate(): void;
    $nextTick(): Promise<void>;
    '$options': Record<string, any>;
    '$parent': IVue | null;
    '$props': Record<string, any>;
    '$refs': Record<string, HTMLElement & IVue>;
    '$root': IVue;
    '$slots': {
        'default': undefined | ((o?: any) => IVNode[]);
        [key: string]: undefined | ((o?: any) => IVNode[]);
    };
    '$watch': (o: any, cb: (n: any, o: any) => void, opt?: {
        'immediate'?: boolean;
        'deep'?: boolean;
    }) => void;

    [key: string]: any;
}

export interface IVNode {
    'children': {
        'default': undefined | (() => IVNode[]);
        [key: string]: undefined | (() => IVNode[]);
    } & IVNode[];
    'props': Record<string, any>;
    'type': symbol | Record<string, any>;

    [key: string]: any;
}

/** --- 方向类型，从左上开始 --- */
export type TDomBorder = 'lt' | 't' | 'tr' | 'r' | 'rb' | 'b' | 'bl' | 'l' | '';

/** --- 绑定鼠标事件选项 --- */
export interface IBindDownOptions<T extends MouseEvent | TouchEvent> {
    'down'?: (e: T) => void;
    'start'?: (e: T) => any;
    'move'?: (
        e: T,
        dir: 'top' | 'right' | 'bottom' | 'left'
    ) => any;
    'up'?: (e: T) => void | Promise<void>;
    'end'?: (e: T) => void | Promise<void>;
}

/** --- Dialog 选项 --- */
export interface IDialogOptions {
    'title'?: string;
    /** --- 支持 html --- */
    'content': string;
    'buttons'?: string[];

    'select'?: (button: string) => undefined | boolean | Promise<undefined | boolean>;
}

/** --- Confirm 选项 --- */
export interface IConfirmOptions {
    'title'?: string;
    /** --- 支持 html --- */
    'content': string;
    /** --- 是否显示取消按钮，默认不显示 --- */
    'cancel'?: boolean;
}

// --- Custom Event Control ---

interface ICustomEvent {
    'go': boolean;
    preventDefault: () => void;
}

// --- Text Control ---

export interface ITextBeforechangeEvent extends ICustomEvent {
    'detail': {
        'value': string;
        'change'?: string;
    };
}

// --- Dlist Control ---

export interface IDlistChangedEvent {
    'detail': {
        'value': string;
        'index': number;
        'label': string;
    };
}

// --- Select Control ---

export interface ISelectChangedEvent {
    'detail': {
        'value': string;
        'index': number;
        'label': string;
    };
}

// --- Switch Control ---

export interface ISwitchChangeEvent extends ICustomEvent {
    'detail': {
        'value': boolean;
    };
}

// --- Date Control ---

export interface IDateChangedEvent {
    'detail': {
        'value'?: number;
    };
}

// --- Datepanel Control ---

export interface IDatepanelRangeEvent extends ICustomEvent {
    'detail': {
        'start': number;
        'end': number;
    };
}

export interface IDatepanelChangedEvent {
    'detail': {
        'value'?: number;
    };
}

export interface IDatepanelSelectedEvent {
    'detail': {
        'time': number;
        'date': number;
        'month': number;
        'year': number;
        'day': number;
        'str': string;
    };
}

// --------------------------
// -------- tool lib --------
// --------------------------

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
