import * as lControl from '../../control.js';

export interface IIconVue extends lControl.IControlVue {
    /** --- 图标名称，默认 link --- */
    'name': string;
}

export const code = {
    'template': '',
    'props': {
        'name': {
            'default': 'link'
        }
    }
};
