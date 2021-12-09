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
exports.InvitationsNullClientV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
class InvitationsNullClientV1 {
    getInvitations(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return new pip_services3_commons_nodex_1.DataPage([], 0);
        });
    }
    getInvitationById(correlationId, invitation_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    createInvitation(correlationId, invitation) {
        return __awaiter(this, void 0, void 0, function* () {
            return invitation;
        });
    }
    updateInvitation(correlationId, invitation) {
        return __awaiter(this, void 0, void 0, function* () {
            return invitation;
        });
    }
    deleteInvitationById(correlationId, invitation_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    activateInvitations(correlationId, email, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return [];
        });
    }
    approveInvitation(correlationId, invitationId, role) {
        return null;
    }
    denyInvitation(correlationId, invitationId) {
        return null;
    }
    resendInvitation(correlationId, invitationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    notifyInvitation(correlationId, invitation) {
        return null;
    }
}
exports.InvitationsNullClientV1 = InvitationsNullClientV1;
//# sourceMappingURL=InvitationsNullClientV1.js.map