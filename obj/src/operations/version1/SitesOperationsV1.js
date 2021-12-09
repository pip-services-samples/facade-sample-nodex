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
exports.SitesOperationsV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class SitesOperationsV1 extends pip_services3_rpc_nodex_1.RestOperations {
    constructor() {
        super();
        this._dependencyResolver.put('roles', new pip_services3_commons_nodex_2.Descriptor('pip-services-roles', 'client', '*', '*', '1.0'));
        this._dependencyResolver.put('sessions', new pip_services3_commons_nodex_2.Descriptor('pip-services-sessions', 'client', '*', '*', '1.0'));
        this._dependencyResolver.put('sites', new pip_services3_commons_nodex_2.Descriptor('pip-services-sites', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._rolesClient = this._dependencyResolver.getOneRequired('roles');
        this._sessionsClient = this._dependencyResolver.getOneRequired('sessions');
        this._sitesClient = this._dependencyResolver.getOneRequired('sites');
    }
    getSites(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let filter = this.getFilterParams(req);
            let paging = this.getPagingParams(req);
            let result = yield this._sitesClient.getSites(null, filter, paging);
            this.sendResult(req, res, result);
        });
    }
    getAuthorizedSites(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let filter = this.getFilterParams(req);
            let paging = this.getPagingParams(req);
            let roles = req.user ? req.user.roles || [] : [];
            let siteIds = [];
            // Get authorized site ids
            for (let role of roles) {
                let tokens = role.split(':');
                if (tokens.length == 2)
                    siteIds.push(tokens[0]);
            }
            // Consider ids parameter
            let oldSiteIds = filter.getAsArray('ids');
            if (oldSiteIds.length > 0)
                siteIds = oldSiteIds.filter(x => siteIds.includes(x));
            // Is user has no sites then exit
            if (siteIds.length == 0) {
                res.json(res.json(new pip_services3_commons_nodex_1.DataPage([])));
                return;
            }
            filter.setAsObject('ids', siteIds);
            let result = yield this._sitesClient.getSites(null, filter, paging);
            this.sendResult(req, res, result);
        });
    }
    getSite(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let siteId = req.params.site_id;
            let result = yield this._sitesClient.getSiteById(null, siteId);
            this.sendResult(req, res, result);
        });
    }
    findSiteByCode(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let code = req.param('code');
            let result = yield this._sitesClient.getSiteByCode(null, code);
            this.sendResult(req, res, result);
        });
    }
    generateCode(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let siteId = req.params.site_id;
            let result = yield this._sitesClient.generateCode(null, siteId);
            this.sendResult(req, res, result);
        });
    }
    createSite(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = req.body || {};
            let site;
            try {
                // Create a site
                site = yield this._sitesClient.createSite(null, data);
                // Assign permissions to the owner
                if (this._rolesClient != null && req.user_id != null)
                    this._rolesClient.grantRoles(null, req.user_id, [site.id + ':admin']);
                // Update current user session
                if (req.user != null && req.session_id != null) {
                    let user = req.user;
                    user.roles = user.roles || [];
                    user.roles.push(site.id + ':admin');
                    user.sites = user.sites || [];
                    user.sites.push(site);
                    this._sessionsClient.updateSessionUser(null, req.session_id, user);
                }
                this.sendResult(req, res, site);
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
    updateSite(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let siteId = req.params.site_id;
            let data = req.body || {};
            data.id = siteId;
            let site;
            try {
                // Update site
                site = yield this._sitesClient.updateSite(null, data);
                // Update current user session
                if (req.user != null && req.session_id != null) {
                    let user = req.user;
                    user.sites = user.sites || [];
                    user.sites = user.sites.filter(s => s.id != site.id);
                    user.sites.push(site);
                    this._sessionsClient.updateSessionUser(null, req.session_id, user);
                }
                this.sendResult(req, res, site);
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
    deleteSite(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let siteId = req.params.site_id;
            let result = yield this._sitesClient.deleteSiteById(null, siteId);
            this.sendResult(req, res, result);
        });
    }
    removeSite(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let siteId = req.params.site_id;
            try {
                // Assign permissions to the owner
                if (this._rolesClient != null && req.user_id != null) {
                    this._rolesClient.revokeRoles(null, req.user_id, [
                        siteId + ':admin',
                        siteId + ':manager',
                        siteId + ':user'
                    ]);
                }
                // Update current user session
                if (req.user != null && req.session_id != null) {
                    let user = req.user;
                    user.roles = user.roles || [];
                    user.roles = user.roles.filter(r => r != siteId + ':admin');
                    user.roles = user.roles.filter(r => r != siteId + ':manager');
                    user.roles = user.roles.filter(r => r != siteId + ':user');
                    user.sites = user.sites || [];
                    user.sites = user.sites.filter(s => s.id != siteId);
                    this._sessionsClient.updateSessionUser(null, req.session_id, user);
                }
                this.sendEmptyResult(req, res);
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
    validateSiteCode(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let code = req.param('code');
            let site = yield this._sitesClient.getSiteByCode(null, code);
            if (site)
                this.sendResult(req, res, site.id);
            else
                this.sendResult(req, res, '');
        });
    }
}
exports.SitesOperationsV1 = SitesOperationsV1;
//# sourceMappingURL=SitesOperationsV1.js.map