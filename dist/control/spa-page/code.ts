import * as purease from '../../purease';

export const code = {
    'template': '',
    'emits': ['show', 'hide'],
    'props': {
        'path': {
            'default': '',
        },
        'grey': {
            'default': false,
        },
    },
    'computed': {
        currentPath: function(this: purease.IVue) {
            return this.$parent?.path ?? '';
        },
    },
    'watch': {
        'currentPath': {
            handler: async function(this: purease.IVue, newPath: string, oldPath: string) {
                if (newPath === oldPath) {
                    return;
                }
                if (newPath === this.path) {
                    // --- 进入 ---
                    this.$el.classList.add('pe-display');
                    await purease.tool.sleep(150);
                    this.$el.classList.add('pe-show');
                    this.$emit('show', {
                        'detail': {
                            'prev': oldPath,
                            'path': newPath,
                        }
                    });
                    return;
                }
                if (oldPath === this.path) {
                    // --- 离开 ---
                    this.$el.classList.remove('pe-show');
                    await purease.tool.sleep(150);
                    this.$el.classList.remove('pe-display');
                    this.$emit('hide', {
                        'detail': {
                            'path': oldPath,
                            'next': newPath,
                        }
                    });
                    return;
                }
                // --- 没关系 ---
            },
        }
    },
    mounted: async function(this: purease.IVue) {
        await this.$nextTick();
        if (this.path !== this.currentPath) {
            return;
        }
        this.$el.classList.add('pe-display');
        await purease.tool.sleep(150);
        this.$el.classList.add('pe-show');
    },
};
