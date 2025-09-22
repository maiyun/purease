import * as lDom from '../../dom';
import * as lTool from '../../tool';
import * as lControl from '../../control';
import * as purease from '../../purease.js';

export const code = {
    'template': '',
    'emits': {
        'changed': null,
        'update:modelValue': null,
        'update:tz': null,
    },
    'props': {
        'disabled': {
            'default': false,
        },

        'modelValue': {
            'default': [],
        },
        'tz': {
            'default': undefined,
        },
        'start': {
            'default': undefined,
        },
        'end': {
            'default': undefined,
        },

        'time': {
            'default': true,
        },
        'zone': {
            'default': false,
        },
    },
    data: function() {
        return {
            'dateObj': [
                new Date(), new Date()
            ],
            'cursor': '',

            /** --- first 的 ts --- */
            'ts': undefined,

            /** --- end 的 ts --- */
            'ts2': undefined,

            'dateStr': ['', ''],

            'timeStr': ['', ''],

            /** --- 当前时区信息（小时） --- */
            'tzData': 0,

            'vzone': '+0',

            'zones': [],

            'vzdec': '00',

            'zdecs': ['00', '15', '30', '45'],

            /** --- 语言包 --- */
            'localeData': {
                'en': {
                    'minute': 'Min',
                    'zone': 'Zone',
                    'cancel': 'Cancel',
                    'ok': 'OK',
                    'please click select': 'Click to select'
                },
                'sc': {
                    'minute': '分',
                    'zone': '时区',
                    'cancel': '取消',
                    'ok': '确定',
                    'please click select': '请点击选择'
                },
                'tc': {
                    'minute': '分',
                    'zone': '時區',
                    'cancel': '取消',
                    'ok': '確定',
                    'please click select': '請點擊選擇'
                },
                'ja': {
                    'minute': '分',
                    'zone': '時區', // --- タイムゾーン ---
                    'cancel': '取消',
                    'ok': '確定',
                    'please click select': '選択して下さい'
                },
                'ko': {
                    'minute': '분',
                    'zone': '時區', // --- 시간대 ---
                    'cancel': '취소',
                    'ok': '확인',
                    'please click select': '선택 클릭'
                },
                'th': {
                    'minute': 'น.',
                    'zone': 'เขต',
                    'cancel': 'ยกเลิก',
                    'ok': 'ตกลง',
                    'please click select': 'คลิกเลือก'
                },
                'es': {
                    'minute': 'Min',
                    'zone': 'Zona',
                    'cancel': 'Cancelar',
                    'ok': 'OK',
                    'please click select': 'Clic para elegir'
                },
                'de': {
                    'minute': 'Min',
                    'zone': 'Zone',
                    'cancel': 'Abbr.',
                    'ok': 'OK',
                    'please click select': 'Klicken Sie wählen'
                },
                'fr': {
                    'minute': 'Min',
                    'zone': 'Zone',
                    'cancel': 'Annul.',
                    'ok': 'OK',
                    'please click select': 'Cliquer choisir'
                },
                'pt': {
                    'minute': 'Min',
                    'zone': 'Fuso',
                    'cancel': 'Cancelar',
                    'ok': 'OK',
                    'please click select': 'Clique para sel.'
                },
                'ru': {
                    'minute': 'Мин',
                    'zone': 'Зона',
                    'cancel': 'Отмена',
                    'ok': 'ОК',
                    'please click select': 'Нажмите выбрать'
                },
                'vi': {
                    'minute': 'Phút',
                    'zone': 'Múi',
                    'cancel': 'Hủy',
                    'ok': 'OK',
                    'please click select': 'Nhấn chọn'
                },
                'ar': {
                    'minute': 'د',
                    'zone': 'منطقة',
                    'cancel': 'إلغاء',
                    'ok': 'موافق',
                    'please click select': 'انقر للاختيار'
                },
                'id': {
                    'minute': 'Mnt',
                    'zone': 'Zona',
                    'cancel': 'Batal',
                    'ok': 'OK',
                    'please click select': 'Klik pilih'
                },
                'it': {
                    'minute': 'Min',
                    'zone': 'Zona',
                    'cancel': 'Annulla',
                    'ok': 'OK',
                    'please click select': 'Clicca per selez.'
                },
                'tr': {
                    'minute': 'Dak',
                    'zone': 'Bölge',
                    'cancel': 'İptal',
                    'ok': 'Tamam',
                    'please click select': 'Seç için tıkla'
                }
            },

            /** --- 小屏不显示两个 --- */
            'showTwoDatePanel': false,

            // --- yearmonth 处理 ---

            'firstym': '',

            'endym': ''
        };
    },
    'methods': {
        // --- 单击事件 ---
        click: function(this: purease.IVue, e: MouseEvent, type: 'first' | 'zone'): void {
            const el = this.$refs[type + 'pop'];
            if (el.classList.contains('pe-show')) {
                lDom.hidePop(el);
                return;
            }
            if (type === 'first') {
                this.showTwoDatePanel = window.innerWidth >= 600 ? true : false;
            }
            lDom.showPop(e, el);
        },
        zoneOk: function(this: purease.IVue): void {
            const vz = parseInt(this.vzone);
            if (vz >= 0) {
                this.tzData = vz + (parseInt(this.vzdec) / 60);
            }
            else {
                this.tzData = vz - (parseInt(this.vzdec) / 60);
            }
            this.$emit('update:tz', this.tzData);
            if (this.dateStr[0]) {
                this.$emit('update:modelValue', [
                    this.dateObj[0].getTime() - this.tzData * 60 * 60_000,
                    this.dateObj[1].getTime() - this.tzData * 60 * 60_000
                ]);
            }
            lDom.hidePop();
        },
        cancel: function(): void {
            lDom.hidePop();
        },
        // --- 清除已选中的 ---
        clear: function(this: purease.IVue): void {
            this.ts = undefined;
            this.dateStr.length = 0;
            this.$emit('update:modelValue', []);
        },
        onRange: function(this: purease.IVue, e: lControl.IDatepanelRangeEvent): void {
            e.preventDefault();
            const value: number[] = [];
            // --- start ---
            let res = lTool.formatTime(e.detail.start, this.tzData);
            this.dateStr[0] = res.date;
            this.timeStr[0] = res.time;
            value.push(e.detail.start);
            this.dateObj[0].setTime(e.detail.start + this.tzData * 60 * 60_000);
            // --- end ---
            res = lTool.formatTime(e.detail.end, this.tzData);
            this.dateStr[1] = res.date;
            this.timeStr[1] = res.time;
            value.push(e.detail.end);
            this.dateObj[1].setTime(e.detail.end + this.tzData * 60 * 60_000);
            // --- 提交数据 ---
            this.$emit('update:modelValue', value);
            lDom.hidePop(this.$refs.firstpop);
            // --- 清空选中 ---
            this.$refs.firstpanel.clear();
            this.$refs.endpanel.clear();
        },
        /** --- 左侧的 changed --- */
        firstChanged: function(this: purease.IVue, e: lControl.IDatepanelChangedEvent): void {
            if (e.detail.value === undefined) {
                this.ts2 = undefined;
                return;
            }
            const date = new Date(e.detail.value);
            date.setUTCHours(23, 59, 59, 0);
            this.ts2 = date.getTime() - this.tzData * 60 * 60_000;
        },
        onYmChange: function(this: purease.IVue): void {
            if (this.endym > this.firstym) {
                return;
            }
            const date = new Date();
            date.setUTCFullYear(parseInt(this.firstym.slice(0, 4)), parseInt(this.firstym.slice(4)), 1);
            this.endym = date.getUTCFullYear().toString() + (date.getUTCMonth() + 1).toString().padStart(2, '0');
        }
    },
    'mounted': function(this: purease.IVue) {
        // --- 填充时区 ---
        for (let i = -12; i <= 14; ++i) {
            this.zones.push((i >= 0 ? '+' : '') + i.toString());
        }
        // --- 监测 prop 时区信息变动 ---
        this.$watch('tz', () => {
            if (this.$props.tz === undefined) {
                this.tzData = -(this.dateObj[0].getTimezoneOffset() / 60);
                this.$emit('update:tz', this.tzData);
            }
            else {
                this.tzData = this.propNumber('tz');
            }
            const z = this.tzData.toString().split('.');
            this.vzone = (parseInt(z[0]) >= 0 ? '+' : '') + z[0];
            this.vzdec = z[1] ? (parseFloat('0.' + z[1]) * 60).toString() : '00';
            // --- 更新时间戳 ---
            if (this.dateStr[0]) {
                this.$emit('update:modelValue', [
                    this.dateObj[0].getTime() - this.tzData * 60 * 60_000,
                    this.dateObj[1].getTime() - this.tzData * 60 * 60_000
                ]);
            }
        }, {
            'immediate': true
        });
        this.$watch('modelValue', () => {
            if (this.$props.modelValue[0] === undefined || this.$props.modelValue[1] === undefined) {
                this.dateStr.length = 0;
                return;
            }
            const modelValue = this.propArray('modelValue');
            for (let i = 0; i <= 1; ++i) {
                const ts = typeof modelValue[i] === 'string' ? parseInt(modelValue[i]) : modelValue[i];
                const res = lTool.formatTime(ts, this.tzData);
                this.dateStr[i] = res.date;
                this.timeStr[i] = res.time;
            }
        }, {
            'immediate': true,
            'deep': true
        });
    }
};
