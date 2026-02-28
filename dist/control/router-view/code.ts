import * as purease from '../../purease.js';

export const code = {
    'template': '',
    'computed': {
        viewComponent: function(): any {
            return purease.router.current.component;
        }
    }
};
