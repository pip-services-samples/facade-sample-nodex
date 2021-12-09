import { IReferences } from 'pip-services3-commons-nodex';
import { RestOperations } from 'pip-services3-rpc-nodex';
export declare class BeaconsOperationsV2 extends RestOperations {
    private _beaconsClient;
    constructor();
    setReferences(references: IReferences): void;
    getBeaconsX(req: any, res: any): Promise<void>;
    getBeaconX(req: any, res: any): Promise<void>;
    calculatePositionX(req: any, res: any): Promise<void>;
    createBeaconX(req: any, res: any): Promise<void>;
    updateBeaconX(req: any, res: any): Promise<void>;
    deleteBeaconX(req: any, res: any): Promise<void>;
    validateBeaconUdiX(req: any, res: any): Promise<void>;
}
