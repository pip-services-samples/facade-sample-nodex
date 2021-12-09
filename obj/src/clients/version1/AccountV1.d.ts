import { IStringIdentifiable } from 'pip-services3-commons-nodex';
export declare class AccountV1 implements IStringIdentifiable {
    constructor(id: string, login: string, name: string);
    id: string;
    login: string;
    name: string;
    create_time: Date;
    deleted?: boolean;
    active: boolean;
    time_zone: string;
    language: string;
    theme: string;
    custom_hdr: any;
    custom_dat: any;
}
