import { Component, OnInit, inject, signal } from '@angular/core';
import { SessionService } from '../../../shared/services/impl/session.service';
import { Session } from '../../../shared/models/session.model';
import { RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-sessions',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor],
  templateUrl: './sessions.component.html',
})
export class SessionsComponent implements OnInit {
  private sessionService = inject(SessionService);
  sessions = signal<Session[]>([]);

  ngOnInit(): void {
    this.sessionService.getSessionsDuJour().subscribe({
      next: (data: unknown) => {
        console.log('API response:', data);

        if (Array.isArray(data)) {
          this.sessions.set(data as Session[]);
        } else if (
          typeof data === 'object' &&
          data !== null &&
          'results' in data &&
          Array.isArray((data as any).results)
        ) {
          this.sessions.set((data as any).results as Session[]);
        } else {
          console.warn('Format inattendu de la réponse API');
          this.sessions.set([]);
        }
      },
      error: (err) => {
        console.error('Erreur API:', err);
        this.sessions.set([]);
      },
    });
  }
}
