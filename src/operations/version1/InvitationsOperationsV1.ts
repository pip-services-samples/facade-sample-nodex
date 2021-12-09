import { IReferences } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex'; 
import { RestOperations } from 'pip-services3-rpc-nodex';

import { IInvitationsClientV1 } from '../../clients/version1/IInvitationsClientV1';

export class InvitationsOperationsV1  extends RestOperations {
    private _invitationsClient: IInvitationsClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('invitations', new Descriptor('pip-services-invitations', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._invitationsClient = this._dependencyResolver.getOneRequired<IInvitationsClientV1>('invitations');
    }

    public async getInvitations(req: any, res: any): Promise<void> {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        let siteId = req.params.site_id;
        filter.setAsObject('site_id', siteId);
        
        let result = await this._invitationsClient.getInvitations(
            null, filter, paging
        );

        this.sendResult(req, res, result);
    }

    public async getInvitation(req: any, res: any): Promise<void> {
        let invitationId = req.params.invitation_id;

        let result = await this._invitationsClient.getInvitationById(
            null, invitationId
        );

        this.sendResult(req, res, result);
    }

    public async sendInvitation(req: any, res: any): Promise<void> {
        let invitation = req.body || {};
        let user = req.user || {};

        invitation.create_time = new Date();
        invitation.creator_id = user.id;
        invitation.creator_name = user.name;

        let result = await this._invitationsClient.createInvitation(
            null, invitation
        );

        this.sendResult(req, res, result);
    }

    public async deleteInvitation(req: any, res: any): Promise<void> {
        let invitationId = req.params.invitation_id;

        let result = await this._invitationsClient.deleteInvitationById(
            null, invitationId
        );

        this.sendResult(req, res, result)
    }

    public async approveInvitation(req: any, res: any): Promise<void> {
        let invitationId = req.params.invitation_id;
        let role = req.param('role');

        let result = await this._invitationsClient.approveInvitation(
            null, invitationId, role
        );

        this.sendResult(req, res, result);
    }

    public async denyInvitation(req: any, res: any): Promise<void> {
        let invitationId = req.params.invitation_id;

        let result = await this._invitationsClient.denyInvitation(null, invitationId);

        this.sendResult(req, res, result);
    }
    
    public async resendInvitation(req: any, res: any): Promise<void> {
        let invitationId = req.params.invitation_id;

        let result = await this._invitationsClient.resendInvitation(
            null, invitationId
        );

        this.sendResult(req, res, result);
    }

    public async notifyInvitation(req: any, res: any): Promise<void> {
        let invitation = req.body || {};
        let user = req.user || {};

        invitation.create_time = new Date();
        invitation.creator_id = user.id;
        invitation.creator_name = user.name;

        await this._invitationsClient.notifyInvitation(
            null, invitation
        );

        this.sendEmptyResult(req, res);
    }
    
}