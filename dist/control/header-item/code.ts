import * as lDom from '../../dom';
import * as lControl from '../../control.js';

export interface IHeaderItemVue extends lControl.IControlVue {
    /** --- 链接地址 --- */
    'href': string | undefined;
    /** --- 菜单数量 --- */
    'menuCount': number;
    /** --- 悬停状态 --- */
    'hover': boolean;
    /** --- 鼠标进入事件 --- */
    enter: (e: MouseEvent | TouchEvent) => void;
    /** --- 鼠标离开事件 --- */
    leave: (e: MouseEvent | TouchEvent) => void;
}

export const code = {
    'template': '',
    'props': {
        'href': {
            'default': undefined
        }
    },
    'data': function() {
        return {
            'menuCount': 0,
            'hover': false,
        };
    },
    'methods': {
        enter: function(this: IHeaderItemVue, e: MouseEvent | TouchEvent) {
            if ('ontouchstart' in window) {
                return;
            }
            // --- 只有可能非触摸屏 ---
            const target = e.target as HTMLElement;
            if (target.classList.contains('pe-menu') || lDom.findParentByClass(target, 'pe-menu')) {
                return;
            }
            this.hover = !this.hover;
        },
        leave: function(this: IHeaderItemVue) {
            if ('ontouchstart' in window) {
                return;
            }
            this.hover = false;
        },
        click: function(this: IHeaderItemVue, e: MouseEvent | TouchEvent) {
            // --- 仅手机端有效 ---
            if (!('ontouchstart' in window)) {
                return;
            }
            // --- 只有可能触摸屏 ---
            if (!this.href) {
                e.preventDefault();
            }
            const target = e.target as HTMLElement;
            if (target.classList.contains('pe-menu') || lDom.findParentByClass(target, 'pe-menu')) {
                return;
            }
            this.hover = !this.hover;
        },
    },
};
