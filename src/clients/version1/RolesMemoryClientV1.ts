import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';

import { UserRolesV1 } from './UserRolesV1';
import { IRolesClientV1 } from './IRolesClientV1';

export class RolesMemoryClientV1 implements IRolesClientV1 {
    private _roles: UserRolesV1[] = [];

    private contains(array1, array2) {
        if (array1 == null || array2 == null) return false;
        
        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i2]) 
                    return true;
        }
        
        return false;
    }
    
    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();
        
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

    public async getRolesByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<UserRolesV1>> {
        let filterFunc = this.composeFilter(filter);
        let roles = this._roles.filter(r => filterFunc(r));
        
        return new DataPage<UserRolesV1>(roles, roles.length);
    }

    public async getRolesById(correlationId: string, userId: string): Promise<string[]> {
        let userRoles = this._roles.find((d) => d.id == userId);
        return userRoles != undefined ? userRoles.roles : [];
    }

    public async setRoles(correlationId: string, userId: string, roles: string[]): Promise<string[]> {

        let userRoles: UserRolesV1 = this._roles.find((d) => d.id == userId);
        if (userRoles) {
            userRoles.roles = roles;
            userRoles.update_time = new Date();
        } else {
            userRoles = new UserRolesV1(userId, roles);
            this._roles.push(userRoles);
        }

        return roles || [];
    }

    public async grantRoles(correlationId: string, userId: string, roles: string[]): Promise<string[]> {
        // If there are no roles then skip processing
        if (roles.length == 0) {
            return;
        }

        let existingRoles = await this.getRolesById(
            correlationId, 
            userId,
        );


        let newRoles = [...new Set([...roles, ...existingRoles])]; // union 

        return await this.setRoles(correlationId, userId, newRoles);
    }

    public async revokeRoles(correlationId: string, userId: string, roles: string[]): Promise<string[]> {
        // If there are no roles then skip processing
        if (roles.length == 0) {
            return;
        }

        let existingRoles = await this.getRolesById(correlationId, userId);

        let newRoles = existingRoles.filter(x => !roles.includes(x));

        return await this.setRoles(correlationId, userId, newRoles);
    }
    
    public async authorize(correlationId: string, userId: string, roles: string[]): Promise<boolean> {
        // If there are no roles then skip processing
        if (roles.length == 0) {
            return true;
        }

        let existingRoles = await this.getRolesById(correlationId, userId);

        let authorized = roles.filter(x => !existingRoles.includes(x)).length == 0;
        
        return authorized;
    }
}
