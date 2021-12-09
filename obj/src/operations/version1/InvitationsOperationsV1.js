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
exports.InvitationsOperationsV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class InvitationsOperationsV1 extends pip_services3_rpc_nodex_1.RestOperations {
    constructor() {
        super();
        this._dependencyResolver.put('invitations', new pip_services3_commons_nodex_1.Descriptor('pip-services-invitations', 'client', '*', '*', '1.0'));
    }
    setReferences(references) {
        super.setReferences(references);
        this._invitationsClient = this._dependencyResolver.getOneRequired('invitations');
    }
    getInvitations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let filter = this.getFilterParams(req);
            let paging = this.getPagingParams(req);
            let siteId = req.params.site_id;
            filter.setAsObject('site_id', siteId);
            let result = yield this._invitationsClient.getInvitations(null, filter, paging);
            this.sendResult(req, res, result);
        });
    }
    getInvitation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let invitationId = req.params.invitation_id;
            let result = yield this._invitationsClient.getInvitationById(null, invitationId);
            this.sendResult(req, res, result);
        });
    }
    sendInvitation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let invitation = req.body || {};
            let user = req.user || {};
            invitation.create_time = new Date();
            invitation.creator_id = user.id;
            invitation.creator_name = user.name;
            let result = yield this._invitationsClient.createInvitation(null, invitation);
            this.sendResult(req, res, result);
        });
    }
    deleteInvitation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let invitationId = req.params.invitation_id;
            let result = yield this._invitationsClient.deleteInvitationById(null, invitationId);
            this.sendResult(req, res, result);
        });
    }
    approveInvitation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let invitationId = req.params.invitation_id;
            let role = req.param('role');
            let result = yield this._invitationsClient.approveInvitation(null, invitationId, role);
            this.sendResult(req, res, result);
        });
    }
    denyInvitation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let invitationId = req.params.invitation_id;
            let result = yield this._invitationsClient.denyInvitation(null, invitationId);
            this.sendResult(req, res, result);
        });
    }
    resendInvitation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let invitationId = req.params.invitation_id;
            let result = yield this._invitationsClient.resendInvitation(null, invitationId);
            this.sendResult(req, res, result);
        });
    }
    notifyInvitation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let invitation = req.body || {};
            let user = req.user || {};
            invitation.create_time = new Date();
            invitation.creator_id = user.id;
            invitation.creator_name = user.name;
            yield this._invitationsClient.notifyInvitation(null, invitation);
            this.sendEmptyResult(req, res);
        });
    }
}
exports.InvitationsOperationsV1 = InvitationsOperationsV1;
//# sourceMappingURL=InvitationsOperationsV1.js.map