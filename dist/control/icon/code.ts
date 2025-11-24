import * as purease from '../../purease.js';

export interface IIconVue extends purease.IVue {
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
