import * as purease from '../../../purease.js';
export default class extends purease.AbstractPanel {
    main() {
        purease.display('UserPanel mounted, id:', this.routeInfo?.params['id']);
    }
}
