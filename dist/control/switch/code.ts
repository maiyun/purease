import * as purease from '../../purease.js';
import * as lControl from '../../control';

export interface ISwitchVue extends purease.IVue {
    /** --- 是否禁用，默认 false --- */
    'disabled': boolean;
    /** --- 值映射，默认 {} --- */
    'map': {
        'true'?: boolean | string | number;
        'false'?: boolean | string | number;
    };
    /** --- 当前值，默认 false --- */
    'modelValue': boolean | string | number;
    /** --- 内部值 --- */
    'value': boolean | string | number;
    /** --- 格式化后的映射 --- */
    'mapComp': {
        'true': boolean | string | number;
        'false': boolean | string | number;
    };
    /** --- 点击事件 --- */
    click: () => void;
    /** --- 键盘事件 --- */
    keydown: (e: KeyboardEvent) => void;
}

export const code = {
    'template': '',
    'emits': {
        'change': null,

        'update:modelValue': null,
    },
    'props': {
        'disabled': {
            'default': false,
        },
        'map': {
            'default': {},
        },

        'modelValue': {
            'default': false,
        }
    },
    'data': function() {
        return {
            'value': false
        };
    },
    'computed': {
        mapComp: function(this: ISwitchVue): {
            'true': boolean | string | number;
            'false': boolean | string | number;
        } {
            return {
                'true': this.map.true ?? true,
                'false': this.map.false ?? false
            };
        }
    },
    'watch': {
        'modelValue': {
            handler: function(this: ISwitchVue) {
                if (this.modelValue === undefined) {
                    return;
                }
                this.value = this.modelValue;
            },
            'immediate': true
        }
    },
    'methods': {
        click: function(this: ISwitchVue): void {
            const event: lControl.ISwitchChangeEvent = {
                'go': true,
                preventDefault: function() {
                    this.go = false;
                },
                'detail': {
                    'value': this.value
                }
            };
            this.$emit('change', event);
            if (event.go) {
                this.value = this.value === this.mapComp.true ? this.mapComp.false : this.mapComp.true;
                this.$emit('update:modelValue', this.value);
            }
        },
        keydown: function(this: ISwitchVue, e: KeyboardEvent): void {
            if (e.key !== 'Enter') {
                return;
            }
            e.preventDefault();
            this.click();
        },
    }
};
