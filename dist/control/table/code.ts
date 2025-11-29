import * as lControl from '../../control.js';

export interface ITableVue extends lControl.IControlVue {
    /** --- 控件名称 --- */
    'controlName': string;
    /** --- 表头数量 --- */
    'headCount': number;
    /** --- 是否自适应布局，默认 false --- */
    'adaption': boolean;
    /** --- 是否为朴素风格，默认 false --- */
    'plain': boolean;
}

export const code = {
    'template': '',
    'data': function() {
        return {
            'controlName': 'table',
            'headCount': 0,
        };
    },
    'props': {
        'adaption': {
            'default': false
        },
        'plain': {
            'default': false
        }
    },
};
