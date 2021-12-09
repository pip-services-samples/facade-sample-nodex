import { IReferences } from 'pip-services3-commons-nodex';
import { RestOperations } from 'pip-services3-rpc-nodex';
export declare class BeaconsOperationsV1 extends RestOperations {
    private _beaconsClient;
    constructor();
    setReferences(references: IReferences): void;
    getBeacons(req: any, res: any): Promise<void>;
    getBeacon(req: any, res: any): Promise<void>;
    calculatePosition(req: any, res: any): Promise<void>;
    createBeacon(req: any, res: any): Promise<void>;
    updateBeacon(req: any, res: any): Promise<void>;
    deleteBeacon(req: any, res: any): Promise<void>;
    validateBeaconUdi(req: any, res: any): Promise<void>;
}
