import * as lDom from '../../dom';
import * as purease from '../../purease.js';

export interface IBarItemVue extends purease.IVue {
    /** --- 链接地址 --- */
    'href': string | undefined;
    /** --- 菜单数量 --- */
    'menuCount': number;
    /** --- 是否悬浮 --- */
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
        enter: function(this: IBarItemVue, e: MouseEvent | TouchEvent) {
            if (lDom.hasTouchButMouse(e)) {
                return;
            }
            const target = e.target as HTMLElement;
            if (target.classList.contains('pe-menu') || lDom.findParentByClass(target, 'pe-menu')) {
                return;
            }
            if (!this.href) {
                e.preventDefault();
            }
            this.hover = !this.hover;
        },
        leave: function(this: IBarItemVue, e: MouseEvent | TouchEvent) {
            if (lDom.hasTouchButMouse(e)) {
                return;
            }
            this.hover = false;
        },
    },
};
