import * as purease from '../../purease.js';
import * as lDom from '../../dom.js';

export interface ISettingItemVue extends purease.IVue {
    /** --- 类型 --- */
    'type': string;
    /** --- 布局方向，默认 h --- */
    'direction': 'h' | 'v';
    /** --- 是否显示箭头，默认 false --- */
    'arrow': boolean;
    /** --- 标记内容 --- */
    'mark': string;
    /** --- 右侧间距 --- */
    'gap': string;
    /** --- 水平对齐方式 --- */
    'alignH': string | undefined;
    /** --- 垂直对齐方式，默认 center --- */
    'alignV': string;
    /** --- 是否无内边距，默认 false --- */
    'nopadding': boolean;
    /** --- 是否无间距，默认 false --- */
    'nogap': boolean;
    /** --- 标题 --- */
    'title': string;
    /** --- 备注 --- */
    'note': string;
    /** --- 鼠标进入事件处理 --- */
    enter: (e: MouseEvent | TouchEvent) => void;
    /** --- 鼠标离开事件处理 --- */
    leave: (e: MouseEvent | TouchEvent) => void;
}

export const code = {
    'template': '',
    'props': {
        'type': {
            'default': ''
        },
        'direction': {
            'default': 'h'
        },
        'arrow': {
            'default': false
        },
        'mark': {
            'default': ''
        },
        // --- 右侧间距 gap ---
        'gap': {
            'default': ''
        },
        'alignH': {
            'default': undefined
        },
        'alignV': {
            'default': 'center'
        },
        'nopadding': {
            'default': false
        },
        // --- 顶层的默认 gap 去除 ---
        'nogap': {
            'default': false
        },

        'title': {
            'default': ''
        },
        'note': {
            'default': ''
        },
    },
    'methods': {
        enter: function(this: ISettingItemVue, e: MouseEvent | TouchEvent) {
            if (lDom.hasTouchButMouse(e)) {
                return;
            }
            this.$el.classList.add('pe-hover');
        },
        leave: function(this: ISettingItemVue, e: MouseEvent | TouchEvent) {
            if (lDom.hasTouchButMouse(e)) {
                return;
            }
            this.$el.classList.remove('pe-hover');
        },
    },
};
