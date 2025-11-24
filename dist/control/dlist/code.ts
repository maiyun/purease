import * as purease from '../../purease.js';
import * as lControl from '../../control';

export interface IDlistVue extends purease.IVue {
    /** --- 当前选中的值 --- */
    'modelValue': string;
    /** --- 数据列表，默认空数组 --- */
    'data': Array<Record<string, any>> | string[];
    /** --- 是否朴素模式，默认 false --- */
    'plain': boolean;
    /** --- 字段映射，包含 label, value, children, title --- */
    'map': Record<string, string>;
    /** --- 是否多选，默认 false --- */
    'multi': boolean;
    /** --- 内部选中值 --- */
    'value': string;
    /** --- 映射计算属性 --- */
    'mapComp': {
        'label': string;
        'value': string;
        'children': string;
        'title': string;
    };
    /** --- 点击事件 --- */
    click: (i: number) => void;
}

export const code = {
    'template': '',
    'props': {
        'modelValue': {
            'default': ''
        },
        'data': {
            'default': []
        },
        'plain': {
            'default': false
        },
        /** --- label, value, children, title --- */
        'map': {
            'default': {}
        },
        'multi': {
            'default': false
        },
    },
    'emits': {
        'changed': null,
        'update:modelValue': null,
        'click': null,
    },
    'computed': {
        /** --- 初始化后的 map 对象 --- */
        mapComp: function(this: IDlistVue): {
            'label': string;
            'value': string;
            'children': string;
            'title': string;
        } {
            return {
                'children': this.map.children ?? 'children',
                'label': this.map.label ?? 'label',
                'value': this.map.value ?? 'value',
                'title': this.map.title ?? 'title',
            };
        }
    },
    'methods': {
        click: function(this: IDlistVue, i: number) {
            const item = this.data[i];
            this.value = typeof item === 'string' ? item : (item[this.mapComp.value] ?? item[this.mapComp.label]);
            this.$emit('update:modelValue', this.value);
            const event: lControl.IDlistChangedEvent = {
                'detail': {
                    'value': this.value,
                    'index': i,
                    'label': typeof item === 'string' ? item : (item[this.mapComp.label] ?? item[this.mapComp.value])
                }
            };
            this.$emit('changed', event);
            this.$emit('click', event);
        },
        refreshModelValue: function(this: IDlistVue) {
            let found = false;
            for (const item of this.data) {
                const val = typeof item === 'string' ? item : (item[this.mapComp.value] ?? item[this.mapComp.label]);
                if (val !== this.value) {
                    continue;
                }
                found = true;
                break;
            }
            if (found) {
                return;
            }
            if (!this.data[0]) {
                if (this.value !== '') {
                    this.value = '';
                    this.$emit('update:modelValue', '');
                    const event: lControl.IDlistChangedEvent = {
                        'detail': {
                            'value': '',
                            'index': -1,
                            'label': ''
                        }
                    };
                    this.$emit('changed', event);
                }
                return;
            }
            const fitem = this.data[0];
            this.value = typeof fitem === 'string' ? fitem : (fitem[this.mapComp.value] ?? fitem[this.mapComp.label]);
            const lab = typeof fitem === 'string' ? fitem : (fitem[this.mapComp.label] ?? fitem[this.mapComp.value]);
            this.$emit('update:modelValue', this.value);
            const event: lControl.IDlistChangedEvent = {
                'detail': {
                    'value': this.value,
                    'index': 0,
                    'label': lab
                }
            };
            this.$emit('changed', event);
        }
    },
    'data': function() {
        return {
            /** --- 当前选定的值 --- */
            'value': '',
            /** --- 语言包 --- */
            'localeData': {
                'en': {
                    'empty': 'Empty',
                },
                'sc': {
                    'empty': '空',
                },
                'tc': {
                    'empty': '空',
                },
                'ja': {
                    'empty': '空っぽ',
                },
                'ko': {
                    'empty': '비어 있음',
                },
                'th': {
                    'empty': 'ว่างเปล่า',
                },
                'es': {
                    'empty': 'Vacío',
                },
                'de': {
                    'empty': 'Leer',
                },
                'fr': {
                    'empty': 'Vide',
                },
                'pt': {
                    'empty': 'Vazio',
                },
                'ru': {
                    'empty': 'Пусто',
                },
                'vi': {
                    'empty': 'Trống',
                },
                'ar': {
                    'empty': 'فارغ',
                },
                'id': {
                    'empty': 'Kosong',
                },
                'it': {
                    'empty': 'Vuoto',
                },
                'tr': {
                    'empty': 'Boş',
                }
            }
        };
    },
    'mounted': function(this: IDlistVue) {
        this.$watch('modelValue', () => {
            if (this.value && (this.value === this.$props.modelValue)) {
                return;
            }
            this.value = this.$props.modelValue;
            this.refreshModelValue();
        }, {
            'immediate': true
        });
        this.$watch('data', () => {
            if (this.value !== this.$props.modelValue) {
                this.value = this.$props.modelValue;
            }
            this.refreshModelValue();
        }, {
            'deep': true
        });
    },
};
