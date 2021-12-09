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
exports.SessionsOperationsV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const pip_services3_rpc_nodex_2 = require("pip-services3-rpc-nodex");
class SessionsOperationsV1 extends pip_services3_rpc_nodex_2.RestOperations {
    constructor() {
        super();
        this._cookie = 'x-session-id';
        this._cookieEnabled = true;
        this._maxCookieAge = 365 * 24 * 60 * 60 * 1000;
        this._dependencyResolver.put('settings', new pip_services3_commons_nodex_3.Descriptor('pip-services-settings', 'client', '*', '*', '1.0'));
        this._dependencyResolver.put('accounts', new pip_services3_commons_nodex_3.Descriptor('pip-services-accounts', 'client', '*', '*', '1.0'));
        this._dependencyResolver.put('passwords', new pip_services3_commons_nodex_3.Descriptor('pip-services-passwords', 'client', '*', '*', '1.0'));
        this._dependencyResolver.put('roles', new pip_services3_commons_nodex_3.Descriptor('pip-services-roles', 'client', '*', '*', '1.0'));
        this._dependencyResolver.put('emailsettings', new pip_services3_commons_nodex_3.Descriptor('pip-services-emailsettings', 'client', '*', '*', '1.0'));
        this._dependencyResolver.put('sessions', new pip_services3_commons_nodex_3.Descriptor('pip-services-sessions', 'client', '*', '*', '1.0'));
        this._dependencyResolver.put('sites', new pip_services3_commons_nodex_3.Descriptor('pip-services-sites', 'client', '*', '*', '1.0'));
        this._dependencyResolver.put('invitations', new pip_services3_commons_nodex_3.Descriptor('pip-services-invitations', 'client', '*', '*', '1.0'));
    }
    configure(config) {
        config = config.setDefaults(SessionsOperationsV1._defaultConfig1);
        this._dependencyResolver.configure(config);
        this._cookieEnabled = config.getAsBooleanWithDefault('options.cookie_enabled', this._cookieEnabled);
        this._cookie = config.getAsStringWithDefault('options.cookie', this._cookie);
        this._maxCookieAge = config.getAsLongWithDefault('options.max_cookie_age', this._maxCookieAge);
    }
    setReferences(references) {
        super.setReferences(references);
        this._settingsClient = this._dependencyResolver.getOneRequired('settings');
        this._sessionsClient = this._dependencyResolver.getOneRequired('sessions');
        this._accountsClient = this._dependencyResolver.getOneRequired('accounts');
        this._passwordsClient = this._dependencyResolver.getOneRequired('passwords');
        this._rolesClient = this._dependencyResolver.getOneRequired('roles');
        this._emailSettingsClient = this._dependencyResolver.getOneOptional('emailsettings');
        this._sitesClient = this._dependencyResolver.getOneRequired('sites');
        this._invitationsClient = this._dependencyResolver.getOneRequired('invitations');
    }
    loadSession(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // parse headers first, and if nothing in headers get cookie
            let sessionId = req.headers['x-session-id'];
            if (sessionId) {
                let session = yield this._sessionsClient.getSessionById('facade', sessionId);
                if (session == null) {
                    let err = new pip_services3_commons_nodex_5.UnauthorizedException('facade', 'SESSION_NOT_FOUND', 'Session invalid or already expired.').withDetails('session_id', sessionId).withStatus(440);
                    this.sendError(req, res, err);
                }
                else {
                    // Associate session user with the request
                    req.user_id = session.user_id;
                    req.user_name = session.user_name;
                    req.user = session.user;
                    req.session_id = session.id;
                    next();
                }
            }
            else {
                next();
            }
        });
    }
    openSession(req, res, account, roles) {
        return __awaiter(this, void 0, void 0, function* () {
            let session;
            let sites;
            let passwordInfo;
            let settings;
            try {
                let siteRoles = roles.filter(r => r.indexOf(':') > 0);
                let siteIds = siteRoles.map((r) => {
                    let pos = r.indexOf(':');
                    return pos >= 0 ? r.substring(0, pos) : r;
                });
                if (siteIds.length > 0) {
                    let filter = pip_services3_commons_nodex_2.FilterParams.fromTuples('ids', siteIds);
                    let page = yield this._sitesClient.getSites(null, filter, null);
                    sites = page != null ? page.data : [];
                }
                else {
                    sites = [];
                }
                passwordInfo = yield this._passwordsClient.getPasswordInfo(null, account.id);
                settings = yield this._settingsClient.getSectionById(null, account.id);
                // Open a new user session
                let user = {
                    id: account.id,
                    name: account.name,
                    login: account.login,
                    create_time: account.create_time,
                    time_zone: account.time_zone,
                    language: account.language,
                    theme: account.theme,
                    roles: roles,
                    sites: sites.map(s => { return { id: s.id, name: s.name }; }),
                    settings: settings,
                    change_pwd_time: passwordInfo != null ? passwordInfo.change_time : null,
                    custom_hdr: account.custom_hdr,
                    custom_dat: account.custom_dat
                };
                let address = pip_services3_rpc_nodex_1.HttpRequestDetector.detectAddress(req);
                let client = pip_services3_rpc_nodex_1.HttpRequestDetector.detectBrowser(req);
                let platform = pip_services3_rpc_nodex_1.HttpRequestDetector.detectPlatform(req);
                session = yield this._sessionsClient.openSession(null, account.id, account.name, address, client, user, null);
                this.sendResult(req, res, session);
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let signupData = req.body;
            let account = null;
            let invited = false;
            let roles = [];
            try {
                // Validate password first
                // Todo: complete implementation after validate password is added
                // Create account
                let newAccount = {
                    name: signupData.name,
                    login: signupData.login || signupData.email,
                    language: signupData.language,
                    theme: signupData.theme,
                    time_zone: signupData.time_zone
                };
                account = yield this._accountsClient.createAccount(null, newAccount);
                // Create password for the account
                let password = signupData.password;
                this._passwordsClient.setPassword(null, account.id, password);
                // Activate all pending invitations
                let email = signupData.email;
                let invitations = yield this._invitationsClient.activateInvitations(null, email, account.id);
                if (invitations) {
                    // Calculate user roles from activated invitations
                    for (let invitation of invitations) {
                        // Was user invited with the same email?
                        invited = invited || email == invitation.invitee_email;
                        if (invitation.site_id) {
                            invitation.role = invitation.role || 'user';
                            let role = invitation.site_id + ':' + invitation.role;
                            roles.push(role);
                        }
                    }
                }
                // Create email settings for the account
                let newEmailSettings = {
                    id: account.id,
                    name: account.name,
                    email: email,
                    language: account.language
                };
                if (this._emailSettingsClient != null) {
                    if (invited) {
                        this._emailSettingsClient.setVerifiedSettings(null, newEmailSettings);
                    }
                    else {
                        this._emailSettingsClient.setSettings(null, newEmailSettings);
                    }
                }
                yield this.openSession(req, res, account, roles);
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
    signupValidate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let login = req.param('login');
            if (login) {
                let account = yield this._accountsClient.getAccountByIdOrLogin(null, login);
                if (account != null) {
                    let err = new pip_services3_commons_nodex_4.BadRequestException(null, 'LOGIN_ALREADY_USED', 'Login ' + login + ' already being used').withDetails('login', login);
                    this.sendError(req, res, err);
                }
                else
                    this.sendEmptyResult(req, res);
            }
            else {
                this.sendEmptyResult(req, req);
            }
        });
    }
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let login = req.param('login');
            let password = req.param('password');
            let account;
            let roles = [];
            try {
                // Find user account
                account = yield this._accountsClient.getAccountByIdOrLogin(null, login);
                if (account == null) {
                    throw new pip_services3_commons_nodex_4.BadRequestException(null, 'WRONG_LOGIN', 'Account ' + login + ' was not found').withDetails('login', login);
                }
                // Authenticate user
                let result = yield this._passwordsClient.authenticate(null, account.id, password);
                // wrong password error is UNKNOWN when use http client
                if (result == false) {
                    throw new pip_services3_commons_nodex_4.BadRequestException(null, 'WRONG_PASSWORD', 'Wrong password for account ' + login).withDetails('login', login);
                }
                // Retrieve user roles
                if (this._rolesClient) {
                    roles = yield this._rolesClient.getRolesById(null, account.id);
                }
                yield this.openSession(req, res, account, roles);
            }
            catch (err) {
                this.sendError(req, res, err);
            }
        });
    }
    signout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session_id) {
                try {
                    yield this._sessionsClient.closeSession(null, req.session_id);
                    this.sendEmptyResult(req, res);
                }
                catch (err) {
                    this.sendError(req, res, err);
                }
            }
            else {
                this.sendEmptyResult(req, res);
            }
        });
    }
    getSessions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let filter = this.getFilterParams(req);
            let paging = this.getPagingParams(req);
            let sessions = yield this._sessionsClient.getSessions(null, filter, paging);
            this.sendResult(req, res, sessions);
        });
    }
    restoreSession(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let sessionId = req.param('session_id');
            let session = yield this._sessionsClient.getSessionById(null, sessionId);
            // If session closed then return null
            if (session && !session.active)
                session = null;
            if (session)
                this.sendResult(req, res, session);
            else
                this.sendEmptyResult(req, res);
        });
    }
    getUserSessions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let filter = this.getFilterParams(req);
            let paging = this.getPagingParams(req);
            let userId = req.params.user_id || req.params.account_id;
            filter.setAsObject('user_id', userId);
            let result = yield this._sessionsClient.getSessions(null, filter, paging);
            this.sendResult(req, res, result);
        });
    }
    getCurrentSession(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // parse headers first, and if nothing in headers get cookie
            let sessionId = req.headers['x-session-id'];
            let result = yield this._sessionsClient.getSessionById(null, sessionId);
            this.sendResult(req, res, result);
        });
    }
    closeSession(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let sessionId = req.params.session_id || req.param('session_id');
            let result = yield this._sessionsClient.closeSession(null, sessionId);
            this.sendResult(req, res, result);
        });
    }
}
exports.SessionsOperationsV1 = SessionsOperationsV1;
SessionsOperationsV1._defaultConfig1 = pip_services3_commons_nodex_1.ConfigParams.fromTuples('options.cookie_enabled', true, 'options.cookie', 'x-session-id', 'options.max_cookie_age', 365 * 24 * 60 * 60 * 1000);
//# sourceMappingURL=SessionsOperationsV1.js.map