"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacadeFactory = void 0;
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const FacadeServiceV1_1 = require("../services/version1/FacadeServiceV1");
const FacadeServiceV2_1 = require("../services/version2/FacadeServiceV2");
class FacadeFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(FacadeFactory.FacadeServiceV1Descriptor, FacadeServiceV1_1.FacadeServiceV1);
        this.registerAsType(FacadeFactory.FacadeServiceV2Descriptor, FacadeServiceV2_1.FacadeServiceV2);
    }
}
exports.FacadeFactory = FacadeFactory;
FacadeFactory.FacadeServiceV1Descriptor = new pip_services3_commons_nodex_1.Descriptor("pip-facades-example", "service", "http", "*", "1.0");
FacadeFactory.FacadeServiceV2Descriptor = new pip_services3_commons_nodex_1.Descriptor("pip-facades-example", "service", "http", "*", "2.0");
//# sourceMappingURL=FacadeFactory.js.map