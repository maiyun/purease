import * as lDom from '../../dom';
import * as purease from '../../purease.js';

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
        'isAdaption': function(this: purease.IVue) {
            return this.table?.propBoolean('adaption') ?? false;
        },
    },
    'methods': {
        updateHeadCount: function(this: purease.IVue, o: '+' | '-') {
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
    mounted: function(this: purease.IVue) {
        const table = this.parentByName('table');
        if (table) {
            this.table = table;
        }
    }
};
