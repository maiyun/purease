import * as lTool from '../../tool';
import * as lControl from '../../control.js';
import * as purease from '../../purease.js';

export interface IUploaderVue extends lControl.IControlVue {
    /** --- 是否禁用，默认 false --- */
    'disabled': boolean;
    /** --- 最大数量，默认 6 --- */
    'length': number;
    /** --- 是否可拖拽排序，默认 false --- */
    'drag': boolean;
    /** --- 图像前缀 URL，默认空 --- */
    'pre': string;
    /** --- 是否可多选，默认 false --- */
    'multi': boolean;
    /** --- 上传进度（0-100），undefined 表示不显示 --- */
    'progress'?: number;
    /** --- 已上传列表 --- */
    'modelValue': Array<string | {
        'title'?: string;
        'src': string;
    }>;
    /** --- 随机标识符，用于拖拽 --- */
    'rand': string;
    /** --- 点击选择按钮 --- */
    select: () => void;
    /** --- 拖拽按下 --- */
    down: (e: PointerEvent, index: number) => void;
    /** --- 拖拽放下 --- */
    drop: (e: CustomEvent, index: number) => void;
    /** --- 移除项 --- */
    remove: (index: number) => void;
}

export const code = {
    'template': '',
    'emits': {
        'select': null,
        'remove': null,
        'changed': null,
        'update:modelValue': null
    },
    'props': {
        'disabled': {
            'default': false
        },
        'length': {
            'default': 6
        },
        'drag': {
            'default': false
        },
        'pre': {
            'default': ''
        },
        'multi': {
            'default': false
        },
        'progress': {
            'default': undefined
        },
        'modelValue': {
            'default': []
        }
    },
    'data': function() {
        return {
            'rand': ''
        };
    },
    'methods': {
        /**
         * --- 发出 select 事件 ---
         */
        select: function(this: IUploaderVue): void {
            if (this.propBoolean('disabled')) {
                return;
            }
            if (this.progress !== undefined) {
                return;
            }
            this.$emit('select');
        },
        /**
         * --- 拖拽按下事件 ---
         * @param e 事件对象
         * @param index 当前项索引
         */
        down: function(this: IUploaderVue, e: PointerEvent, index: number): void {
            purease.pointer.drag(e, (e.currentTarget as HTMLElement).parentNode?.parentNode as HTMLElement, {
                'data': {
                    'index': index,
                    'rand': this.rand
                }
            });
        },
        /**
         * --- 拖拽放下事件 ---
         * @param e 事件对象
         * @param index 目标索引
         */
        drop: function(this: IUploaderVue, e: CustomEvent, index: number): void {
            if (typeof e.detail.value !== 'object') {
                return;
            }
            if (e.detail.value.rand !== this.rand) {
                return;
            }
            const fromIndex = e.detail.value.index;
            if (fromIndex === index) {
                return;
            }
            // --- 移动项 ---
            const list = [...this.modelValue];
            const [moved] = list.splice(fromIndex, 1);
            list.splice(index, 0, moved);
            this.$emit('update:modelValue', list);
            this.$emit('changed');
        },
        /**
         * --- 移除项 ---
         * @param index 索引
         */
        remove: function(this: IUploaderVue, index: number): void {
            const event: lControl.IUploaderRemoveEvent = {
                'go': true,
                preventDefault: function() {
                    this.go = false;
                },
                'detail': {
                    'index': index,
                }
            };
            this.$emit('remove', event);
            if (!event.go) {
                return;
            }
            const list = [...this.modelValue];
            list.splice(index, 1);
            this.$emit('update:modelValue', list);
            this.$emit('changed');
        }
    },
    'mounted': function(this: IUploaderVue): void {
        this.rand = lTool.random(16);
    }
};
