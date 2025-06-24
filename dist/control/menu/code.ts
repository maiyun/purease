import * as types from '../../../types';

export const code = {
    'template': '',
    mounted: function(this: types.IVue) {
        if (this.$parent?.menuCount === undefined) {
            return;
        }
        ++this.$parent.menuCount;
    },
    unmounted: async function(this: types.IVue) {
        await this.$nextTick();
        if (this.$parent?.menuCount === undefined) {
            return;
        }
        --this.$parent.menuCount;
    }
};
