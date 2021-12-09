import { DataPage } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { UserRolesV1 } from './UserRolesV1';
export interface IRolesClientV1 {
    getRolesByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<UserRolesV1>>;
    getRolesById(correlationId: string, userId: string): Promise<string[]>;
    setRoles(correlationId: string, userId: string, roles: string[]): Promise<string[]>;
    grantRoles(correlationId: string, userId: string, roles: string[]): Promise<string[]>;
    revokeRoles(correlationId: string, userId: string, roles: string[]): Promise<string[]>;
    authorize(correlationId: string, userId: string, roles: string[]): Promise<boolean>;
}
