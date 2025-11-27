import * as purease from '../../purease.js';

export const code = {
    'template': '',
    mounted: function(this: purease.IVue) {
        const row = this.parentByName('table-row');
        if (row) {
            row.updateHeadCount('+');
        }
    },
    unmounted: function(this: purease.IVue) {
        const row = this.parentByName('table-row');
        if (row) {
            row.updateHeadCount('-');
        }
    }
};
