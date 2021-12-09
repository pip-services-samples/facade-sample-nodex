import { IEmailSettingsClientV1 } from './IEmailSettingsClientV1';
import { EmailSettingsV1 } from './EmailSettingsV1';

export class EmailSettingsMemoryClientV1 implements IEmailSettingsClientV1 {
    private _settings: EmailSettingsV1[] = [];

    public async getSettingsByIds(correlationId: string, recipientIds: string[]): Promise<EmailSettingsV1[]> {
        let settings = this._settings.filter(s => recipientIds.findIndex((id) => id == s.id));

        return settings;
    }

    public async getSettingsById(correlationId: string, recipientId: string): Promise<EmailSettingsV1> {
        let settings = this._settings.find((s) => s.id == recipientId);
        
        return settings;
    }

    public async getSettingsByEmailSettings(correlationId: string, email: string): Promise<EmailSettingsV1> {
        let settings = this._settings.find(s => s.email == email);
        return settings;
    }

    public async setSettings(correlationId: string, settings: EmailSettingsV1): Promise<EmailSettingsV1> {

        settings.verified = false;
        settings.subscriptions = settings.subscriptions || {};

        this._settings = this._settings.filter(s => s.id != settings.id);
        this._settings.push(settings);
        return settings;
    }

    public async setVerifiedSettings(correlationId: string, settings: EmailSettingsV1): Promise<EmailSettingsV1> {

        settings.verified = true;
        settings.subscriptions = settings.subscriptions || {};

        this._settings = this._settings.filter(s => s.id != settings.id);
        this._settings.push(settings);
        return settings;
    }

    public async setRecipient(correlationId: string, recipientId: string,
        name: string, email: string, language: string): Promise<EmailSettingsV1> {

        let settings = this._settings.find(s => s.id == recipientId);

        if (settings) {
            settings.name = name;
            settings.email = email;
            settings.language = language;
        } else {
            settings = <EmailSettingsV1> { 
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
    }

    public async setSubscriptions(correlationId: string, recipientId: string, subscriptions: any): Promise<EmailSettingsV1> {

        let settings = this._settings.find(s => s.id == recipientId);
        
        if (settings) {
            settings.subscriptions = subscriptions;
        } else {
            settings = <EmailSettingsV1> { 
                id: recipientId,
                name: null,
                email: null,
                language: null,
                subscriptions: subscriptions
            };
            this._settings.push(settings);
        }

        return settings;
    }

    public async deleteSettingsById(correlationId: string, recipientId: string): Promise<void> {
        this._settings = this._settings.filter(s => s.id != recipientId);
        return;
    }

    public async resendVerification(correlationId: string, recipientId: string): Promise<void> {
        return;
    }

    public async verifyEmail(correlationId: string, recipientId: string, code: string): Promise<void> {

        let settings = this._settings.find(s => s.id == recipientId);

        if (settings && settings.ver_code == code) {
            settings.verified = true;
            settings.ver_code = null;
        }
            
        return;
    }

}