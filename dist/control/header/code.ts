import * as purease from '../../purease.js';

export const code = {
    'template': '',
    'props': {
        'logoHref': {
            'default': '',
        },
        'fixed': {
            'default': false,
        },
        'theme': {
            'default': 'default',
        },
        'line': {
            'default': false,
        }
    },
    'computed': {
        'headerPop': {
            get: function() {
                return purease.global.headerPop;
            },
            set: function(v: boolean) {
                purease.global.headerPop = v;
            }
        }
    }
};
