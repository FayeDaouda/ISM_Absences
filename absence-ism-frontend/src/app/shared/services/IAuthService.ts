import { Observable } from "rxjs";
import { LoginResponse, Role } from "../models/user.model";

export interface IAuthService {

    
    Login(username: string, password: string): Observable<LoginResponse>;
    Logout(): void;
    isAuthenticated(): boolean;
    isAdmin(): boolean;
    hasRole(role : Role): boolean;

}