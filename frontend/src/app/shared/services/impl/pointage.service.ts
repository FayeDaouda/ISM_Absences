import { Observable } from "rxjs";
import { Pointage } from "../../models/pointage.model";
import { IPointageService } from "../IPoitageService";
import { HttpClient } from "@angular/common/http";

export class PointageService implements IPointageService{
  private apiUrl = 'https://gestion-absence-ism-dev.onrender.com/api/web/pointages';

  constructor(private http: HttpClient) { }

  getAllPointages(): Observable<any> {
      return this.http.get<any>(this.apiUrl);
    } 
    getAllPointagesDuneSessionDuJour(id: string): Observable<any> {
      return this.http.get<any>(`https://gestion-absence-ism-dev.onrender.com/api/web/sessions/${id}/absences`);
    }
    getAllAbsences(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/absences`);
    }
    getAllPointagesByEtudiantId(IdEtudiant: String): Observable<Pointage> {
      return this.http.get<any>(`${this.apiUrl}/${IdEtudiant}`);
    } 
    getById(Id: number): Observable<Pointage> {
      return this.http.get<any>(`${this.apiUrl}/${Id}`);
    }
}