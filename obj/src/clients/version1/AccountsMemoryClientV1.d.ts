import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IAccountsClientV1 } from './IAccountsClientV1';
import { AccountV1 } from './AccountV1';
export declare class AccountsMemoryClientV1 implements IAccountsClientV1 {
    private _maxPageSize;
    private _accounts;
    constructor(...accounts: AccountV1[]);
    private matchString;
    private matchSearch;
    private composeFilter;
    getAccounts(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<AccountV1>>;
    getAccountById(correlationId: string, id: string): Promise<AccountV1>;
    getAccountByLogin(correlationId: string, login: string): Promise<AccountV1>;
    getAccountByIdOrLogin(correlationId: string, idOrLogin: string): Promise<AccountV1>;
    createAccount(correlationId: string, account: AccountV1): Promise<AccountV1>;
    updateAccount(correlationId: string, account: AccountV1): Promise<AccountV1>;
    deleteAccountById(correlationId: string, id: string): Promise<AccountV1>;
}
