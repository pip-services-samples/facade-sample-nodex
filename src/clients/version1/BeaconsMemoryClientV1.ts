import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdGenerator } from 'pip-services3-commons-nodex';

import { BeaconV1 } from './BeaconV1';
import { IBeaconsClientV1 } from './IBeaconsClientV1';

export class BeaconsMemoryClientV1 implements IBeaconsClientV1 {
    private _beacons: BeaconV1[] = [];

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let id = filter.getAsNullableString('id');
        let siteId = filter.getAsNullableString('site_id');
        let label = filter.getAsNullableString('label');
        let udi = filter.getAsNullableString('udi');
        let udis = filter.getAsObject('udis');
        if (typeof (udis) == 'string')
            udis = udis.split(',');
        if (!Array.isArray(udis))
            udis = null;

        return (item) => {
            if (id != null && item.id != id)
                return false;
            if (siteId != null && item.site_id != siteId)
                return false;
            if (label != null && item.label != label)
                return false;
            if (udi != null && item.udi != udi)
                return false;
            if (udis != null && udis.indexOf(item.udi) < 0)
                return false;
            return true;
        };
    }

    public async getBeacons(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<BeaconV1>> {
        let filterFunc = this.composeFilter(filter);
        let beacons = this._beacons.filter((b) => filterFunc(b));

        return new DataPage<BeaconV1>(beacons, beacons.length);
        
    }

    public async getBeaconById(correlationId: string, beaconId: string): Promise<BeaconV1> {
        let beacon = this._beacons.find((d) => d.id == beaconId);

        return beacon;
        
    }

    public async getBeaconByUdi(correlationId: string, udi: string): Promise<BeaconV1> {
        let beacon = this._beacons.find((item) => item.udi == udi);

        return beacon;
        
    }

    public async calculatePosition(correlationId: string, siteId: string, udis: string[]): Promise<any> {
        let beacons: BeaconV1[];
        let position: any = null;

        if (udis == null || udis.length == 0) return;
        
        let page = await this.getBeacons(
            correlationId,
            FilterParams.fromTuples(
                'site_id', siteId,
                'udis', udis
            ),
            null,
        );
        beacons = page ? page.data : [];

        let lat = 0;
        let lng = 0;
        let count = 0;

        for (let beacon of beacons) {
            if (beacon.center != null
                && beacon.center.type == 'Point'
                && Array.isArray(beacon.center.coordinates)) {
                lng += beacon.center.coordinates[0];
                lat += beacon.center.coordinates[1];
                count += 1;
            }
        }

        if (count > 0) {
            position = {
                type: 'Point',
                coordinates: [lng / count, lat / count]
            }
        }
        
        return position;
    }

    public async createBeacon(correlationId: string, beacon: BeaconV1): Promise<BeaconV1> {
        beacon.id = beacon.id || IdGenerator.nextLong();
        beacon.type = beacon.type || "unknown";

        this._beacons.push(beacon);

        return beacon;
    }

    public async updateBeacon(correlationId: string, beacon: BeaconV1): Promise<BeaconV1> {
        beacon.type = beacon.type || "unknown";

        this._beacons = this._beacons.filter((d) => d.id != beacon.id);
        this._beacons.push(beacon);
        
        return beacon;
    }

    public async deleteBeaconById(correlationId: string, beaconId: string): Promise<BeaconV1> {

        let beacon = this._beacons.find((d) => d.id == beaconId);
        if (beacon)
            this._beacons = this._beacons.filter((d) => d.id != beacon.id);
        
        return beacon;
    }

}