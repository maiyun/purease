import * as purease from '../../purease.js';

export const code = {
    'template': '',
    'data': function(): {
        'list': Array<{
            'id': number;
            'text': string;
            'level': string;
        }>;
        'selected': number;
    } {
        return {
            'list': [],
            'selected': -1,
        };
    },
    'methods': {
        'scrollTo': function(id: number) {
            const el = document.getElementById('anchor-' + id);
            if (!el) {
                return;
            }
            window.scrollTo({
                'top': el.offsetTop - parseInt(getComputedStyle(el).getPropertyValue('--pe-headerheight')) - 40,
                'behavior': 'smooth',
            });
        },
    },
    mounted: function(this: purease.IVue) {
        let id = -1;
        const list: NodeListOf<HTMLElement> = this.$refs.left.querySelectorAll('h2,h3,h4,h5,h6');
        for (const item of list) {
            this.list.push({
                'id': ++id,
                'text': item.textContent,
                'level': item.tagName.slice(1),
            });
            item.id = 'anchor-' + id;
        }
        // --- scroll ---
        window.addEventListener('scroll', () => {
            this.selected = -1;
            if (!list.item(0)) {
                return;
            }
            const wtop = window.scrollY;
            const headerheight = parseInt(getComputedStyle(list.item(0)).getPropertyValue('--pe-headerheight'));
            for (const item of this.list) {
                const el = list.item(item.id);
                const top = el.offsetTop;
                if (wtop < (top - headerheight - 40)) {
                    continue;
                }
                this.selected = item.id;
            }
        });
    },
};
