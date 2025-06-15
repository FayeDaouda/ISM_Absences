import { Observable } from "rxjs";
import { Etudiant } from "../models/etudiant.model";

export interface IEtudiantService {
    getAllEtudiants(): Observable<Etudiant[]> ;
    getById(Id: string): Observable<Etudiant> ;
    getListeAbsences(etudiantId: string): Observable<Etudiant> ; 
}
