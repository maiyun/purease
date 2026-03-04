import * as purease from '../../../purease.js';

export default class extends purease.AbstractPanel {

    public greeting = 'Welcome to Purease Router';

    public main(): void {
        purease.display('HomePanel mounted.');
    }

}
