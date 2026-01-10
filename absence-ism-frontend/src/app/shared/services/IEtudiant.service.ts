import { Injectable } from '@angular/core';
import { EtudiantModel } from '../models/etudiant.model';
import { Observable, of } from 'rxjs';

export interface IEtudiantService {
    getAllEtudiants(): Observable<EtudiantModel[]> ;
    getById(Id: number): Observable<EtudiantModel> ;
    getListeAbsences(IdEtudiant: number): Observable<EtudiantModel> ;

    
}
