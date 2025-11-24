import * as purease from '../../purease.js';

export const code = {
    'template': '',
    mounted: function(this: purease.IVue) {
        if (this.$parent?.menuCount === undefined) {
            return;
        }
        ++this.$parent.menuCount;
    },
    unmounted: async function(this: purease.IVue) {
        await this.$nextTick();
        if (this.$parent?.menuCount === undefined) {
            return;
        }
        --this.$parent.menuCount;
    }
};
