import { IStringIdentifiable } from 'pip-services3-commons-nodex';

export class UserRolesV1 implements IStringIdentifiable {

    public constructor(id: string, roles: string[]) {
        this.id = id;
        this.roles = roles || [];
        this.update_time = new Date();
    }

    public id: string;
    public roles: string[];
    public update_time: Date;
}