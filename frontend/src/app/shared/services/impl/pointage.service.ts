import { Observable } from "rxjs";
import { Pointage } from "../../models/pointage.model";
import { IPointageService } from "../IPoitageService";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class PointageService implements IPointageService{
  private apiUrl = 'https://gestion-absence-ism-dev.onrender.com/api/web/pointages';

  constructor(private http: HttpClient) { }

  getAllPointages(): Observable<any> {
      return this.http.get<any>(this.apiUrl);
    } 
    getAllPointagesDuneSessionDuJour(sessionId: string): Observable<any> {
      return this.http.get<any>(`https://gestion-absence-ism-dev.onrender.com/api/web/sessions/${sessionId}/absences`);
    }
    getAllAbsences(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/absences`);
    }
    getAllPointagesByEtudiantId(IdEtudiant: String): Observable<Pointage> {
      return this.http.get<any>(`${this.apiUrl}/${IdEtudiant}`);
    } 
    getById(id: string): Observable<Pointage> {
      return this.http.get<any>(`${this.apiUrl}/${id}`);
    }
}