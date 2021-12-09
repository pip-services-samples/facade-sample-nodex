import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { BeaconV1 } from './BeaconV1';
import { IBeaconsClientV1 } from './IBeaconsClientV1';
export declare class BeaconsMemoryClientV1 implements IBeaconsClientV1 {
    private _beacons;
    private composeFilter;
    getBeacons(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<BeaconV1>>;
    getBeaconById(correlationId: string, beaconId: string): Promise<BeaconV1>;
    getBeaconByUdi(correlationId: string, udi: string): Promise<BeaconV1>;
    calculatePosition(correlationId: string, siteId: string, udis: string[]): Promise<any>;
    createBeacon(correlationId: string, beacon: BeaconV1): Promise<BeaconV1>;
    updateBeacon(correlationId: string, beacon: BeaconV1): Promise<BeaconV1>;
    deleteBeaconById(correlationId: string, beaconId: string): Promise<BeaconV1>;
}
