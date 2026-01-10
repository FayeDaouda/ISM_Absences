import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { SessionService } from '../../../shared/services/impl/session.service';
import { SessionModel } from '../../../shared/models/session.model';
import { SessionComponent } from '../../../components/Sessions/session.component';

@Component({
  selector: 'app-sessions',
  standalone: true,
  imports: [CommonModule, SessionComponent],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.css'
})
export class SessionsComponent implements OnInit {
  private sessionsService: SessionService = inject(SessionService);
  sessionsAll: SessionModel[] = [];
  sessionsPerPage: SessionModel[] = [];

  currentPage = 0;
  pageSize = 5
  pages: number[] = [];

  ngOnInit(): void {
    this.sessionsService.getSessionsDuJour()
      .pipe(map(res => res.results))
      .subscribe((data: SessionModel[]) => {
        this.sessionsAll = data;
        this.setupPagination();
        this.goToPage(0);
      });
  }


  setupPagination() {
    const totalPages = Math.ceil(this.sessionsAll.length / this.pageSize);
    this.pages = Array(totalPages).fill(0).map((_, i) => i);
  }

  goToPage(page: number) {
    if (page < 0 || page >= this.pages.length) return;
    this.currentPage = page;
    const start = page * this.pageSize;
    const end = start + this.pageSize;
    this.sessionsPerPage = this.sessionsAll.slice(start, end);
  }
}
