"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsSectionV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
class SettingsSectionV1 {
    constructor(id, parameters) {
        this.id = id;
        this.parameters = parameters || new pip_services3_commons_nodex_1.ConfigParams();
        this.update_time = new Date();
    }
}
exports.SettingsSectionV1 = SettingsSectionV1;
//# sourceMappingURL=SettingsSectionV1.js.map