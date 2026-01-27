import * as lControl from '../../control.js';

export interface ITimelineItemVue extends lControl.IControlVue {
    /** --- 内容布局方向 --- */
    'direction': 'h' | 'v';
    /** --- 子元素间距 --- */
    'gutter': number | string;
    /** --- 水平对齐方式 --- */
    'alignH': string | undefined;
    /** --- 垂直对齐方式 --- */
    'alignV': string | undefined;
    /** --- 是否选中状态 --- */
    'selected': boolean;
}

export const code = {
    'template': '',
    'props': {
        'direction': {
            'default': 'h'
        },
        'gutter': {
            'default': ''
        },
        'alignH': {
            'default': undefined
        },
        'alignV': {
            'default': undefined
        },
        'selected': {
            'default': false
        }
    },
};
