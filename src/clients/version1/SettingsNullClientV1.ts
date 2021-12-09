import { ConfigParams } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';

import { SettingsSectionV1 } from './SettingsSectionV1';
import { ISettingsClientV1 } from './ISettingsClientV1';

export class SettingsNullClientV1 implements ISettingsClientV1 {
    constructor(config?: any) {}
        
    public async getSectionIds(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<string>> {
        return new DataPage<string>();
    }

    public async getSections(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<SettingsSectionV1>> {
        return new DataPage<SettingsSectionV1>();
    }
    
    public async getSectionById(correlationId: string, id: string): Promise<ConfigParams> {
        return new ConfigParams();
    }

    public async setSection(correlationId: string, id: string, parameters: ConfigParams): Promise<ConfigParams> {
        return parameters;
    }

    public async modifySection(correlationId: string, id: string, updateParams: ConfigParams, incrementParams: ConfigParams): Promise<ConfigParams> {
        updateParams = updateParams || new ConfigParams();
        incrementParams = incrementParams || new ConfigParams();
        updateParams = updateParams.override(incrementParams);
        return updateParams;
    }
}
