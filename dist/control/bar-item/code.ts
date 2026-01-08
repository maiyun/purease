import * as lDom from '../../dom';
import * as lControl from '../../control.js';
import * as purease from '../../purease.js';

export interface IBarItemVue extends lControl.IControlVue {
    /** --- 链接地址 --- */
    'href': string | undefined;
    /** --- 菜单数量 --- */
    'menuCount': number;
    /** --- 是否悬浮 --- */
    'hover': boolean;
    /** --- 进入事件 --- */
    enter: (e: PointerEvent) => void;
    /** --- 按下事件 --- */
    down: (e: PointerEvent) => void;
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
        enter: function(this: IBarItemVue, oe: PointerEvent) {
            if (oe.pointerType !== 'mouse') {
                return;
            }
            // --- 仅鼠标有效 ---
            purease.pointer.hover(oe, {
                enter: (e: PointerEvent) => {
                    const target = e.target as HTMLElement;
                    if (target.classList.contains('pe-menu') || lDom.findParentByClass(target, 'pe-menu')) {
                        return;
                    }
                    this.hover = true;
                },
                leave: () => {
                    this.hover = false;
                }
            });
        },
        down: function(this: IBarItemVue, oe: PointerEvent) {
            if (oe.pointerType === 'mouse') {
                return;
            }
            // --- 非鼠标有效 ---
            purease.pointer.click(oe, (e) => {
                if (!this.href) {
                    e.preventDefault();
                }
                const target = e.target as HTMLElement;
                if (target.classList.contains('pe-menu') || lDom.findParentByClass(target, 'pe-menu')) {
                    return;
                }
                this.hover = !this.hover;
            });
        },
    },
};
