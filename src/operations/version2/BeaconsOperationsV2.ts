import { IReferences } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex'; 
import { RestOperations } from 'pip-services3-rpc-nodex';

import { IBeaconsClientV1 } from '../../clients/version1/IBeaconsClientV1';

export class BeaconsOperationsV2  extends RestOperations {
    private _beaconsClient: IBeaconsClientV1;

    public constructor() {
        super();

        this._dependencyResolver.put('beacons', new Descriptor('beacons', 'client', '*', '*', '1.0'));
    }

    public setReferences(references: IReferences): void {
        super.setReferences(references);

        this._beaconsClient = this._dependencyResolver.getOneRequired<IBeaconsClientV1>('beacons');
    }

    public async getBeaconsX(req: any, res: any): Promise<void> {
        let filter = this.getFilterParams(req);
        let paging = this.getPagingParams(req);

        let siteId = req.params.site_id;
        filter.setAsObject('site_id', siteId);

        let beacons = await this._beaconsClient.getBeacons(null, filter, paging);

        this.sendResult(req, res, beacons);
    }

    public async getBeaconX(req: any, res: any): Promise<void> {
        let beaconId = req.params.beacon_id;

        let beacon = await this._beaconsClient.getBeaconById(null, beaconId);

        this.sendResult(req, res, beacon);
    }

    public async calculatePositionX(req: any, res: any): Promise<void> {
        let siteId = req.params.site_id;
        let udis = req.param('udis');
        if (typeof(udis) == 'string')
            udis = udis.split(',');

        let position = await this._beaconsClient.calculatePosition(
            null, siteId, udis
        );

        this.sendResult(req, res, position);
    }
    
    public async createBeaconX(req: any, res: any): Promise<void> {
        let beacon = req.body || {};

        let result = await this._beaconsClient.createBeacon(
            null, beacon
        );

        this.sendResult(req, res, result);
    }

    public async updateBeaconX(req: any, res: any): Promise<void> {
        let beaconId = req.params.beacon_id;
        let beacon = req.body || {};
        beacon.id = beaconId;

        let result = await this._beaconsClient.updateBeacon(
            null, beacon
        );

        this.sendResult(req, res, result);
    }

    public async deleteBeaconX(req: any, res: any): Promise<void> {
        let beaconId = req.params.beacon_id;

        let result = await this._beaconsClient.deleteBeaconById(
            null, beaconId
        );
        
        this.sendResult(req, res, result);
    }

    public async validateBeaconUdiX(req: any, res: any): Promise<void> {
        let udi = req.param('udi');

        let beacon = await this._beaconsClient.getBeaconByUdi(
            null, udi
        );

        if (beacon) res.json(beacon.id);
        else res.json('');
    }
    
}