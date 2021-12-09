"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacadeProcess = void 0;
const pip_services3_container_nodex_1 = require("pip-services3-container-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const ClientFacadeFactory_1 = require("../build/ClientFacadeFactory");
const FacadeFactory_1 = require("../build/FacadeFactory");
class FacadeProcess extends pip_services3_container_nodex_1.ProcessContainer {
    constructor() {
        super("pip-facades-example", "Example Pip.Services facade");
        this._factories.add(new ClientFacadeFactory_1.ClientFacadeFactory);
        this._factories.add(new FacadeFactory_1.FacadeFactory);
        this._factories.add(new pip_services3_rpc_nodex_1.DefaultRpcFactory);
    }
}
exports.FacadeProcess = FacadeProcess;
//# sourceMappingURL=FacadeProcess.js.map