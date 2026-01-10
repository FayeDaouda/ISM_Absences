import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { JustificationModel } from '../models/Justification.model';

export interface IJustificationService {
   
    getAllJustifications(): Observable<JustificationModel> ;
    getByAbsenceId(absenceId: number): Observable<JustificationModel> ;
  

    
}
