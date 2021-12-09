"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
class AccountV1 {
    constructor(id, login, name) {
        this.id = id || pip_services3_commons_nodex_1.IdGenerator.nextLong();
        this.login = login;
        this.name = name;
        this.create_time = new Date();
        this.active = true;
    }
}
exports.AccountV1 = AccountV1;
//# sourceMappingURL=AccountV1.js.map