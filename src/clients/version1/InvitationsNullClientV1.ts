import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';

import { IInvitationsClientV1 } from './IInvitationsClientV1';
import { InvitationV1 } from './InvitationV1';

export class InvitationsNullClientV1 implements IInvitationsClientV1 {
    public async getInvitations(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<InvitationV1>> {
        return new DataPage([], 0);
    }

    public async getInvitationById(correlationId: string, invitation_id: string): Promise<InvitationV1> {
        return null;
    }

    public async createInvitation(correlationId: string, invitation: InvitationV1): Promise<InvitationV1> {
        return invitation;
    }

    public async updateInvitation(correlationId: string, invitation: InvitationV1): Promise<InvitationV1> {
        return invitation;
    }

    public async deleteInvitationById(correlationId: string, invitation_id: string): Promise<InvitationV1> {
        return null;
    }

    public async activateInvitations(correlationId: string, email: string, userId: string): Promise<InvitationV1[]> {
        return [];
    }

    public approveInvitation(correlationId: string, invitationId: string, role: string): Promise<InvitationV1> {
        return null;
    }

    public denyInvitation(correlationId: string, invitationId: string): Promise<InvitationV1> {
        return null;
    }
            
    public async resendInvitation(correlationId: string, invitationId: string): Promise<InvitationV1> {
        return null;
    }

    public notifyInvitation(correlationId: string, invitation: InvitationV1): Promise<void> {
        return null;
    }
}