"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesMemoryClientV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const UserRolesV1_1 = require("./UserRolesV1");
class RolesMemoryClientV1 {
    constructor() {
        this._roles = [];
    }
    contains(array1, array2) {
        if (array1 == null || array2 == null)
            return false;
        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i2])
                    return true;
        }
        return false;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_nodex_1.FilterParams();
        let id = filter.getAsNullableString('id');
        let ids = filter.getAsObject('ids');
        let exceptIds = filter.getAsObject('except_ids');
        let roles = filter.getAsObject('roles');
        let exceptRoles = filter.getAsObject('except_roles');
        // Process ids filter
        if (typeof (ids) == 'string')
            ids = ids.split(',');
        if (!Array.isArray(ids))
            ids = null;
        // Process except ids filter
        if (typeof (exceptIds) == 'string')
            exceptIds = exceptIds.split(',');
        if (!Array.isArray(exceptIds))
            exceptIds = null;
        // Process roles filter
        if (typeof (roles) == 'string')
            roles = roles.split(',');
        if (!Array.isArray(roles))
            roles = null;
        // Process except roles filter
        if (typeof (exceptRoles) == 'string')
            exceptRoles = exceptRoles.split(',');
        if (!Array.isArray(exceptRoles))
            exceptRoles = null;
        return (item) => {
            if (id && item.id != id)
                return false;
            if (ids && ids.findIndex(id => id == item.id) < 0)
                return false;
            if (exceptIds && exceptIds.findIndex(eId => eId == item.id) >= 0)
                return false;
            if (roles && !this.contains(roles, item.roles))
                return false;
            if (exceptRoles && this.contains(exceptRoles, item.roles))
                return false;
            return true;
        };
    }
    getRolesByFilter(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            let filterFunc = this.composeFilter(filter);
            let roles = this._roles.filter(r => filterFunc(r));
            return new pip_services3_commons_nodex_2.DataPage(roles, roles.length);
        });
    }
    getRolesById(correlationId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let userRoles = this._roles.find((d) => d.id == userId);
            return userRoles != undefined ? userRoles.roles : [];
        });
    }
    setRoles(correlationId, userId, roles) {
        return __awaiter(this, void 0, void 0, function* () {
            let userRoles = this._roles.find((d) => d.id == userId);
            if (userRoles) {
                userRoles.roles = roles;
                userRoles.update_time = new Date();
            }
            else {
                userRoles = new UserRolesV1_1.UserRolesV1(userId, roles);
                this._roles.push(userRoles);
            }
            return roles || [];
        });
    }
    grantRoles(correlationId, userId, roles) {
        return __awaiter(this, void 0, void 0, function* () {
            // If there are no roles then skip processing
            if (roles.length == 0) {
                return;
            }
            let existingRoles = yield this.getRolesById(correlationId, userId);
            let newRoles = [...new Set([...roles, ...existingRoles])]; // union 
            return yield this.setRoles(correlationId, userId, newRoles);
        });
    }
    revokeRoles(correlationId, userId, roles) {
        return __awaiter(this, void 0, void 0, function* () {
            // If there are no roles then skip processing
            if (roles.length == 0) {
                return;
            }
            let existingRoles = yield this.getRolesById(correlationId, userId);
            let newRoles = existingRoles.filter(x => !roles.includes(x));
            return yield this.setRoles(correlationId, userId, newRoles);
        });
    }
    authorize(correlationId, userId, roles) {
        return __awaiter(this, void 0, void 0, function* () {
            // If there are no roles then skip processing
            if (roles.length == 0) {
                return true;
            }
            let existingRoles = yield this.getRolesById(correlationId, userId);
            let authorized = roles.filter(x => !existingRoles.includes(x)).length == 0;
            return authorized;
        });
    }
}
exports.RolesMemoryClientV1 = RolesMemoryClientV1;
//# sourceMappingURL=RolesMemoryClientV1.js.map