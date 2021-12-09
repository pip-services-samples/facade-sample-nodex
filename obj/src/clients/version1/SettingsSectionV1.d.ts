import { ConfigParams } from 'pip-services3-commons-nodex';
import { IStringIdentifiable } from 'pip-services3-commons-nodex';
export declare class SettingsSectionV1 implements IStringIdentifiable {
    constructor(id: string, parameters?: ConfigParams);
    id: string;
    parameters: ConfigParams;
    update_time: Date;
}
