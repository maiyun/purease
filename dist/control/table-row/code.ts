import * as dom from '../../dom';
import * as types from '../../../types';

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
        'isAdaption': function(this: types.IVue) {
            return this.table?.propBoolean('adaption') ?? false;
        },
    },
    'methods': {
        updateHeadCount: function(this: types.IVue, o: '+' | '-') {
            if (o === '+') {
                ++this.headCount;
            }
            else {
                --this.headCount;
            }
            this.table ??= this.parentByName('table');
            if (this.index === -1) {
                this.index = dom.index(this.$el);
            }
            // --- 一些参数 ---
            if (this.table) {
                this.table.headCount = this.headCount;
            }
        }
    },
    mounted: function(this: types.IVue) {
        const table = this.parentByName('table');
        if (table) {
            this.table = table;
        }
    }
};
