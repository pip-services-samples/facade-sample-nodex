import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams} from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdGenerator } from 'pip-services3-commons-nodex';

import { ISitesClientV1 } from './ISitesClientV1';
import { SiteV1 } from './SiteV1';

export class SitesMemoryClientV1 implements ISitesClientV1 {
    private _sites: SiteV1[] = [];
            
    private matchString(value: string, search: string): boolean {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    }

    private matchSearch(item: SiteV1, search: string): boolean {
        search = search.toLowerCase();
        if (this.matchString(item.id, search))
            return true;
        if (this.matchString(item.name, search))
            return true;
        return false;
    }

    private contains(array1, array2) {
        if (array1 == null || array2 == null) return false;
        
        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i1]) 
                    return true;
        }
        
        return false;
    }
    
    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();
        
        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let code = filter.getAsNullableString('code');
        let active = filter.getAsNullableBoolean('active');
        let deleted = filter.getAsBooleanWithDefault('deleted', false);
                
        return (item) => {
            if (id && item.id != id) 
                return false;
            if (code && item.code != code) 
                return false;
            if (active && item.active != active) 
                return false;
            if (!deleted && item.deleted) 
                return false;
            if (search && !this.matchSearch(item, search)) 
                return false;
            return true; 
        };
    }

    public async getSites(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<SiteV1>> {
        let filterFunc = this.composeFilter(filter);
        let sites = this._sites.filter(s => filterFunc(s));

        return new DataPage<SiteV1>(sites, sites.length);
    }

    public async getSiteById(correlationId: string, site_id: string): Promise<SiteV1> {

        let site = this._sites.find((d) => d.id == site_id);

        return site;
    }

    public async getSiteByCode(correlationId: string, code: string): Promise<SiteV1> {

        let site = this._sites.find((d) => d.code == code);
        return site;
    }

    public async generateCode(correlationId: string, site_id: string): Promise<string> {
        return site_id;
    }

    public async createSite(correlationId: string, site: SiteV1): Promise<SiteV1> {

        site.id = site.id || IdGenerator.nextLong();
        site.create_time = new Date();
        site.active = site.active != null || true;

        this._sites.push(site);
        return site;
    }

    public async updateSite(correlationId: string, site: SiteV1): Promise<SiteV1> {

        this._sites = this._sites.filter((d) => d.id != site.id);
        this._sites.push(site);
        
        return site;
    }

    public async deleteSiteById(correlationId: string, site_id: string): Promise<SiteV1> {

        let site = this._sites.find((d) => d.id == site_id);
        if (site) {
            site.deleted = true;
        }
        
        return site;
    }

}