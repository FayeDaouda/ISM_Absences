import { Observable } from "rxjs";
import { Justification } from "../models/justification.model";

export interface IJustificationService {
    getAllJustifications(): Observable<Justification> ;
    getByAbsenceId(absenceId: string): Observable<Justification> ;
    traiterJustification(absenceId: string, statut: 'VALIDEE' | 'REFUSEE'): Observable<any>;
}
