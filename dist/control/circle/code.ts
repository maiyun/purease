import * as purease from '../../purease.js';

export interface ICircleVue extends purease.IVue {
    /** --- 类型，默认 default --- */
    'type': 'default' | 'primary' | 'info' | 'warning' | 'danger' | 'pe';
    /** --- 是否朴素模式，默认 false --- */
    'plain': boolean;
    /** --- 尺寸，默认 xxs --- */
    'size': 'l' | 'm' | 's' | 'xs' | 'xxs';
}

export const code = {
    'template': '',
    'props': {
        /** ---  'default' | 'primary' | 'info' | 'warning' | 'danger' | 'pe' --- */
        'type': {
            'default': 'default',
        },
        'plain': {
            'default': false,
        },
        /** --- 'l'| 'm' | 's' | 'xs' | 'xxs' --- */
        'size': {
            'default': 'xxs',
        },
    },
};
