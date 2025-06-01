import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface pour les données venant du backend
interface AbsenceBackend {
  nonEtudiant: string;
  prenomEtudiant: string;
  classeEtudiant: string;
  sessionId: string;
  type: 'ABSENCE' | 'PRESENT' | 'RETARD';
  justifiee: boolean;
}

// Interface pour l'affichage frontend
interface Absence {
date: any;
  id?: string;
  nom: string;
  prenom: string;
  classe: string;
  sessionId: string;
  type: string;
  etat: 'Justifié(e)' | 'En attente' | 'Non justifié(e)';
  dateAbsence?: string;
  justificationId?: string;
}

// Interface pour la réponse paginée du backend
interface BackendResponse {
  status: number;
  results: AbsenceBackend[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  first: boolean;
  last: boolean;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {
  private apiUrl = 'http://localhost:8080/api/pointages'; // URL de votre backend

  constructor(private http: HttpClient) {}

  // Récupérer toutes les absences avec pagination
  getAllAbsences(page: number = 0, size: number = 10): Observable<BackendResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<BackendResponse>(`${this.apiUrl}/absences`, { params });
  }

  // Récupérer tous les pointages avec pagination
  getAllPointages(page: number = 0, size: number = 10): Observable<BackendResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<BackendResponse>(`${this.apiUrl}`, { params });
  }

  // Récupérer une absence spécifique
  getAbsenceById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Créer une nouvelle absence
  createAbsence(absenceData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, absenceData);
  }

  // Pointer un étudiant
  pointerEtudiant(sessionId: string, etudiantId: string): Observable<any> {
    const params = new HttpParams()
      .set('sessionId', sessionId)
      .set('etudiantId', etudiantId);

    return this.http.post(`${this.apiUrl}/pointer`, null, { params });
  }

  // Pointer un étudiant par matricule
  pointerEtudiantByMatricule(sessionId: string, matricule: string): Observable<any> {
    const params = new HttpParams()
      .set('sessionId', sessionId)
      .set('matricule', matricule);

    return this.http.post(`${this.apiUrl}/pointerByMatricule`, null, { params });
  }
}

@Component({
  selector: 'app-absences',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './absences.component.html',
  styleUrls: ['./absences.component.css']
})
export class AbsencesComponent implements OnInit {

  // Infos utilisateur
  userDisplayName = 'Lucien da Souza';
  userRole = 'Administrateur';
  userInitials = 'LS';

  // Recherche et pagination
  searchTerm = '';
  currentPage = 0; // Backend utilise une pagination basée sur 0
  itemsPerPage = 5;
  totalPages = 1;
  totalItems = 0;

  // Données
  absences: Absence[] = [];
  filteredAbsences: Absence[] = [];
  isLoading = false;
  errorMessage = '';

  // Filtres
  showOnlyAbsences = true; // true = absences seulement, false = tous les pointages

  constructor(
    private router: Router,
    private absenceService: AbsenceService
  ) {}

  ngOnInit(): void {
    this.loadAbsences();
  }

  // Charger les absences depuis le backend
  loadAbsences(): void {
    this.isLoading = true;
    this.errorMessage = '';

    const serviceCall = this.showOnlyAbsences 
      ? this.absenceService.getAllAbsences(this.currentPage, this.itemsPerPage)
      : this.absenceService.getAllPointages(this.currentPage, this.itemsPerPage);

    serviceCall.subscribe({
      next: (response: BackendResponse) => {
        console.log('Réponse du backend:', response);
        
        if (response.status === 200) {
          this.absences = this.mapBackendToFrontend(response.results);
          this.applyClientSideFilter();
          this.totalPages = response.totalPages;
          this.totalItems = response.totalItems;
          this.currentPage = response.currentPage;
        } else {
          this.errorMessage = 'Erreur lors du chargement des données';
        }
        
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement:', error);
        this.errorMessage = 'Impossible de charger les absences. Vérifiez la connexion au serveur.';
        this.isLoading = false;
        
        // En cas d'erreur, afficher des données de test
        this.loadMockData();
      }
    });
  }

  // Mapper les données du backend vers le format frontend
  private mapBackendToFrontend(backendData: AbsenceBackend[]): Absence[] {
  return backendData.map(item => ({
    nom: item.nonEtudiant || 'N/A',
    prenom: item.prenomEtudiant || 'N/A',
    classe: item.classeEtudiant || 'N/A',
    sessionId: item.sessionId,
    type: item.type,
    etat: this.getEtatFromTypeAndJustification(item.type, item.justifiee),
    dateAbsence: new Date().toLocaleDateString('fr-FR'),
    justificationId: item.justifiee ? 'justified' : undefined,
    date: new Date() // ou n'importe quelle date par défaut ou réelle
  }));
}


  // Déterminer l'état d'affichage basé sur le type et la justification
  private getEtatFromTypeAndJustification(type: string, justifiee: boolean): 'Justifié(e)' | 'En attente' | 'Non justifié(e)' {
    if (type === 'ABSENCE') {
      return justifiee ? 'Justifié(e)' : 'Non justifié(e)';
    } else if (type === 'RETARD') {
      return justifiee ? 'Justifié(e)' : 'En attente';
    }
    return 'Non justifié(e)';
  }

  // Données de test en cas d'erreur de connexion
  private loadMockData(): void {
    this.absences = [
      {
        nom: 'Bathily',
        prenom: 'Aboubacar',
        classe: 'L3 GLRS',
        sessionId: 'session-1',
        type: 'ABSENCE',
        etat: 'Justifié(e)',
        dateAbsence: '25/03/2025',
        justificationId: '1',
        date: undefined
      },
      {
        nom: 'Faye',
        prenom: 'Daouda',
        classe: 'L2 GESTION',
        sessionId: 'session-2',
        type: 'ABSENCE',
        etat: 'En attente',
        dateAbsence: '22/03/2025',
        justificationId: '2',
        date: undefined
      }
    ];
    this.applyClientSideFilter();
    this.totalPages = 1;
    this.totalItems = this.absences.length;
  }

  // Appliquer le filtre côté client (pour la recherche)
  private applyClientSideFilter(): void {
    const search = this.searchTerm.trim().toLowerCase();
    
    if (search) {
      this.filteredAbsences = this.absences.filter(abs =>
        abs.nom.toLowerCase().includes(search) ||
        abs.prenom.toLowerCase().includes(search) ||
        abs.classe.toLowerCase().includes(search) ||
        abs.etat.toLowerCase().includes(search)
      );
    } else {
      this.filteredAbsences = [...this.absences];
    }
  }

  // Changer le type d'affichage (absences seulement vs tous les pointages)
  toggleViewType(): void {
    this.showOnlyAbsences = !this.showOnlyAbsences;
    this.currentPage = 0;
    this.loadAbsences();
  }

  // Navigation entre les pages
  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadAbsences();
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadAbsences();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadAbsences();
    }
  }

  // Recherche
  onSearchChange(): void {
    this.applyClientSideFilter();
  }

  // Navigation dans l'app
  navigateToHome(): void {
    this.router.navigate(['/dashboard']);
  }

  navigateToAbsences(): void {
    // Déjà sur cette page
  }

  navigateToEtudiants(): void {
    this.router.navigate(['/etudiants']);
  }

  deconnexion(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  // Voir les détails d'une absence
  voirDetails(absence: Absence): void {
    console.log('Voir détails absence:', absence);
    
    if (absence.justificationId) {
      console.log('Navigation vers justification ID:', absence.justificationId);
      this.router.navigate(['/justification-detail', absence.justificationId]);
    } else {
      this.showAbsenceDetails(absence);
    }
  }

  showAbsenceDetails(absence: Absence): void {
    const message = `Détails de l'absence:

Nom: ${absence.nom}
Prénom: ${absence.prenom}
Classe: ${absence.classe}
Session: ${absence.sessionId}
Type: ${absence.type}
État: ${absence.etat}

${absence.etat === 'Non justifié(e)' ? 'Cette absence n\'a pas été justifiée.' : ''}`;

    alert(message);
  }

  // Getter pour les numéros de page
  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }

  // Rafraîchir les données
  refresh(): void {
    this.loadAbsences();
  }

  // Méthodes de tracking pour les performances Angular
  trackByAbsenceId(index: number, absence: Absence): string {
    return absence.sessionId + absence.nom + absence.prenom;
  }

  trackByPageNumber(index: number, page: number): number {
    return page;
  }
}