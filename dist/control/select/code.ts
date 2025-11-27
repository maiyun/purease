import * as lDom from '../../dom';
import * as lControl from '../../control';
import * as purease from '../../purease.js';

export interface ISelectVue extends purease.IVue {
    /** --- 当前选中值 --- */
    'modelValue': string;
    /** --- 数据列表 --- */
    'data': Array<string | { 'label'?: string; 'value'?: string; 'disabled'?: boolean; }>;
    /** --- 是否禁用，默认 false --- */
    'disabled': boolean;
    /** --- 是否为朴素风格，默认 false --- */
    'plain': boolean;
    /** --- 是否显示搜索框，默认 false --- */
    'search': boolean;
    /** --- 显示的标签 --- */
    'label': string;
    /** --- 当前值 --- */
    'value': string;
    /** --- 搜索关键词 --- */
    'searchValue': string;
    /** --- 多语言数据 --- */
    'localeData': Record<string, Record<string, string>>;
    /** --- 打开下拉 --- */
    open: (e: MouseEvent) => void;
    /** --- 处理值改变 --- */
    onModelValue: (v: string) => void;
    /** --- 点击选项 --- */
    click: (e: lControl.IDlistClickEvent) => void;
    /** --- 格式化后的数组 --- */
    'dataComp': Array<{ 'label': string; 'value': string; 'disabled': boolean; }>;
    /** --- 搜索过滤后的数据 --- */
    'searchComp': Array<{ 'label': string; 'value': string; 'disabled': boolean; }>;
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
        'disabled': {
            'default': false
        },
        'plain': {
            'default': false
        },
        'search': {
            'default': false
        },
    },
    'emits': {
        'changed': null,
        'update:modelValue': null
    },
    'data': function() {
        return {
            'label': '',
            'value': '',
            'searchValue': '',

            /** --- 语言包 --- */
            'localeData': {
                'en': {
                    'search': 'Search'
                },
                'sc': {
                    'search': '搜索'
                },
                'tc': {
                    'search': '搜尋'
                },
                'ja': {
                    'search': '検索'
                },
                'ko': {
                    'search': '검색'
                },
                'th': {
                    'search': 'ค้นหา'
                },
                'es': {
                    'search': 'buscar'
                },
                'de': {
                    'search': 'suchen'
                },
                'fr': {
                    'search': 'rechercher'
                },
                'pt': {
                    'search': 'pesquisar'
                },
                'ru': {
                    'search': 'поиск'
                },
                'vi': {
                    'search': 'tìm kiếm'
                },
                'ar': {
                    'search': 'بحث'
                },
                'id': {
                    'search': 'Cari'
                },
                'it': {
                    'search': 'Cerca'
                },
                'tr': {
                    'search': 'Ara'
                }
            }
        };
    },
    'methods': {
        open: function(this: ISelectVue, e: MouseEvent) {
            const el = e.target as HTMLElement;
            if (!el.classList.contains('pe-select-label') && !el.classList.contains('pe-select-arrow')) {
                return;
            }
            lDom.showPop(e, this.$refs.pop);
        },
        onModelValue: function(this: ISelectVue, v: string) {
            if (this.value === v) {
                return;
            }
            this.value = v;
            for (const item of this.$props.data) {
                const val = item.value ?? item.label ?? item;
                if (val !== this.value) {
                    continue;
                }
                this.label = item.label ?? item.value ?? item;
                break;
            }
            this.$emit('update:modelValue', this.value);
        },
        click: function(this: ISelectVue, e: lControl.IDlistClickEvent) {
            this.searchValue = '';
            const event: lControl.ISelectChangedEvent = {
                'detail': {
                    'value': e.detail.value,
                    'index': e.detail.index,
                    'label': e.detail.label
                }
            };
            this.$emit('changed', event);
            lDom.hidePop(this.$refs.pop);
        },
    },
    'computed': {
        dataComp: function(this: ISelectVue) {
            const ds: Array<{
                'label': string;
                'value': string;
                'disabled': boolean;
            }> = [];
            for (const item of this.$props.data) {
                if (typeof item === 'string') {
                    ds.push({
                        'label': item,
                        'value': item,
                        'disabled': false,
                    });
                    continue;
                }
                ds.push({
                    'label': item.label ?? item.value ?? '',
                    'value': item.value ?? item.label ?? '',
                    'disabled': item.disabled ?? false,
                });
            }
            return ds;
        },
        searchComp: function(this: ISelectVue) {
            if (!this.searchValue) {
                return this.dataComp;
            }
            const ds: Array<{
                'label': string;
                'value': string;
                'disabled': boolean;
            }> = [];
            for (const item of this.dataComp) {
                let include = true;
                for (const char of this.searchValue) {
                    if (item.label.includes(char) || item.value.includes(char)) {
                        continue;
                    }
                    // --- 没包含 ---
                    include = false;
                    break;
                }
                if (include) {
                    ds.push({
                        'label': item.label,
                        'value': item.value,
                        'disabled': item.disabled
                    });
                }
            }
            return ds;
        }
    },
    'watch': {
        'modelValue': {
            handler: function(this: ISelectVue) {
                if (this.value === this.$props.modelValue) {
                    return;
                }
                this.value = this.$props.modelValue;
                for (const item of this.$props.data) {
                    const val = item.value ?? item.label ?? item;
                    if (val !== this.value) {
                        continue;
                    }
                    this.label = item.label ?? item.value ?? item;
                    break;
                }
            },
            'immediate': true
        }
    }
};
