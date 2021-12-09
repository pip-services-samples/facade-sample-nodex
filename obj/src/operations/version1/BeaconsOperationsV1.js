"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeaconsOperationsV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class BeaconsOperationsV1 extends pip_services3_rpc_nodex_1.RestOperations {
    constructor() {
        super();
        this._dependencyResolver.put('beacons', new pip_services3_commons_nodex_1.Descriptor('beacons', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._beaconsClient = this._dependencyResolver.getOneRequired('beacons');
    }
    getBeacons(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let filter = this.getFilterParams(req);
            let paging = this.getPagingParams(req);
            let siteId = req.params.site_id;
            filter.setAsObject('site_id', siteId);
            let beacons = yield this._beaconsClient.getBeacons(null, filter, paging);
            this.sendResult(req, res, beacons);
        });
    }
    getBeacon(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let beaconId = req.params.beacon_id;
            let beacon = yield this._beaconsClient.getBeaconById(null, beaconId);
            this.sendResult(req, res, beacon);
        });
    }
    calculatePosition(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let siteId = req.params.site_id;
            let udis = req.param('udis');
            if (typeof (udis) == 'string')
                udis = udis.split(',');
            let position = yield this._beaconsClient.calculatePosition(null, siteId, udis);
            this.sendResult(req, res, position);
        });
    }
    createBeacon(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let beacon = req.body || {};
            let result = yield this._beaconsClient.createBeacon(null, beacon);
            this.sendResult(req, res, result);
        });
    }
    updateBeacon(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let beaconId = req.params.beacon_id;
            let beacon = req.body || {};
            beacon.id = beaconId;
            let result = yield this._beaconsClient.updateBeacon(null, beacon);
            this.sendResult(req, res, result);
        });
    }
    deleteBeacon(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let beaconId = req.params.beacon_id;
            let result = yield this._beaconsClient.deleteBeaconById(null, beaconId);
            this.sendResult(req, res, result);
        });
    }
    validateBeaconUdi(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let udi = req.param('udi');
            let beacon = yield this._beaconsClient.getBeaconByUdi(null, udi);
            if (beacon)
                res.json(beacon.id);
            else
                res.json('');
        });
    }
}
exports.BeaconsOperationsV1 = BeaconsOperationsV1;
//# sourceMappingURL=BeaconsOperationsV1.js.map