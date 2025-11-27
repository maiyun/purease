import * as lDom from '../../dom';
import * as purease from '../../purease.js';

export interface ITableRowVue extends purease.IVue {
    /** --- 控件名称 --- */
    'controlName': string;
    /** --- 表头数量 --- */
    'headCount': number;
    /** --- 父级 table 引用 --- */
    'table': purease.IVue | null;
    /** --- 当前行索引 --- */
    'index': number;
    /** --- 是否为标题行，默认 false --- */
    'title': boolean;
    /** --- 是否自适应布局 --- */
    'isAdaption': boolean;
    /** --- 更新表头数量 --- */
    updateHeadCount: (o: '+' | '-') => void;
}

export const code = {
    'template': '',
    'data': function() {
        return {
            'controlName': 'table-row',
            'headCount': 0,
            'table': null,
            'index': -1
        };
    },
    'props': {
        'title': {
            'default': false
        },
    },
    'computed': {
        'isAdaption': function(this: ITableRowVue) {
            return this.table?.propBoolean('adaption') ?? false;
        },
    },
    'methods': {
        updateHeadCount: function(this: ITableRowVue, o: '+' | '-') {
            if (o === '+') {
                ++this.headCount;
            }
            else {
                --this.headCount;
            }
            this.table ??= this.parentByName('table');
            if (this.index === -1) {
                this.index = lDom.index(this.$el);
            }
            // --- 一些参数 ---
            if (this.table) {
                this.table.headCount = this.headCount;
            }
        }
    },
    mounted: function(this: ITableRowVue) {
        const table = this.parentByName('table');
        if (table) {
            this.table = table;
        }
    }
};
