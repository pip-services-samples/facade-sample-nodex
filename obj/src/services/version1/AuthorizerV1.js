"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizerV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const pip_services3_rpc_nodex_2 = require("pip-services3-rpc-nodex");
const pip_services3_rpc_nodex_3 = require("pip-services3-rpc-nodex");
const pip_services3_rpc_nodex_4 = require("pip-services3-rpc-nodex");
class AuthorizerV1 {
    constructor() {
        this.basicAuth = new pip_services3_rpc_nodex_2.BasicAuthManager();
        this.roleAuth = new pip_services3_rpc_nodex_3.RoleAuthManager();
        this.ownerAuth = new pip_services3_rpc_nodex_4.OwnerAuthManager();
    }
    anybody() {
        return this.basicAuth.anybody();
    }
    signed() {
        return this.basicAuth.signed();
    }
    owner(idParam = 'user_id') {
        return this.ownerAuth.owner(idParam);
    }
    ownerOrAdmin(idParam = 'user_id') {
        return this.ownerAuth.ownerOrAdmin(idParam);
    }
    siteRoles(roles, idParam = 'site_id') {
        return (req, res, next) => {
            let user = req.user;
            if (user == null) {
                pip_services3_rpc_nodex_1.HttpResponseSender.sendError(req, res, new pip_services3_commons_nodex_1.UnauthorizedException(null, 'NOT_SIGNED', 'User must be signed in to perform this operation').withStatus(401));
            }
            else {
                let siteId = req.params[idParam];
                let authorized = user.roles.includes('admin');
                if (siteId != null && !authorized) {
                    for (let role of roles)
                        authorized = authorized || user.roles.includes(siteId + ':' + role);
                }
                if (!authorized) {
                    pip_services3_rpc_nodex_1.HttpResponseSender.sendError(req, res, new pip_services3_commons_nodex_1.UnauthorizedException(null, 'NOT_IN_SITE_ROLE', 'User must be site:' + roles.join(' or site:') + ' to perform this operation').withDetails('roles', roles).withStatus(403));
                }
                else {
                    next();
                }
            }
        };
    }
    admin() {
        return this.roleAuth.userInRole('admin');
    }
    siteAdmin(idParam = 'site_id') {
        return this.siteRoles(['admin'], idParam);
    }
    siteManager(idParam = 'site_id') {
        return this.siteRoles(['admin', 'manager'], idParam);
    }
    siteUser(idParam = 'site_id') {
        return this.siteRoles(['admin', 'manager', 'user'], idParam);
    }
    siteAdminOrOwner(userIdParam = 'user_id', siteIdParam = 'site_id') {
        return (req, res, next) => {
            let user = req.user;
            if (user == null) {
                pip_services3_rpc_nodex_1.HttpResponseSender.sendError(req, res, new pip_services3_commons_nodex_1.UnauthorizedException(null, 'NOT_SIGNED', 'User must be signed in to perform this operation').withStatus(401));
            }
            else {
                let userId = req.params[userIdParam] || req.param(userIdParam);
                if (userId != null && userId == user.user_id) {
                    next();
                }
                else {
                    let siteId = req.params[siteIdParam];
                    let authorized = user.roles.includes('admin')
                        || user.roles.includes(siteId + ':admin');
                    if (!authorized) {
                        pip_services3_rpc_nodex_1.HttpResponseSender.sendError(req, res, new pip_services3_commons_nodex_1.UnauthorizedException(null, 'NOT_IN_SITE_ROLE', 'User must be site:admin to perform this operation').withDetails('roles', ['admin']).withStatus(403));
                    }
                    else {
                        next();
                    }
                }
            }
        };
    }
}
exports.AuthorizerV1 = AuthorizerV1;
//# sourceMappingURL=AuthorizerV1.js.map