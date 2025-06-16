import { Component, OnInit, inject, signal } from '@angular/core';
import { SessionService } from '../../../shared/services/impl/session.service';
import { Session } from '../../../shared/models/session.model';
import { Router, RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sessions',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor],
  templateUrl: './sessions.component.html',
})
export class SessionsComponent implements OnInit {
  private sessionService = inject(SessionService);
  sessions = signal<Session[]>([]);
  
  constructor(private router : Router ) { }

  ngOnInit(): void {
    this.sessionService.getSessionsDuJour().subscribe({
      next: (data: any) => {
        console.log('API response:', data);

        if (Array.isArray(data)) {
          this.sessions.set(data); // ✅ Cas 1
        } else if ('results' in data && Array.isArray(data.results)) {
          this.sessions.set(data.results); // ✅ Cas 2
        } else if ('data' in data && Array.isArray(data.data)) {
          this.sessions.set(data.data); // ✅ Cas 3
        } else {
          console.warn('Format de réponse API non reconnu.');
          this.sessions.set([]);
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement des sessions :', err);
        this.sessions.set([]);
      },
    });
  }

  session$:Observable<Session[]> = new Observable();
  

  onLoadListeAbsences(sessionId: string) {
    this.router.navigate([`/admin/sessions/${sessionId}/absences`]);
  }
}
