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
exports.AccountsMemoryClientV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
class AccountsMemoryClientV1 {
    constructor(...accounts) {
        this._maxPageSize = 100;
        this._accounts = accounts;
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
        if (this.matchString(item.name, search))
            return true;
        return false;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_nodex_2.FilterParams();
        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let name = filter.getAsNullableString('name');
        let login = filter.getAsNullableString('login');
        let active = filter.getAsNullableBoolean('active');
        let fromCreateTime = filter.getAsNullableDateTime('from_create_time');
        let toCreateTime = filter.getAsNullableDateTime('to_create_time');
        let deleted = filter.getAsBooleanWithDefault('deleted', false);
        return (item) => {
            if (search != null && !this.matchSearch(item, search))
                return false;
            if (id != null && id != item.id)
                return false;
            if (name != null && name != item.name)
                return false;
            if (login != null && login != item.login)
                return false;
            if (active != null && active != item.active)
                return false;
            if (fromCreateTime != null && item.create_time >= fromCreateTime)
                return false;
            if (toCreateTime != null && item.create_time < toCreateTime)
                return false;
            if (!deleted && item.deleted)
                return false;
            return true;
        };
    }
    getAccounts(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            let filterCurl = this.composeFilter(filter);
            let accounts = this._accounts.filter(a => filterCurl(a));
            // Extract a page
            paging = paging != null ? paging : new pip_services3_commons_nodex_3.PagingParams();
            let skip = paging.getSkip(-1);
            let take = paging.getTake(this._maxPageSize);
            let total = null;
            if (paging.total)
                total = accounts.length;
            if (skip > 0)
                accounts = accounts.slice(skip);
            accounts = accounts.slice(0, take);
            let page = new pip_services3_commons_nodex_4.DataPage(accounts, total);
            return page;
        });
    }
    getAccountById(correlationId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let accounts = this._accounts.filter((x) => { return x.id == id; });
            let account = accounts.length > 0 ? accounts[0] : null;
            return account;
        });
    }
    getAccountByLogin(correlationId, login) {
        return __awaiter(this, void 0, void 0, function* () {
            let accounts = this._accounts.filter((x) => { return x.login == login; });
            let account = accounts.length > 0 ? accounts[0] : null;
            return account;
        });
    }
    getAccountByIdOrLogin(correlationId, idOrLogin) {
        return __awaiter(this, void 0, void 0, function* () {
            let accounts = this._accounts.filter((x) => { return x.id == idOrLogin || x.login == idOrLogin; });
            let account = accounts.length > 0 ? accounts[0] : null;
            return account;
        });
    }
    createAccount(correlationId, account) {
        return __awaiter(this, void 0, void 0, function* () {
            if (account == null)
                return;
            let accounts = this._accounts.filter((x) => { return x.id == account.id || x.login == account.login; });
            if (accounts.length > 0) {
                throw new pip_services3_commons_nodex_1.BadRequestException(correlationId, 'DUPLICATE_LOGIN', 'Found account with duplicate login');
            }
            account = Object.assign({}, account);
            account.id = account.id || pip_services3_commons_nodex_5.IdGenerator.nextLong();
            this._accounts.push(account);
            return account;
        });
    }
    updateAccount(correlationId, account) {
        return __awaiter(this, void 0, void 0, function* () {
            let index = this._accounts.map((x) => { return x.id; }).indexOf(account.id);
            if (index < 0)
                return null;
            account = Object.assign({}, account);
            this._accounts[index] = account;
            return account;
        });
    }
    deleteAccountById(correlationId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            var index = this._accounts.map((x) => { return x.id; }).indexOf(id);
            var item = this._accounts[index];
            if (index < 0)
                return null;
            item.deleted = true;
            //this._accounts.splice(index, 1);
            return item;
        });
    }
}
exports.AccountsMemoryClientV1 = AccountsMemoryClientV1;
//# sourceMappingURL=AccountsMemoryClientV1.js.map