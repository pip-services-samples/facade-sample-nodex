"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRolesV1 = void 0;
class UserRolesV1 {
    constructor(id, roles) {
        this.id = id;
        this.roles = roles || [];
        this.update_time = new Date();
    }
}
exports.UserRolesV1 = UserRolesV1;
//# sourceMappingURL=UserRolesV1.js.map