import * as lDom from '../../dom';
import * as purease from '../../purease.js';

export interface ITabItemVue extends purease.IVue {
    /** --- 当前 item 索引 --- */
    'index': number;
    /** --- 是否被选中 --- */
    'isSelected': boolean;
    /** --- 鼠标悬停事件 --- */
    hover: (e: MouseEvent | TouchEvent) => void;
    /** --- 点击事件 --- */
    click: () => void;
    /** --- 窗口大小改变事件 --- */
    resize: () => void;
}

export const code = {
    'template': '',
    'data': function() {
        return {
            'index': 0
        };
    },
    'computed': {
        isSelected: function(this: ITabItemVue) {
            if (!this.$parent) {
                return 0;
            }
            return this.$parent.selected === this.index;
        }
    },
    'methods': {
        hover: function(this: ITabItemVue, e: MouseEvent | TouchEvent) {
            if (!this.$parent) {
                return;
            }
            if (lDom.hasTouchButMouse(e)) {
                return;
            }
            if (!this.$parent.propBoolean('hover')) {
                return;
            }
            this.$parent.selected = this.index;
            this.resize();
        },
        click: function(this: ITabItemVue) {
            if (!this.$parent) {
                return;
            }
            if (this.$parent.propBoolean('hover')) {
                return;
            }
            this.$parent.selected = this.index;
            this.resize();
        },
        resize: function(this: ITabItemVue) {
            if (!this.$parent) {
                return;
            }
            if (this.$parent.type !== 'rect') {
                return;
            }
            this.$parent.tabItemWidth = this.$el.offsetWidth;
            this.$parent.tabItemLeft = this.$el.offsetLeft;
        }
    },
    mounted: function(this: ITabItemVue) {
        if (!this.$parent) {
            return;
        }
        if (this.$parent.selected === undefined) {
            return;
        }
        this.index = lDom.index(this.$el);
        if (this.index === this.$parent.selected) {
            this.resize();
        }
    },
};
