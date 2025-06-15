import { Observable } from "rxjs";
import { Session } from "../models/session.model";

export interface ISessionService {
    getAllSessions(): Observable<Session> ;
    getById(Id: number): Observable<Session> ;
    getSessionsDuJour() : Observable<Session>;

}