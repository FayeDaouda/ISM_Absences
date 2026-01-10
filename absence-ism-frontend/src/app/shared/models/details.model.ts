import { SessionModel } from "./session.model";

export interface Details{
    session: SessionModel;
    relatedSessions: SessionModel[];
}