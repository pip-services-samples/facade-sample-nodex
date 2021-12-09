import { IReferences } from 'pip-services3-commons-nodex';
import { RestOperations } from 'pip-services3-rpc-nodex';
export declare class InvitationsOperationsV1 extends RestOperations {
    private _invitationsClient;
    constructor();
    setReferences(references: IReferences): void;
    getInvitations(req: any, res: any): Promise<void>;
    getInvitation(req: any, res: any): Promise<void>;
    sendInvitation(req: any, res: any): Promise<void>;
    deleteInvitation(req: any, res: any): Promise<void>;
    approveInvitation(req: any, res: any): Promise<void>;
    denyInvitation(req: any, res: any): Promise<void>;
    resendInvitation(req: any, res: any): Promise<void>;
    notifyInvitation(req: any, res: any): Promise<void>;
}
