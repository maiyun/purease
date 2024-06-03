import * as purease from '../index';

export default class extends purease.AbstractPanel {

    public text = 'Item4';

    public async main(): Promise<void> {
        await purease.tool.sleep(2000);
        this.text = 'Test';
    }

}
