import * as purease from '../../index';

export const code = {
    'template': '',
    'props': {
        'logoHref': {
            'default': ''
        },
        'fixed': {
            'default': false
        },
        'theme': {
            'default': 'default'
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
