// justifications-list.component.ts - Page pour afficher toutes les justifications
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Justification {
  id: number;
  nom: string;
  prenom: string;
  classe: string;
  motif: string;
  dateAbsence: string;
  statut: 'en_attente' | 'valide' | 'invalide';
  email?: string;
  matricule?: string;
  document?: string;
  dateJustification?: string;
}

@Component({
  selector: 'app-justifications-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './justifications-list.component.html',
  styleUrls: ['./justifications-list.component.css']
})
export class JustificationsListComponent implements OnInit {
navigateToAccueil() {
throw new Error('Method not implemented.');
}

  // Informations utilisateur
  userDisplayName = 'Lucien da Souza';
  userRole = 'Administrateur';
  userInitials = 'LS';

  // Recherche et pagination
  searchTerm = '';
  currentPage = 1;
  itemsPerPage = 6;
  totalPages = 1;

  // Filtres
  selectedStatut = 'tous'; // 'tous', 'en_attente', 'valide', 'invalide'

  justifications: Justification[] = [
    {
      id: 1,
      nom: 'Gueye',
      prenom: 'Adja',
      classe: 'L3GLAS',
      motif: 'Maladie',
      dateAbsence: 'Samedi pour 3',
      statut: 'en_attente',
      email: 'adja.gueye@ism.edu.sn',
      matricule: 'Mat09460',
      document: 'Je suis tombé malade avec une forte fièvre...',
      dateJustification: '2024-01-15'
    },
    {
      id: 2,
      nom: 'Sall',
      prenom: 'Aaly Mohamed',
      classe: 'M2IT2510',
      motif: 'En retard par faute de transport',
      dateAbsence: 'Lundi 14 Janvier',
      statut: 'en_attente',
      email: 'aaly.sall@ism.edu.sn',
      matricule: 'Mat09461',
      document: 'Le transport en commun était en panne...',
      dateJustification: '2024-01-15'
    },
    {
      id: 3,
      nom: 'Ba',
      prenom: 'Ana',
      classe: 'L2TREK',
      motif: 'Absence pour Rendez-vous à l\'hôpital',
      dateAbsence: 'Vendredi 12 Janvier',
      statut: 'en_attente',
      email: 'ana.ba@ism.edu.sn',
      matricule: 'Mat09462',
      document: 'J\'avais un rendez-vous médical urgent...',
      dateJustification: '2024-01-13'
    },
    {
      id: 4,
      nom: 'Diop',
      prenom: 'Pape Mbaye',
      classe: 'M1 FINANCE',
      motif: 'Problème familial',
      dateAbsence: '02/02/2025',
      statut: 'en_attente',
      email: 'pape.diop@ism.edu.sn',
      matricule: 'Mat09463',
      document: 'J\'ai dû m\'occuper de ma grand-mère...',
      dateJustification: '2024-01-11'
    },
    {
      id: 5,
      nom: 'Fall',
      prenom: 'Maimouna',
      classe: 'L3 MARKETING',
      motif: 'Certificat médical',
      dateAbsence: '15/04/2025',
      statut: 'valide',
      email: 'maimouna.fall@ism.edu.sn',
      matricule: 'Mat09464',
      document: 'Certificat médical joint...',
      dateJustification: '2024-01-10'
    },
    {
      id: 6,
      nom: 'Thiam',
      prenom: 'Omar',
      classe: 'L2 INFO',
      motif: 'Problème de transport',
      dateAbsence: '10/04/2025',
      statut: 'invalide',
      email: 'omar.thiam@ism.edu.sn',
      matricule: 'Mat09465',
      document: 'Le bus était en panne...',
      dateJustification: '2024-01-09'
    }
  ];
Math: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.calculatePagination();
  }

  // Navigation
  navigateToHome(): void {
    console.log('Navigation vers dashboard');
    this.router.navigate(['/dashboard']);
  }

  navigateToAbsences(): void {
    console.log('Navigation vers absences');
    this.router.navigate(['/absences']);
  }

  navigateToEtudiants(): void {
    console.log('Navigation vers étudiants');
    this.router.navigate(['/etudiants']);
  }

  deconnexion(): void {
    console.log('Déconnexion en cours...');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  // Filtrage des justifications
  get filteredJustifications(): Justification[] {
    const search = this.searchTerm.trim().toLowerCase();
    
    let result = this.justifications;

    // Filtrer par statut
    if (this.selectedStatut !== 'tous') {
      result = result.filter(just => just.statut === this.selectedStatut);
    }

    // Filtrer par terme de recherche
    if (search) {
      result = result.filter(just =>
        just.nom.toLowerCase().includes(search) ||
        just.prenom.toLowerCase().includes(search) ||
        just.classe.toLowerCase().includes(search) ||
        just.motif.toLowerCase().includes(search)
      );
    }

    this.totalPages = Math.max(1, Math.ceil(result.length / this.itemsPerPage));
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return result.slice(startIndex, startIndex + this.itemsPerPage);
  }

  calculatePagination(): void {
    const search = this.searchTerm.trim().toLowerCase();
    let list = this.justifications;

    // Appliquer les filtres
    if (this.selectedStatut !== 'tous') {
      list = list.filter(just => just.statut === this.selectedStatut);
    }

    if (search) {
      list = list.filter(just =>
        just.nom.toLowerCase().includes(search) ||
        just.prenom.toLowerCase().includes(search) ||
        just.classe.toLowerCase().includes(search) ||
        just.motif.toLowerCase().includes(search)
      );
    }

    this.totalPages = Math.max(1, Math.ceil(list.length / this.itemsPerPage));
  }

  // Pagination
  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // Actions sur les justifications
  voirDetails(justification: Justification): void {
    console.log('Navigation vers détails justification:', justification.id);
    this.router.navigate(['/justification-detail', justification.id]);
  }

  validerJustification(justification: Justification, event: Event): void {
    event.stopPropagation(); // Empêcher la propagation du clic
    
    console.log('Validation rapide justification:', justification.id);
    justification.statut = 'valide';
    
    alert('Justification validée avec succès !');
    
    // Ici, appeler votre service pour mettre à jour en base
    // this.justificationService.updateStatus(justification.id, 'valide');
  }

  invaliderJustification(justification: Justification, event: Event): void {
    event.stopPropagation(); // Empêcher la propagation du clic
    
    console.log('Invalidation rapide justification:', justification.id);
    justification.statut = 'invalide';
    
    alert('Justification rejetée !');
    
    // Ici, appeler votre service pour mettre à jour en base
    // this.justificationService.updateStatus(justification.id, 'invalide');
  }

  // Événements de recherche et filtrage
  onSearchChange(): void {
    this.currentPage = 1;
    this.calculatePagination();
  }

  onStatutChange(): void {
    this.currentPage = 1;
    this.calculatePagination();
  }

  // Méthodes utilitaires
  getStatusBadgeClass(statut: string): string {
    switch (statut) {
      case 'en_attente': return 'badge-warning';
      case 'valide': return 'badge-success';
      case 'invalide': return 'badge-danger';
      default: return 'badge-secondary';
    }
  }

  getStatusText(statut: string): string {
    switch (statut) {
      case 'en_attente': return 'En attente';
      case 'valide': return 'Validé';
      case 'invalide': return 'Rejeté';
      default: return statut;
    }
  }

  // Statistiques
  get statsEnAttente(): number {
    return this.justifications.filter(j => j.statut === 'en_attente').length;
  }

  get statsValidees(): number {
    return this.justifications.filter(j => j.statut === 'valide').length;
  }

  get statsRejetees(): number {
    return this.justifications.filter(j => j.statut === 'invalide').length;
  }

  // Fonction de tracking pour ngFor (optimisation des performances)
  trackByJustificationId(index: number, justification: Justification): number {
    return justification.id;
  }

  // Méthodes additionnelles utiles
  
  // Exporter les justifications (optionnel)
  exportToCSV(): void {
    const csvData = this.justifications.map(j => ({
      'Nom': j.nom,
      'Prénom': j.prenom,
      'Classe': j.classe,
      'Motif': j.motif,
      'Date Absence': j.dateAbsence,
      'Statut': this.getStatusText(j.statut),
      'Email': j.email || '',
      'Matricule': j.matricule || '',
      'Date Justification': j.dateJustification || ''
    }));
    
    console.log('Export CSV:', csvData);
    // Ici vous pouvez implémenter la logique d'export CSV
  }

  // Actualiser les données
  refreshData(): void {
    console.log('Actualisation des données...');
    // Ici vous pouvez recharger les données depuis votre service
    // this.justificationService.getAllJustifications().subscribe(data => {
    //   this.justifications = data;
    //   this.calculatePagination();
    // });
  }

  // Sélection multiple (optionnel pour actions en lot)
  selectedJustifications: Set<number> = new Set();

  toggleSelection(id: number): void {
    if (this.selectedJustifications.has(id)) {
      this.selectedJustifications.delete(id);
    } else {
      this.selectedJustifications.add(id);
    }
  }

  isSelected(id: number): boolean {
    return this.selectedJustifications.has(id);
  }

  selectAll(): void {
    this.filteredJustifications.forEach(j => this.selectedJustifications.add(j.id));
  }

  deselectAll(): void {
    this.selectedJustifications.clear();
  }

  // Actions en lot
  validerSelection(): void {
    if (this.selectedJustifications.size === 0) {
      alert('Aucune justification sélectionnée');
      return;
    }

    const confirmed = confirm(`Valider ${this.selectedJustifications.size} justification(s) ?`);
    if (confirmed) {
      this.justifications.forEach(j => {
        if (this.selectedJustifications.has(j.id)) {
          j.statut = 'valide';
        }
      });
      this.selectedJustifications.clear();
      alert('Justifications validées avec succès !');
    }
  }

  invaliderSelection(): void {
    if (this.selectedJustifications.size === 0) {
      alert('Aucune justification sélectionnée');
      return;
    }

    const confirmed = confirm(`Rejeter ${this.selectedJustifications.size} justification(s) ?`);
    if (confirmed) {
      this.justifications.forEach(j => {
        if (this.selectedJustifications.has(j.id)) {
          j.statut = 'invalide';
        }
      });
      this.selectedJustifications.clear();
      alert('Justifications rejetées !');
    }
  }
}