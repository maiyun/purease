import * as lDom from '../../dom.js';
import * as lControl from '../../control.js';
import * as purease from '../../purease.js';

export interface ITabItemVue extends lControl.IControlVue {
    /** --- 当前 item 索引 --- */
    'index': number;
    /** --- 是否被选中 --- */
    'isSelected': boolean;
    /** --- 鼠标悬停事件 --- */
    hover: (e: MouseEvent | TouchEvent) => void;
    /** --- 点击事件 --- */
    click: () => void;
    /** --- 修改上层的 tabItemLeft、tabItemWidth 为本 item --- */
    resize: () => void;
}

export const code = {
    'template': '',
    'data': function() {
        return {
            'index': 0,
        };
    },
    'computed': {
        isSelected: function(this: ITabItemVue) {
            return this.$parent?.selected === this.index;
        }
    },
    'watch': {
        isRtl: async function(this: ITabItemVue) {
            if (!this.$parent) {
                return;
            }
            if (this.$parent.selected !== this.index) {
                return;
            }
            await purease.tool.sleep(34);
            this.resize();
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
        },
        click: function(this: ITabItemVue) {
            if (!this.$parent) {
                return;
            }
            if (this.$parent.propBoolean('hover')) {
                return;
            }
            this.$parent.selected = this.index;
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
        },
    },
    mounted: function(this: ITabItemVue) {
        if (!this.$parent) {
            return;
        }
        this.index = lDom.index(this.$el);
        this.$watch(() => this.$parent?.selected, () => {
            if (this.$parent?.type !== 'rect') {
                return;
            }
            if (this.index !== this.$parent.selected) {
                return;
            }
            this.resize();
        }, {
            'immediate': true,
        });
    },
};
