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
exports.SitesMemoryClientV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
class SitesMemoryClientV1 {
    constructor() {
        this._sites = [];
    }
    matchString(value, search) {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    }
    matchSearch(item, search) {
        search = search.toLowerCase();
        if (this.matchString(item.id, search))
            return true;
        if (this.matchString(item.name, search))
            return true;
        return false;
    }
    contains(array1, array2) {
        if (array1 == null || array2 == null)
            return false;
        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i1])
                    return true;
        }
        return false;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_nodex_1.FilterParams();
        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let code = filter.getAsNullableString('code');
        let active = filter.getAsNullableBoolean('active');
        let deleted = filter.getAsBooleanWithDefault('deleted', false);
        return (item) => {
            if (id && item.id != id)
                return false;
            if (code && item.code != code)
                return false;
            if (active && item.active != active)
                return false;
            if (!deleted && item.deleted)
                return false;
            if (search && !this.matchSearch(item, search))
                return false;
            return true;
        };
    }
    getSites(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            let filterFunc = this.composeFilter(filter);
            let sites = this._sites.filter(s => filterFunc(s));
            return new pip_services3_commons_nodex_2.DataPage(sites, sites.length);
        });
    }
    getSiteById(correlationId, site_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let site = this._sites.find((d) => d.id == site_id);
            return site;
        });
    }
    getSiteByCode(correlationId, code) {
        return __awaiter(this, void 0, void 0, function* () {
            let site = this._sites.find((d) => d.code == code);
            return site;
        });
    }
    generateCode(correlationId, site_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return site_id;
        });
    }
    createSite(correlationId, site) {
        return __awaiter(this, void 0, void 0, function* () {
            site.id = site.id || pip_services3_commons_nodex_3.IdGenerator.nextLong();
            site.create_time = new Date();
            site.active = site.active != null || true;
            this._sites.push(site);
            return site;
        });
    }
    updateSite(correlationId, site) {
        return __awaiter(this, void 0, void 0, function* () {
            this._sites = this._sites.filter((d) => d.id != site.id);
            this._sites.push(site);
            return site;
        });
    }
    deleteSiteById(correlationId, site_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let site = this._sites.find((d) => d.id == site_id);
            if (site) {
                site.deleted = true;
            }
            return site;
        });
    }
}
exports.SitesMemoryClientV1 = SitesMemoryClientV1;
//# sourceMappingURL=SitesMemoryClientV1.js.map