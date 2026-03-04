import * as purease from '../../../purease.js';
export default class extends purease.AbstractPanel {
    greeting = 'Welcome to Purease Router';
    main() {
        purease.display('HomePanel mounted.');
    }
}
