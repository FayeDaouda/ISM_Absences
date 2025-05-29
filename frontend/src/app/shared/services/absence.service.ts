import { Injectable } from '@angular/core';
import { Absence } from '../models/absence.model';

@Injectable({ providedIn: 'root' })
export class AbsenceService {
  private absences: Absence[] = [
    {
      id: 1,
      nom: 'Diop',
      prenom: 'Lamine',
      date: '2025-05-20',
      etat: 'en_attente',
      description: 'Problème de santé, demande envoyée.',
      justificatifUrl: '/assets/justif-alice.pdf'
    },
    {
      id: 2,
      nom: 'Diagne',
      prenom: 'Issa',
      date: '2025-05-18',
      etat: 'justifiee',
      description: 'Voyage scolaire avec document fourni.',
      justificatifUrl: '/assets/justif-jean.pdf'
    },
    {
      id: 3,
      nom: 'Ndour',
      prenom: 'Kiki',
      date: '2025-05-15',
      etat: 'non_justifiee',
      description: 'Absence non justifiée, pas de document.',
      justificatifUrl: ''
    },
    {
      id: 4,
      nom: 'Faye',
      prenom: 'Daouda',
      date: '2025-05-10',
      etat: 'justifiee',
      description: 'Rendez-vous médical, justificatif fourni.',
      justificatifUrl: '/assets/justif-marc.pdf'
    },
    {
      id: 5,
      nom: 'Dia',
      prenom: 'Ibou',
      date: '2025-05-08',
      etat: 'en_attente',
      description: 'Demande en cours de traitement.',
      justificatifUrl: ''
    }
  ];

  getAll(): Absence[] {
    return this.absences;
  }

  getById(id: number): Absence | undefined {
    return this.absences.find(a => a.id === id);
  }
}
