import * as lControl from '../../control.js';

export interface ICollapseVue extends lControl.IControlVue {
    /** --- 当前展开的面板，支持数组（手风琴模式为单值） --- */
    'modelValue': string | string[];
    /** --- 是否手风琴模式，默认 false --- */
    'accordion': boolean;
    /** --- 内部展开状态 --- */
    'activeNames': string[];

    /** --- 更新展开状态 --- */
    updateActiveNames: (name: string, expanded: boolean) => void;
    /** --- 判断面板是否展开 --- */
    isActive: (name: string) => boolean;
}

export const code = {
    'template': '',
    'props': {
        'modelValue': {
            'default': () => ([])
        },
        'accordion': {
            'default': false
        }
    },
    'emits': {
        'update:modelValue': null,
        'change': null
    },
    'data': function() {
        return {
            'activeNames': [] as string[]
        };
    },
    'methods': {
        /** --- 更新展开状态 --- */
        updateActiveNames: function(this: ICollapseVue, name: string, expanded: boolean): void {
            if (this.propBoolean('accordion')) {
                // --- 手风琴模式：只能展开一个 ---
                if (expanded) {
                    this.activeNames = [name];
                }
                else {
                    this.activeNames = [];
                }
            }
            else {
                // --- 非手风琴模式：可展开多个 ---
                if (expanded) {
                    if (!this.activeNames.includes(name)) {
                        this.activeNames.push(name);
                    }
                }
                else {
                    const index = this.activeNames.indexOf(name);
                    if (index > -1) {
                        this.activeNames.splice(index, 1);
                    }
                }
            }
            // --- 触发更新 ---
            const value = this.propBoolean('accordion') ? (this.activeNames[0] ?? '') : [...this.activeNames];
            this.$emit('update:modelValue', value);
            this.$emit('change', { 'detail': { 'value': value } });
        },
        /** --- 判断面板是否展开 --- */
        isActive: function(this: ICollapseVue, name: string): boolean {
            return this.activeNames.includes(name);
        }
    },
    'watch': {
        'modelValue': {
            handler: function(this: ICollapseVue): void {
                const val = this.$props.modelValue;
                if (Array.isArray(val)) {
                    this.activeNames = [...val];
                }
                else if (typeof val === 'string' && val) {
                    this.activeNames = [val];
                }
                else {
                    this.activeNames = [];
                }
            },
            'immediate': true
        }
    }
};
