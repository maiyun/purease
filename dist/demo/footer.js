import * as purease from 'purease';
export default class extends purease.AbstractPanel {
    constructor() {
        super(...arguments);
        this.text = 'Item4';
    }
    async main() {
        await purease.tool.sleep(2000);
        this.text = 'Test';
    }
}
