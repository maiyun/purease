import * as types from '../../../types';

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
        widthComp: function(this: types.IVue) {
            if (typeof this.$props.width === 'number') {
                return this.$props.width.toString() + 'px';
            }
            return this.$props.width;
        }
    },
    'methods': {
        /** --- 关闭按钮 --- */
        closeClick: function(this: types.IVue) {
            this.$emit('update:modelValue', false);
        },
        click: function(this: types.IVue, e: MouseEvent): void {
            if (e.target !== this.$el) {
                return;
            }
            this.$emit('update:modelValue', false);
        }
    }
};
