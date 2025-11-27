import * as purease from '../../purease.js';

export interface IDrawerVue extends purease.IVue {
    /** --- 是否显示，默认 false --- */
    'modelValue': boolean;
    /** --- 标题，默认空 --- */
    'title': string;
    /** --- 宽度，默认 35% --- */
    'width': string | number;
    /** --- 布局方向，默认 h --- */
    'direction': 'h' | 'v';
    /** --- 间隔 --- */
    'gutter': string;
    /** --- 水平对齐 --- */
    'alignH': string | undefined;
    /** --- 垂直对齐 --- */
    'alignV': string | undefined;
    /** --- 宽度计算属性 --- */
    'widthComp': string;
    /** --- 关闭按钮点击 --- */
    closeClick: () => void;
    /** --- 点击事件 --- */
    click: (e: MouseEvent) => void;
}

export const code = {
    'template': '',
    'props': {
        'modelValue': {
            'default': false
        },
        'title': {
            'default': '',
        },
        'width': {
            'default': '35%',
        },

        'direction': {
            'default': 'h',
        },
        'gutter': {
            'default': '',
        },
        'alignH': {
            'default': undefined,
        },
        'alignV': {
            'default': undefined
        }
    },
    'computed': {
        widthComp: function(this: IDrawerVue) {
            if (typeof this.$props.width === 'number') {
                return this.$props.width.toString() + 'px';
            }
            return this.$props.width;
        }
    },
    'methods': {
        /** --- 关闭按钮 --- */
        closeClick: function(this: IDrawerVue) {
            this.$emit('update:modelValue', false);
        },
        click: function(this: IDrawerVue, e: MouseEvent): void {
            if (e.target !== this.$el) {
                return;
            }
            this.$emit('update:modelValue', false);
        }
    }
};
