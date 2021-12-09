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
exports.SettingsNullClientV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
class SettingsNullClientV1 {
    constructor(config) { }
    getSectionIds(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return new pip_services3_commons_nodex_2.DataPage();
        });
    }
    getSections(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return new pip_services3_commons_nodex_2.DataPage();
        });
    }
    getSectionById(correlationId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new pip_services3_commons_nodex_1.ConfigParams();
        });
    }
    setSection(correlationId, id, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            return parameters;
        });
    }
    modifySection(correlationId, id, updateParams, incrementParams) {
        return __awaiter(this, void 0, void 0, function* () {
            updateParams = updateParams || new pip_services3_commons_nodex_1.ConfigParams();
            incrementParams = incrementParams || new pip_services3_commons_nodex_1.ConfigParams();
            updateParams = updateParams.override(incrementParams);
            return updateParams;
        });
    }
}
exports.SettingsNullClientV1 = SettingsNullClientV1;
//# sourceMappingURL=SettingsNullClientV1.js.map