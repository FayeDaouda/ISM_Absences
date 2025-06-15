import { Observable } from "rxjs";
import { Pointage } from "../models/pointage.model";

export interface IPointageService {   
    getAllPointages(): Observable<Pointage[]>;
    getAllPointagesByEtudiantId(IdEtudiant: String): Observable<Pointage>;
    getById(Id: number): Observable<Pointage>;
}
