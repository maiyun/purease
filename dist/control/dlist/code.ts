import * as lControl from '../../control.js';
import * as purease from '../../purease.js';

/** --- dlist 数据项类型 --- */
type TDlistItem = Record<string, any> | string;

/** --- dlist 扁平化后的数据项 --- */
interface IFlatItem {
    'item': TDlistItem;
    'level': number;
    'path': number[];
}

/** --- dlist 字段映射类型 --- */
interface IMapComp {
    'label': string;
    'value': string;
    'children': string;
    'title': string;
}

export interface IDlistVue extends lControl.IControlVue {
    /** --- 当前选中的值 --- */
    'modelValue': string;
    /** --- 数据列表，默认空数组 --- */
    'data': TDlistItem[];
    /** --- 是否朴素模式，默认 false --- */
    'plain': boolean;
    /** --- 字段映射，包含 label, value, children, title --- */
    'map': Record<string, string>;
    /** --- 是否树形模式，默认 false，为 true 时支持展开折叠 --- */
    'tree': boolean;
    /** --- 内部选中值 --- */
    'value': string;
    /** --- 展开的路径集合 --- */
    'expandedPaths': Record<string, boolean>;
    /** --- 映射计算属性 --- */
    'mapComp': IMapComp;
    /** --- 扁平化后的数据列表 --- */
    'flatData': IFlatItem[];

    /** --- 获取项的 value --- */
    getItemValue: (item: TDlistItem) => string;
    /** --- 获取项的 label --- */
    getItemLabel: (item: TDlistItem) => string;
    /** --- 按下事件 --- */
    down: (i: number) => void;
    /** --- 递归扁平化数据 --- */
    flattenData: (data: TDlistItem[], level: number, path: number[]) => IFlatItem[];
    /** --- 切换展开状态 --- */
    toggleExpand: (path: number[]) => void;
    /** --- 判断路径是否展开 --- */
    isExpanded: (path: number[]) => boolean;
    /** --- 判断项是否有子节点 --- */
    hasChildren: (item: TDlistItem) => boolean;
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
        'tree': {
            'default': false
        },
    },
    'emits': {
        'changed': null,
        'update:modelValue': null,
        'tap': null,
    },
    'computed': {
        /** --- 初始化后的 map 对象 --- */
        mapComp: function(this: IDlistVue): IMapComp {
            return {
                'label': this.map.label ?? 'label',
                'value': this.map.value ?? 'value',
                'children': this.map.children ?? 'children',
                'title': this.map.title ?? 'title',
            };
        },
        /** --- 扁平化后的数据列表 --- */
        flatData: function(this: IDlistVue): IFlatItem[] {
            return this.flattenData(this.data, 0, []);
        }
    },
    'methods': {
        /** --- 获取项的 value --- */
        getItemValue: function(this: IDlistVue, item: TDlistItem): string {
            return typeof item === 'string' ? item : (item[this.mapComp.value] ?? item[this.mapComp.label]);
        },
        /** --- 获取项的 label --- */
        getItemLabel: function(this: IDlistVue, item: TDlistItem): string {
            return typeof item === 'string' ? item : (item[this.mapComp.label] ?? item[this.mapComp.value]);
        },
        down: function(this: IDlistVue, oe: PointerEvent, i: number) {
            purease.pointer.click(oe, () => {
                const flatItem = this.flatData[i];
                if (!flatItem) {
                    return;
                }
                this.value = this.getItemValue(flatItem.item);
                this.$emit('update:modelValue', this.value);
                const event: lControl.IDlistChangedEvent = {
                    'detail': {
                        'value': this.value,
                        'index': i,
                        'label': this.getItemLabel(flatItem.item)
                    }
                };
                this.$emit('changed', event);
                this.$emit('tap', event);
            });
        },
        /** --- 递归扁平化数据 --- */
        flattenData: function(this: IDlistVue, data: TDlistItem[], level: number, path: number[]): IFlatItem[] {
            const result: IFlatItem[] = [];
            for (let i = 0; i < data.length; ++i) {
                const item = data[i];
                const currentPath = [...path, i];
                result.push({
                    'item': item,
                    'level': level,
                    'path': currentPath
                });
                if (this.hasChildren(item)) {
                    if (!this.propBoolean('tree') || this.isExpanded(currentPath)) {
                        const itemObj = item as Record<string, any>;
                        const children = this.flattenData(itemObj[this.mapComp.children], level + 1, currentPath);
                        result.push(...children);
                    }
                }
            }
            return result;
        },
        /** --- 切换展开状态 --- */
        toggleExpand: function(this: IDlistVue, path: number[]) {
            const pathKey = path.join('-');
            if (this.expandedPaths[pathKey]) {
                delete this.expandedPaths[pathKey];
            }
            else {
                this.expandedPaths[pathKey] = true;
            }
        },
        /** --- 判断路径是否展开 --- */
        isExpanded: function(this: IDlistVue, path: number[]): boolean {
            return !!this.expandedPaths[path.join('-')];
        },
        /** --- 判断项是否有子节点 --- */
        hasChildren: function(this: IDlistVue, item: TDlistItem): boolean {
            if (typeof item === 'string') {
                return false;
            }
            const children = item[this.mapComp.children];
            return Array.isArray(children) && children.length > 0;
        },
        refreshModelValue: function(this: IDlistVue) {
            // --- 查找当前值是否存在于列表中 ---
            const found = this.flatData.some(flatItem => this.getItemValue(flatItem.item) === this.value);
            if (found) {
                return;
            }
            // --- 未找到，重置为第一项或空 ---
            const firstItem = this.flatData[0];
            if (!firstItem) {
                if (this.value !== '') {
                    this.value = '';
                    this.$emit('update:modelValue', '');
                    this.$emit('changed', {
                        'detail': { 'value': '', 'index': -1, 'label': '' }
                    } as lControl.IDlistChangedEvent);
                }
                return;
            }
            this.value = this.getItemValue(firstItem.item);
            this.$emit('update:modelValue', this.value);
            this.$emit('changed', {
                'detail': {
                    'value': this.value,
                    'index': 0,
                    'label': this.getItemLabel(firstItem.item)
                }
            } as lControl.IDlistChangedEvent);
        }
    },
    'data': function() {
        return {
            /** --- 当前选定的值 --- */
            'value': '',
            /** --- 展开的路径集合 --- */
            'expandedPaths': {},
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
