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
exports.BeaconsMemoryClientV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
class BeaconsMemoryClientV1 {
    constructor() {
        this._beacons = [];
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_nodex_1.FilterParams();
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
    getBeacons(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            let filterFunc = this.composeFilter(filter);
            let beacons = this._beacons.filter((b) => filterFunc(b));
            return new pip_services3_commons_nodex_2.DataPage(beacons, beacons.length);
        });
    }
    getBeaconById(correlationId, beaconId) {
        return __awaiter(this, void 0, void 0, function* () {
            let beacon = this._beacons.find((d) => d.id == beaconId);
            return beacon;
        });
    }
    getBeaconByUdi(correlationId, udi) {
        return __awaiter(this, void 0, void 0, function* () {
            let beacon = this._beacons.find((item) => item.udi == udi);
            return beacon;
        });
    }
    calculatePosition(correlationId, siteId, udis) {
        return __awaiter(this, void 0, void 0, function* () {
            let beacons;
            let position = null;
            if (udis == null || udis.length == 0)
                return;
            let page = yield this.getBeacons(correlationId, pip_services3_commons_nodex_1.FilterParams.fromTuples('site_id', siteId, 'udis', udis), null);
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
                };
            }
            return position;
        });
    }
    createBeacon(correlationId, beacon) {
        return __awaiter(this, void 0, void 0, function* () {
            beacon.id = beacon.id || pip_services3_commons_nodex_3.IdGenerator.nextLong();
            beacon.type = beacon.type || "unknown";
            this._beacons.push(beacon);
            return beacon;
        });
    }
    updateBeacon(correlationId, beacon) {
        return __awaiter(this, void 0, void 0, function* () {
            beacon.type = beacon.type || "unknown";
            this._beacons = this._beacons.filter((d) => d.id != beacon.id);
            this._beacons.push(beacon);
            return beacon;
        });
    }
    deleteBeaconById(correlationId, beaconId) {
        return __awaiter(this, void 0, void 0, function* () {
            let beacon = this._beacons.find((d) => d.id == beaconId);
            if (beacon)
                this._beacons = this._beacons.filter((d) => d.id != beacon.id);
            return beacon;
        });
    }
}
exports.BeaconsMemoryClientV1 = BeaconsMemoryClientV1;
//# sourceMappingURL=BeaconsMemoryClientV1.js.map