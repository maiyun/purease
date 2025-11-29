import * as lControl from '../../control.js';

export const code = {
    'template': '',
    mounted: function(this: lControl.IControlVue) {
        const row = this.parentByName('table-row');
        if (row) {
            row.updateHeadCount('+');
        }
    },
    unmounted: function(this: lControl.IControlVue) {
        const row = this.parentByName('table-row');
        if (row) {
            row.updateHeadCount('-');
        }
    }
};
