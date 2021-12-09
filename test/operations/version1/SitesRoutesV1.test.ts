const assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-nodex';

import { SiteV1 } from '../../../src/clients/version1/SiteV1';

import { TestUsers } from '../../fixtures/TestUsers';
import { TestReferences } from '../../fixtures/TestReferences';
import { TestRestClient } from '../../fixtures/TestRestClient';
import { SitesOperationsV1 } from '../../../src/operations/version1/SitesOperationsV1';

let SITE1: SiteV1 = {
    id: '2',
    code: '111',
    name: 'Site #1',
    description: 'Test site #1',
    create_time: new Date(),
    creator_id: '123',
    active: true
};
let SITE2: SiteV1 = {
    id: '3',
    code: '222',
    name: 'Site #2',
    description: 'Test site #2',
    create_time: new Date(),
    creator_id: '123',
    active: true
};

suite('SitesOperationsV1', () => {
    let references: TestReferences;
    let rest: TestRestClient;

    setup(async () => {
        rest = new TestRestClient();
        references = new TestReferences();
        references.put(new Descriptor('pip-services-facade', 'operations', 'sites', 'default', '1.0'), new SitesOperationsV1())
        await references.open(null);
    });

    teardown(async () => {
        await references.close(null);
    });

    test('should perform site operations', async () => {
        let site1, site2: SiteV1;

        // Create one site
        let site = await rest.postAsUser(
            TestUsers.AdminUserSessionId,
            '/api/v1/sites',
            SITE1
        );

        assert.isObject(site);
        assert.equal(site.name, SITE1.name);
        assert.equal(site.description, SITE1.description);

        site1 = site;

        // Create another site
        site = await rest.postAsUser(
            TestUsers.AdminUserSessionId,
            '/api/v1/sites',
            SITE2
        );

        assert.isObject(site);
        assert.equal(site.name, SITE2.name);
        assert.equal(site.description, SITE2.description);

        site2 = site;

        // Get all sites
        let page = await rest.getAsUser(
            TestUsers.AdminUserSessionId,
            '/api/v1/sites'
        );

        assert.isObject(page);
        // Account for 1 test site
        assert.lengthOf(page.data, 3);

        // Find site by code
        site = await rest.get(
            '/api/v1/sites/find_by_code?code=' + site1.code
        );

        assert.isObject(site);
        assert.equal(site.id, site1.id);

        // Validate site code
        let result = await rest.postAsUser(
            TestUsers.AdminUserSessionId,
            '/api/v1/sites/validate_code?code=' + site1.code,
            {}
        );

        assert.equal(result, site1.id);

        // Generate code
        result = await rest.postAsUser(
            TestUsers.AdminUserSessionId,
            '/api/v1/sites/' + site1.id + '/generate_code',
            {}
        );

        assert.isNotNull(result);

        // Update the site
        site1.description = 'Updated Content 1';
        site1.center = { type: 'Point', coordinates: [32, -110] };
        site1.radius = 5;

        site = await rest.putAsUser(
            TestUsers.AdminUserSessionId,
            '/api/v1/sites/' + site1.id,
            site1
        );

        assert.isObject(site);
        assert.equal(site.description, 'Updated Content 1');
        assert.equal(site.name, site1.name);
        assert.isNotNull(site.boundaries);
        assert.isNotNull(site.geometry);

        site1 = site;

        // Delete site
        result = await rest.delAsUser(
            TestUsers.AdminUserSessionId,
            '/api/v1/sites/' + site1.id
        );

        assert.isNotNull(result);

        // Try to get delete site
        result = await rest.getAsUser(
            TestUsers.AdminUserSessionId,
            '/api/v1/sites/' + site1.id
        );

        assert.isTrue(result.deleted);
    });

});