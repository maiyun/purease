import * as purease from '../../purease.js';

export interface ILabelVue extends purease.IVue {
    /** --- 显示模式，默认 default --- */
    'mode': 'default' | 'tip' | 'mtip' | 'date';
    /** --- 内容文本或秒级时间戳 --- */
    'content': string | number;
    /** --- 是否显示时间，默认 true --- */
    'time': boolean;
    /** --- 是否显示日期，默认 true --- */
    'date': boolean;
    /** --- 是否显示时区，默认 false --- */
    'zone': boolean;
    /** --- 时区偏移 --- */
    'tz': number | undefined;
    /** --- 计算后的内容 --- */
    'contentComp': string;
}

export const code = {
    'template': '',
    'props': {
        // --- 'default' | 'tip' | 'mtip' | 'date' ---
        'mode': {
            'default': 'default'
        },
        'content': {
            'default': ''
        },

        'time': {
            'default': true
        },
        'date': {
            'default': true
        },
        'zone': {
            'default': false
        },
        'tz': {
            'default': undefined
        }
    },
    'computed': {
        /** --- 替换 slot 数据 --- */
        contentComp: function(this: ILabelVue): string {
            if (this.mode !== 'date') {
                return this.content.toString();
            }
            if (this.propNumber('content') === 0) {
                return '';
            }
            const dateTxt: string[] = [];
            const date = new Date(this.propNumber('content') * 1000);
            /** --- 当前设定的时区 --- */
            const tz = this.$props.tz === undefined ? -(date.getTimezoneOffset() / 60) : this.propNumber('tz');
            date.setTime(date.getTime() + tz * 60 * 60 * 1000);
            if (this.propBoolean('date')) {
                dateTxt.push(date.getUTCFullYear().toString() + '-' + (date.getUTCMonth() + 1).toString().padStart(2, '0') + '-' + date.getUTCDate().toString().padStart(2, '0'));
            }
            if (this.propBoolean('time')) {
                dateTxt.push(date.getUTCHours().toString().padStart(2, '0') + ':' + date.getUTCMinutes().toString().padStart(2, '0') + ':' + date.getUTCSeconds().toString().padStart(2, '0'));
            }
            if (this.propBoolean('zone')) {
                dateTxt.push('UTC' + (tz >= 0 ? '+' : '') + tz.toString());
            }
            return dateTxt.join(' ');
        }
    }
};
