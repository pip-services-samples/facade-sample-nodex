import { BadRequestException } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdGenerator } from 'pip-services3-commons-nodex';

import { IAccountsClientV1 } from './IAccountsClientV1';
import { AccountV1 } from './AccountV1';

export class AccountsMemoryClientV1 implements IAccountsClientV1 {
    private _maxPageSize: number = 100;
    private _accounts: AccountV1[];

    public constructor(...accounts: AccountV1[]) {
        this._accounts = accounts;
    }

    private matchString(value: string, search: string): boolean {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    }

    private matchSearch(item: AccountV1, search: string): boolean {
        search = search.toLowerCase();
        if (this.matchString(item.name, search))
            return true;
        return false;
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();
        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let name = filter.getAsNullableString('name');
        let login = filter.getAsNullableString('login');
        let active = filter.getAsNullableBoolean('active');
        let fromCreateTime = filter.getAsNullableDateTime('from_create_time');
        let toCreateTime = filter.getAsNullableDateTime('to_create_time');
        let deleted = filter.getAsBooleanWithDefault('deleted', false);

        return (item: AccountV1) => {
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

    public async getAccounts(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<AccountV1>> {

        let filterCurl = this.composeFilter(filter);
        let accounts = this._accounts.filter(a => filterCurl(a));

        // Extract a page
        paging = paging != null ? paging : new PagingParams();
        let skip = paging.getSkip(-1);
        let take = paging.getTake(this._maxPageSize);

        let total = null;
        if (paging.total)
            total = accounts.length;

        if (skip > 0)
            accounts = accounts.slice(skip);
        accounts = accounts.slice(0, take);

        let page = new DataPage<AccountV1>(accounts, total);

        return page;
    }

    public async getAccountById(correlationId: string, id: string): Promise<AccountV1> {

        let accounts = this._accounts.filter((x) => { return x.id == id; });
        let account = accounts.length > 0 ? accounts[0] : null;

        return account;
    }

    public async getAccountByLogin(correlationId: string, login: string): Promise<AccountV1> {
        let accounts = this._accounts.filter((x) => { return x.login == login; });
        let account = accounts.length > 0 ? accounts[0] : null;

        return account;
    }

    public async getAccountByIdOrLogin(correlationId: string, idOrLogin: string): Promise<AccountV1> {
        let accounts = this._accounts.filter((x) => { return x.id == idOrLogin || x.login == idOrLogin; });
        let account = accounts.length > 0 ? accounts[0] : null;

        return account;
    }

    public async createAccount(correlationId: string, account: AccountV1): Promise<AccountV1> {
        if (account == null) return;

        let accounts = this._accounts.filter((x) => { return x.id == account.id || x.login == account.login; });
        if (accounts.length > 0) {
            throw new BadRequestException(correlationId, 'DUPLICATE_LOGIN', 'Found account with duplicate login');
        }

        account = Object.assign({}, account);
        account.id = account.id || IdGenerator.nextLong();

        this._accounts.push(account);

        return account;

    }

    public async updateAccount(correlationId: string, account: AccountV1): Promise<AccountV1> {
        let index = this._accounts.map((x) => { return x.id; }).indexOf(account.id);

        if (index < 0) return null;


        account = Object.assign({}, account);
        this._accounts[index] = account;

        return account;

    }

    public async deleteAccountById(correlationId: string, id: string): Promise<AccountV1> {
        var index = this._accounts.map((x) => { return x.id; }).indexOf(id);
        var item = this._accounts[index];

        if (index < 0) return null;


        item.deleted = true;
        //this._accounts.splice(index, 1);

        return item;

    }

}