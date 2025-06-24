import * as types from '../../../types';

export const code = {
    'template': '',
    mounted: function(this: types.IVue) {
        const row = this.parentByName('table-row');
        if (row) {
            row.updateHeadCount('+');
        }
    },
    unmounted: function(this: types.IVue) {
        const row = this.parentByName('table-row');
        if (row) {
            row.updateHeadCount('-');
        }
    }
};
