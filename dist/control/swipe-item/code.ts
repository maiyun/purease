import * as tool from '../../tool';
import * as dom from '../../dom';
import * as types from '../../../types';

export const code = {
    'template': '',
    'props': {
        'direction': {
            'default': 'h'
        }
    },
    'data': function() {
        return {
            'index': 0
        };
    },
    'computed': {
        /** --- 当前 item 应该在第几页显示 --- */
        npage: function(this: types.IVue) {
            if (!this.$parent) {
                return 0;
            }
            return Math.floor(this.index / this.$parent.pitem);
        },
        /** --- 当前 item 在当前页的 index --- */
        pindex: function(this: types.IVue) {
            if (!this.$parent) {
                return 0;
            }
            return this.index % this.$parent.pitem;
        },
        left: function(this: types.IVue): string {
            if (!this.$parent) {
                return '0';
            }
            const gutter = tool.getNumber(this.$parent.$props.gutter);
            let left = this.width * this.npage + (this.npage * gutter);
            if (this.translate > 0) {
                if (this.npage === this.$parent.pageCount - 1) {
                    // --- 最后页显示在最前面 ---
                    left = -this.width - gutter;
                }
            }
            else if (this.translate < -this.awidth + this.width) {
                if (this.npage === 0) {
                    // --- 当前是第一个页面要显示在最后 ---
                    left = this.awidth + gutter;
                }
            }
            // --- 单页偏移 ---
            if (this.pindex > 0) {
                return 'calc(' + (left + (gutter * this.pindex)) + 'px + ' + this.iwidth + ' * ' + this.pindex + ')';
            }
            return left + 'px';
        },
        // --- 一个页面的宽度 ---
        width: function(this: types.IVue) {
            if (!this.$parent) {
                return 0;
            }
            return this.$parent.width;
        },
        // --- 总宽度 ---
        awidth: function(this: types.IVue) {
            if (!this.$parent) {
                return 0;
            }
            return this.$parent.awidth;
        },
        // --- 当前 item 应该的宽度百分比 ---
        iwidth: function(this: types.IVue) {
            if (!this.$parent) {
                return '100%';
            }
            return this.$parent.iwidth;
        },
        translate: function(this: types.IVue) {
            if (!this.$parent) {
                return 0;
            }
            return this.$parent.translate;
        }
    },
    mounted: function(this: types.IVue) {
        if (!this.$parent) {
            return;
        }
        if (this.$parent.itemCount === undefined) {
            return;
        }
        ++this.$parent.itemCount;
        this.index = dom.index(this.$el);
    },
    unmounted: async function(this: types.IVue) {
        await this.$nextTick();
        if (!this.$parent) {
            return;
        }
        if (this.$parent.itemCount === undefined) {
            return;
        }
        --this.$parent.itemCount;
    }
};
