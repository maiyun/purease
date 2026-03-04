import * as purease from '../../../purease.js';

export default class extends purease.AbstractPanel {

    public info = 'Purease is a lightweight and user-friendly front-end library.';

    public main(): void {
        purease.display('AboutPanel mounted.');
    }

}
