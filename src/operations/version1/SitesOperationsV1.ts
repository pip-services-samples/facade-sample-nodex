import { DataPage } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex'; 
import { RestOperations } from 'pip-services3-rpc-nodex';

import { ISitesClientV1 } from '../../clients/version1/ISitesClientV1';
import { SiteV1 } from '../../clients/version1/SiteV1';
import { IRolesClientV1 } from '../../clients/version1/IRolesClientV1';
import { ISessionsClientV1 } from '../../clients/version1/ISessionsClientV1';

export class SitesOperationsV1  extends RestOperations {
    private _rolesClient: IRolesClientV1;
    private _sessionsClient: ISessionsClientV1;
    private _sitesClient: ISitesClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('roles', new Descriptor('pip-services-roles', 'client', '*', '*', '1.0'));
        this._dependencyResolver.put('sessions', new Descriptor('pip-services-sessions', 'client', '*', '*', '1.0'));
        this._dependencyResolver.put('sites', new Descriptor('pip-services-sites', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._rolesClient = this._dependencyResolver.getOneRequired<IRolesClientV1>('roles');
        this._sessionsClient = this._dependencyResolver.getOneRequired<ISessionsClientV1>('sessions');
        this._sitesClient = this._dependencyResolver.getOneRequired<ISitesClientV1>('sites');
    }

    public async getSites(req: any, res: any): Promise<void> {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        let result = await this._sitesClient.getSites(
            null, filter, paging
        );

        this.sendResult(req, res, result);
    }

    public async getAuthorizedSites(req: any, res: any): Promise<void> {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        let roles: string[] = req.user ? req.user.roles || [] : [];
        let siteIds: string[] = [];

        // Get authorized site ids
        for (let role of roles) {
            let tokens = role.split(':');
            if (tokens.length == 2)
                siteIds.push(tokens[0]);
        }

        // Consider ids parameter
        let oldSiteIds = filter.getAsArray('ids');
        if (oldSiteIds.length > 0)
            siteIds = oldSiteIds.filter(x => siteIds.includes(x))

        // Is user has no sites then exit
        if (siteIds.length == 0) {
            res.json(res.json(new DataPage([])));
            return;
        }

        filter.setAsObject('ids', siteIds);

        let result = await this._sitesClient.getSites(
            null, filter, paging
        );

        this.sendResult(req, res, result);
    }
    
    public async getSite(req: any, res: any): Promise<void> {
        let siteId = req.params.site_id;

        let result = await this._sitesClient.getSiteById(
            null, siteId
        );

        this.sendResult(req, res, result);
    }

    public async findSiteByCode(req: any, res: any): Promise<void> {
        let code = req.param('code');

        let result = await this._sitesClient.getSiteByCode(null, code);

        this.sendResult(req, res, result);
    }
    
    public async generateCode(req: any, res: any): Promise<void> {
        let siteId = req.params.site_id;

        let result = await this._sitesClient.generateCode(null, siteId);

        this.sendResult(req, res, result);
    }

    public async createSite(req: any, res: any): Promise<void> {
        let data = req.body || {};
        let site: SiteV1;

        try {
            // Create a site
            site = await this._sitesClient.createSite(null, data);

            // Assign permissions to the owner
            if (this._rolesClient != null && req.user_id != null)
                this._rolesClient.grantRoles(null, req.user_id, [site.id + ':admin']);

            // Update current user session
            if (req.user != null && req.session_id != null) {
                let user = req.user;

                user.roles = user.roles || [];
                user.roles.push(site.id + ':admin');

                user.sites = user.sites || [];
                user.sites.push(site);

                this._sessionsClient.updateSessionUser(null, req.session_id, user);
            }

            this.sendResult(req, res, site);
        } catch (err) {
            this.sendError(req, res, err);
        }
    }

    public async updateSite(req: any, res: any): Promise<void> {
        let siteId = req.params.site_id;
        let data = req.body || {};
        data.id = siteId;
        let site: SiteV1;

        try {
            // Update site
            site = await this._sitesClient.updateSite(null, data);

            // Update current user session
            if (req.user != null && req.session_id != null) {
                let user = req.user;

                user.sites = user.sites || [];
                user.sites = user.sites.filter(s => s.id != site.id);
                user.sites.push(site);

                this._sessionsClient.updateSessionUser(null, req.session_id, user);
            }

            this.sendResult(req, res, site);
        } catch (err) {
            this.sendError(req, res, err);
        }
    }

    public async deleteSite(req: any, res: any): Promise<void> {
        let siteId = req.params.site_id;

        let result = await this._sitesClient.deleteSiteById(null, siteId);
        this.sendResult(req, res, result);
    }

    public async removeSite(req: any, res: any): Promise<void> {
        let siteId = req.params.site_id;

        try {
            // Assign permissions to the owner
            if (this._rolesClient != null && req.user_id != null) {
                this._rolesClient.revokeRoles(
                    null,
                    req.user_id,
                    [
                        siteId + ':admin',
                        siteId + ':manager',
                        siteId + ':user'
                    ],
                );
            }

            // Update current user session
            if (req.user != null && req.session_id != null) {
                let user = req.user;

                user.roles = user.roles || [];
                user.roles = user.roles.filter(r => r != siteId + ':admin');
                user.roles = user.roles.filter(r => r != siteId + ':manager');
                user.roles = user.roles.filter(r => r != siteId + ':user');

                user.sites = user.sites || [];
                user.sites = user.sites.filter(s => s.id != siteId);

                this._sessionsClient.updateSessionUser(null, req.session_id, user);
            }

            this.sendEmptyResult(req, res);
        } catch(err) {
            this.sendError(req, res, err);
        }
    }
    
    public async validateSiteCode(req: any, res: any): Promise<void> {
        let code = req.param('code');

        let site = await this._sitesClient.getSiteByCode(null, code);

        if (site) this.sendResult(req, res, site.id);
        else this.sendResult(req, res, '');
    }
    
}