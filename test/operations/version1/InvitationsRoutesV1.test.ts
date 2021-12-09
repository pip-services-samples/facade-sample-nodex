const assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-nodex';

import { InvitationV1 } from '../../../src/clients/version1/InvitationV1';

import { TestUsers } from '../../fixtures/TestUsers';
import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { InvitationsOperationsV1 } from '../../../src/operations/version1/InvitationsOperationsV1';

let INVITATION1: InvitationV1 = {
    id: '1',
    action: 'activate',
    site_id: '1',
    role: 'manager',
    create_time: new Date(),
    creator_id: '1',
    invitee_email: 'test@somewhere.com'
};
let INVITATION2: InvitationV1 = {
    id: '2',
    action: 'activate',
    site_id: '1',
    create_time: new Date(),
    creator_id: '1',
    invitee_email: 'test2@somewhere.com'
};
let INVITATION3: InvitationV1 = {
    id: '3',
    action: 'notify',
    site_id: '1',
    create_time: new Date(),
    creator_id: '1',
    invitee_email: 'test2@somewhere.com'
};

suite('InvitationsOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup(async () => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('pip-services-facade', 'operations', 'invitations', 'default', '1.0'), new InvitationsOperationsV1())
        await references.open(null);
    });

    teardown(async () => {
        await references.close(null);
    });

    test('should resend invitations', async () => {
        let invitation1: InvitationV1;

        // Send invitation
        let invitation = await rest.postAsUser(
            TestUsers.AdminUserSessionId,
            '/api/v1/sites/' + INVITATION1.site_id + '/invitations',
            INVITATION1
        );

        assert.isObject(invitation);
        assert.equal(invitation.creator_id, INVITATION1.creator_id);
        assert.equal(invitation.site_id, INVITATION1.site_id);
        assert.equal(invitation.invitee_email, INVITATION1.invitee_email);

        invitation1 = invitation;

        // Send another invitation
        invitation = await rest.postAsUser(
            TestUsers.AdminUserSessionId,
            '/api/v1/sites/' + invitation1.site_id + '/invitations/' + invitation1.id + '/resend', null);

        // assert.isObject(invitation);
        // assert.equal(invitation.id, invitation1.id);
    });


    test('should perform invitation operations', async () => {
        let invitation1, invitation2: InvitationV1;

        // Send one invitation
        let invitation = await rest.postAsUser(
            TestUsers.AdminUserSessionId,
            '/api/v1/sites/' + INVITATION1.site_id + '/invitations',
            INVITATION1
        );

        assert.isObject(invitation);
        assert.equal(invitation.creator_id, INVITATION1.creator_id);
        assert.equal(invitation.site_id, INVITATION1.site_id);
        assert.equal(invitation.invitee_email, INVITATION1.invitee_email);

        invitation1 = invitation;

        // Send another invitation
        invitation = await rest.postAsUser(
            TestUsers.AdminUserSessionId,
            '/api/v1/sites/' + INVITATION2.site_id + '/invitations',
            INVITATION2
        );

        assert.isObject(invitation);
        assert.equal(invitation.creator_id, INVITATION2.creator_id);
        assert.equal(invitation.site_id, INVITATION2.site_id);
        assert.equal(invitation.invitee_email, INVITATION2.invitee_email);

        invitation2 = invitation;

        // Get all invitations
        let page = await rest.getAsUser(
            TestUsers.AdminUserSessionId,
            '/api/v1/sites/' + INVITATION1.site_id + '/invitations'
        );

        assert.isObject(page);
        // assert.lengthOf(page.data, 2);

        // Delete invitation
        let result = await rest.delAsUser(
            TestUsers.AdminUserSessionId,
            '/api/v1/sites/' + invitation1.site_id + '/invitations/' + invitation1.id,
        );
        assert.isNull(result);

        // Try to get delete invitation
        result = await rest.getAsUser(
            TestUsers.AdminUserSessionId,
            '/api/v1/sites/' + invitation1.site_id + '/invitations/' + invitation1.id
        );
    });

    test('should notify invitations', async () => {
        await rest.postAsUser(
            TestUsers.AdminUserSessionId,
            '/api/v1/sites/' + INVITATION1.site_id + '/invitations/notify',
            INVITATION3
        );
    });

});