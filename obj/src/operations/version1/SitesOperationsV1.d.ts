import { IReferences } from 'pip-services3-commons-nodex';
import { RestOperations } from 'pip-services3-rpc-nodex';
export declare class SitesOperationsV1 extends RestOperations {
    private _rolesClient;
    private _sessionsClient;
    private _sitesClient;
    constructor();
    setReferences(references: IReferences): void;
    getSites(req: any, res: any): Promise<void>;
    getAuthorizedSites(req: any, res: any): Promise<void>;
    getSite(req: any, res: any): Promise<void>;
    findSiteByCode(req: any, res: any): Promise<void>;
    generateCode(req: any, res: any): Promise<void>;
    createSite(req: any, res: any): Promise<void>;
    updateSite(req: any, res: any): Promise<void>;
    deleteSite(req: any, res: any): Promise<void>;
    removeSite(req: any, res: any): Promise<void>;
    validateSiteCode(req: any, res: any): Promise<void>;
}
