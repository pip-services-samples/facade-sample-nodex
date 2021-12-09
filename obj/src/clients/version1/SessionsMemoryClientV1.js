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
exports.SessionsMemoryClientV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const SessionV1_1 = require("./SessionV1");
class SessionsMemoryClientV1 {
    constructor() {
        this._sessions = [];
    }
    getSessions(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return new pip_services3_commons_nodex_1.DataPage(this._sessions, this._sessions.length);
        });
    }
    getSessionById(correlationId, sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            let session = this._sessions.find((d) => d.id == sessionId);
            return session;
        });
    }
    openSession(correlationId, user_id, user_name, address, client, user, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let session = new SessionV1_1.SessionV1(null, user_id, user_name, address, client);
            session.user = user;
            session.data = data;
            this._sessions.push(session);
            return session;
        });
    }
    storeSessionData(correlationId, sessionId, data) {
        return null;
    }
    updateSessionUser(correlationId, sessionId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            let session = this._sessions.find((d) => d.id == sessionId);
            if (session)
                session.user = user;
            return session;
        });
    }
    closeSession(correlationId, sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            let session = this._sessions.find((d) => d.id == sessionId);
            if (session)
                session.active = false;
            return session;
        });
    }
    deleteSessionById(correlationId, sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            let session = this._sessions.find((d) => d.id == sessionId);
            if (session)
                this._sessions = this._sessions.filter((d) => d.id != sessionId);
            return session;
        });
    }
}
exports.SessionsMemoryClientV1 = SessionsMemoryClientV1;
//# sourceMappingURL=SessionsMemoryClientV1.js.map