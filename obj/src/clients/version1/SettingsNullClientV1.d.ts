import { ConfigParams } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { SettingsSectionV1 } from './SettingsSectionV1';
import { ISettingsClientV1 } from './ISettingsClientV1';
export declare class SettingsNullClientV1 implements ISettingsClientV1 {
    constructor(config?: any);
    getSectionIds(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<string>>;
    getSections(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<SettingsSectionV1>>;
    getSectionById(correlationId: string, id: string): Promise<ConfigParams>;
    setSection(correlationId: string, id: string, parameters: ConfigParams): Promise<ConfigParams>;
    modifySection(correlationId: string, id: string, updateParams: ConfigParams, incrementParams: ConfigParams): Promise<ConfigParams>;
}
