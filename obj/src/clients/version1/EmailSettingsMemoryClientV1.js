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
exports.EmailSettingsMemoryClientV1 = void 0;
class EmailSettingsMemoryClientV1 {
    constructor() {
        this._settings = [];
    }
    getSettingsByIds(correlationId, recipientIds) {
        return __awaiter(this, void 0, void 0, function* () {
            let settings = this._settings.filter(s => recipientIds.findIndex((id) => id == s.id));
            return settings;
        });
    }
    getSettingsById(correlationId, recipientId) {
        return __awaiter(this, void 0, void 0, function* () {
            let settings = this._settings.find((s) => s.id == recipientId);
            return settings;
        });
    }
    getSettingsByEmailSettings(correlationId, email) {
        return __awaiter(this, void 0, void 0, function* () {
            let settings = this._settings.find(s => s.email == email);
            return settings;
        });
    }
    setSettings(correlationId, settings) {
        return __awaiter(this, void 0, void 0, function* () {
            settings.verified = false;
            settings.subscriptions = settings.subscriptions || {};
            this._settings = this._settings.filter(s => s.id != settings.id);
            this._settings.push(settings);
            return settings;
        });
    }
    setVerifiedSettings(correlationId, settings) {
        return __awaiter(this, void 0, void 0, function* () {
            settings.verified = true;
            settings.subscriptions = settings.subscriptions || {};
            this._settings = this._settings.filter(s => s.id != settings.id);
            this._settings.push(settings);
            return settings;
        });
    }
    setRecipient(correlationId, recipientId, name, email, language) {
        return __awaiter(this, void 0, void 0, function* () {
            let settings = this._settings.find(s => s.id == recipientId);
            if (settings) {
                settings.name = name;
                settings.email = email;
                settings.language = language;
            }
            else {
                settings = {
                    id: recipientId,
                    name: name,
                    email: email,
                    language: language,
                    verified: false,
                    subscriptions: {}
                };
                this._settings.push(settings);
            }
            return settings;
        });
    }
    setSubscriptions(correlationId, recipientId, subscriptions) {
        return __awaiter(this, void 0, void 0, function* () {
            let settings = this._settings.find(s => s.id == recipientId);
            if (settings) {
                settings.subscriptions = subscriptions;
            }
            else {
                settings = {
                    id: recipientId,
                    name: null,
                    email: null,
                    language: null,
                    subscriptions: subscriptions
                };
                this._settings.push(settings);
            }
            return settings;
        });
    }
    deleteSettingsById(correlationId, recipientId) {
        return __awaiter(this, void 0, void 0, function* () {
            this._settings = this._settings.filter(s => s.id != recipientId);
            return;
        });
    }
    resendVerification(correlationId, recipientId) {
        return __awaiter(this, void 0, void 0, function* () {
            return;
        });
    }
    verifyEmail(correlationId, recipientId, code) {
        return __awaiter(this, void 0, void 0, function* () {
            let settings = this._settings.find(s => s.id == recipientId);
            if (settings && settings.ver_code == code) {
                settings.verified = true;
                settings.ver_code = null;
            }
            return;
        });
    }
}
exports.EmailSettingsMemoryClientV1 = EmailSettingsMemoryClientV1;
//# sourceMappingURL=EmailSettingsMemoryClientV1.js.map