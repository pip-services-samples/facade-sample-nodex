import { ConfigParams } from 'pip-services3-commons-nodex';
import { IStringIdentifiable } from 'pip-services3-commons-nodex';

export class SettingsSectionV1 implements IStringIdentifiable {
    public constructor (id: string, parameters?: ConfigParams) {
        this.id = id;
        this.parameters = parameters || new ConfigParams();
        this.update_time = new Date();
    }

    public id: string;
    public parameters: ConfigParams;
    public update_time: Date;
}