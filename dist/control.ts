import * as tool from './tool';

export const list: Record<string, any> = {
    'pe-header': {
        'template': '<div class="pe-header">' +
            '<div class="logo"></div>' +
            '<div class="nav">' +
                '<div class="left">' +
                    '<slot></slot>' +
                '</div>' +
                '<div> class="right"></div>' +
            '</div>' +
        '</div>',
        'props': {},
        'emits': {},

        'data': function() {
            return {

            };
        },
        'methods': {

        },
        'computed': {

        },

        mounted: async function() {

        }
    }
};
