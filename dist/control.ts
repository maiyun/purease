import * as index from './index';

export const list: Record<string, any> = {
    'pe-header': {
        'template': '<div class="pe-header">' +
            '<a class="pe-logo" :href="logoHref"></a>' +
            `<div class="pe-nav" :class="[headerPop&&'pe-show']">` +
                '<div class="pe-nav-left">' +
                    '<slot></slot>' +
                '</div>' +
                '<div class="pe-nav-right">' +
                    '<slot name="right"></slot>' +
                '</div>' +
            '</div>' +
            '<svg v-if="headerPop" @click="headerPop=false" class="pe-header-control" viewBox="0 0 24 24" fill="none"><path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke-width="1.5" stroke-linecap="round"/><path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke-width="1.5" stroke-linecap="round"/></svg>' +
            '<svg v-else @click="headerPop=true" class="pe-header-control" viewBox="0 0 24 24" fill="none"><path d="M4 7L7 7M20 7L11 7" stroke-width="1.5" stroke-linecap="round"/><path d="M20 17H17M4 17L13 17" stroke-width="1.5" stroke-linecap="round"/><path d="M4 12H7L20 12" stroke-width="1.5" stroke-linecap="round"/></svg>' +
        '</div>',
        'props': {
            'logoHref': {
                'default': ''
            }
        },
        'computed': {
            'headerPop': {
                get: function() {
                    return index.global.headerPop;
                },
                set: function(v: boolean) {
                    index.global.headerPop = v;
                }
            }
        },
        'emits': {},

        'data': function() {
            return {

            };
        },
        'methods': {

        }
    },
    'pe-header-item': {
        'props': {
            'href': {
                'default': undefined
            }
        },
        'data': function() {
            return {
                'menuCount': 0
            };
        },
        'template': `<a class="pe-header-item" :href="href" :class="[menuCount&&'pe-list']">` +
            '<slot></slot>' +
        '</a>'
    },
    'pe-menu': {
        'template': '<div class="pe-menu">' +
            '<slot></slot>' +
        '</div>',
        mounted: function() {
            if (this.$parent.menuCount === undefined) {
                return;
            }
            ++this.$parent.menuCount;
        },
        unmounted: async function() {
            await this.$nextTick();
            if (this.$parent.menuCount === undefined) {
                return;
            }
            --this.$parent.menuCount;
        }
    },
    'pe-menu-item': {
        'props': {
            'href': {
                'default': undefined
            }
        },
        'template': '<a class="pe-menu-item" :href="href">' +
            '<slot></slot>' +
        '</a>',
    },
    'pe-banner': {
        'template': '<div class="pe-banner">' +
            '<div class="pe-banner-content">' +
                '<slot></slot>' +
            '</div>' +
        '</div>'
    },
    'pe-footer': {
        'template': '<div class="pe-footer">' +
            '<div class="pe-footer-content">' +
                '<slot></slot>' +
            '</div>' +
            `<div v-if="$slots['bottom']" class="pe-footer-bottom">` +
                '<slot name="bottom"></slot>' +
            '</div>' +
        '</div>'
    },
    'pe-group': {
        'template': `<div class="pe-group" :class="[$slots['title']&&'pe-hastitle']">` +
            `<div v-if="$slots['title']" class="pe-group-title">` +
                '<slot name="title"></slot>' +
            '</div>' +
            '<div class="pe-group-content">' +
                '<slot></slot>' +
            '</div>' +
            `<div v-if="$slots['bottom']" class="pe-group-bottom">` +
                '<slot name="bottom"></slot>' +
            '</div>' +
        '</div>'
    }
};
