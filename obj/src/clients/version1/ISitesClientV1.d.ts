import { DataPage } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { SiteV1 } from './SiteV1';
export interface ISitesClientV1 {
    getSites(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<SiteV1>>;
    getSiteById(correlationId: string, site_id: string): Promise<SiteV1>;
    getSiteByCode(correlationId: string, code: string): Promise<SiteV1>;
    generateCode(correlationId: string, site_id: string): Promise<string>;
    createSite(correlationId: string, site: SiteV1): Promise<SiteV1>;
    updateSite(correlationId: string, site: SiteV1): Promise<SiteV1>;
    deleteSiteById(correlationId: string, site_id: string): Promise<SiteV1>;
}
