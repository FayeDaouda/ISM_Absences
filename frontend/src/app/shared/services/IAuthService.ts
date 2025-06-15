import { Observable } from "rxjs";
import { Role } from "../models/user.model";

export interface IAuthService {
    Login(login: string, motDePasse: string): Observable<any>;
    Logout(): void;
    isAuthenticated(): boolean;
    isAdmin(): boolean;
    hasRole(role : Role): boolean;
}
