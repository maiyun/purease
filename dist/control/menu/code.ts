import * as lControl from '../../control.js';

export const code = {
    'template': '',
    mounted: function(this: lControl.IControlVue) {
        if (this.$parent?.menuCount === undefined) {
            return;
        }
        ++this.$parent.menuCount;
    },
    unmounted: async function(this: lControl.IControlVue) {
        await this.$nextTick();
        if (this.$parent?.menuCount === undefined) {
            return;
        }
        --this.$parent.menuCount;
    }
};
