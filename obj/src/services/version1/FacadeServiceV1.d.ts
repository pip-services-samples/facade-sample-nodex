import { IReferences } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { RestService } from 'pip-services3-rpc-nodex';
export declare class FacadeServiceV1 extends RestService {
    private _aboutOperations;
    private _sessionsOperations;
    private _sitesOperations;
    private _invitationsOperations;
    private _beaconsOperations;
    constructor();
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    register(): void;
}
