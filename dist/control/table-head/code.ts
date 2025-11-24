import * as purease from '../../purease.js';

export interface ITableHeadVue extends purease.IVue {
}

export const code = {
    'template': '',
    mounted: function(this: ITableHeadVue) {
        const row = this.parentByName('table-row');
        if (row) {
            row.updateHeadCount('+');
        }
    },
    unmounted: function(this: ITableHeadVue) {
        const row = this.parentByName('table-row');
        if (row) {
            row.updateHeadCount('-');
        }
    }
};
