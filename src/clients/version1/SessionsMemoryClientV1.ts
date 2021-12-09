import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';

import { SessionV1 } from './SessionV1';
import { ISessionsClientV1 } from './ISessionsClientV1';

export class SessionsMemoryClientV1 implements ISessionsClientV1 {
    private _sessions: SessionV1[] = [];

    public async getSessions(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<SessionV1>> {

        return new DataPage(this._sessions, this._sessions.length);
    }
    
    public async getSessionById(correlationId: string, sessionId: string): Promise<SessionV1> {

        let session = this._sessions.find((d) => d.id == sessionId);

        return session;
    }

    public async openSession(correlationId: string, user_id: string, user_name: string,
        address: string, client: string, user: any, data: any): Promise<SessionV1> {

        let session = new SessionV1(null, user_id, user_name, address, client);
        session.user = user;
        session.data = data;

        this._sessions.push(session);

        return session;
    }
    
    public storeSessionData(correlationId: string, sessionId: string, data: any): Promise<SessionV1> {
        return null;
    }
    
    public async updateSessionUser(correlationId: string, sessionId: string, user: any): Promise<SessionV1> {

        let session = this._sessions.find((d) => d.id == sessionId);
        if (session)
            session.user = user;

        return session;
    }
    
    public async closeSession(correlationId: string, sessionId: string): Promise<SessionV1> {

        let session = this._sessions.find((d) => d.id == sessionId);
        if (session)
            session.active = false;
    
        return session;
    }

    public async deleteSessionById(correlationId: string, sessionId: string): Promise<SessionV1> {

        let session = this._sessions.find((d) => d.id == sessionId);
        if (session)
            this._sessions = this._sessions.filter((d) => d.id != sessionId);
    
        return session;
    }
}
