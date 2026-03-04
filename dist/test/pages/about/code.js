import * as purease from '../../../purease.js';
export default class extends purease.AbstractPanel {
    info = 'Purease is a lightweight and user-friendly front-end library.';
    main() {
        purease.display('AboutPanel mounted.');
    }
}
