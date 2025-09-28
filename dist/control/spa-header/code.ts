export const code = {
    'template': '',
    'props': {
        'back': {
            'default': false,
        },
        'note': {
            'default': '',
        },
    },
    'methods': {
        backClick: function() {
            // --- 返回按钮 ---
            window.history.back();
        },
    },
};
