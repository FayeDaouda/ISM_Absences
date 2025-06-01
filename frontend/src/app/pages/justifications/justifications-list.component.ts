// justifications-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Justification {
  id: number;
  nom: string;
  prenom: string;
  classe: string;
  email: string;
  matricule: string;
  motif: string;
  document: string;
  dateAbsence?: string;
  dateJustification?: string;
  statut: 'En attente' | 'Validé' | 'Rejeté';
  isProcessing?: boolean;
}

interface Absence {
  id: number;
  nom: string;
  prenom: string;
  classe: string;
  email: string;
  matricule: string;
  motif: string;
  dateAbsence: string;
  statut: 'Non justifiée' | 'Justifiée' | 'Rejetée';
}

@Component({
  selector: 'app-justifications-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './justifications-list.component.html',
  styleUrls: ['./justifications-list.component.css']
})
export class JustificationsListComponent implements OnInit {
  
  // Données
  justifications: Justification[] = [];
  filteredJustifications: Justification[] = [];
  
  // Filtres et recherche
  currentFilter: string = 'all';
  searchTerm: string = '';

  // Informations utilisateur
  userInitials = 'LS';
  userDisplayName = 'Lucien da Souza';
  userRole = 'Administrateur';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadJustifications();
    this.filterJustifications();
  }

  loadJustifications(): void {
    // Données mockées - identiques à celles du dashboard et du composant de détail
    this.justifications = [
      {
        id: 1,
        nom: 'Gueye',
        prenom: 'Adja',
        classe: 'L3GLAS',
        email: 'adja.gueye@ism.edu.sn',
        matricule: 'Mat09460',
        motif: 'Maladie',
        document: 'Je suis tombé malade avec une forte fièvre et n\'ai pas pu me lever de mon lit pendant 3 jours. J\'ai consulté un médecin qui m\'a prescrit du repos.',
        dateAbsence: '2024-01-12',
        dateJustification: '2024-01-15',
        statut: 'En attente',
        isProcessing: false
      },
      {
        id: 2,
        nom: 'Faye',
        prenom: 'Daouda',
        classe: 'L2 GESTION',
        email: 'daouda.faye@ism.edu.sn',
        matricule: 'Mat09461',
        motif: 'Rendez-vous médical',
        document: 'J\'avais un rendez-vous médical urgent chez mon dentiste pour une rage de dent qui m\'empêchait de me concentrer.',
        dateAbsence: '2024-01-14',
        dateJustification: '2024-01-15',
        statut: 'En attente',
        isProcessing: false
      },
      {
        id: 3,
        nom: 'Ba',
        prenom: 'Ana',
        classe: 'L2TREK',
        email: 'ana.ba@ism.edu.sn',
        matricule: 'Mat09462',
        motif: 'Absence pour Rendez-vous à l\'hôpital',
        document: 'J\'avais un rendez-vous médical urgent à l\'hôpital pour des examens de routine qui ne pouvaient pas être reportés.',
        dateAbsence: '2024-01-13',
        dateJustification: '2024-01-14',
        statut: 'En attente',
        isProcessing: false
      },
      {
        id: 4,
        nom: 'Diop',
        prenom: 'Pape Mbaye',
        classe: 'M1 FINANCE',
        email: 'pape.diop@ism.edu.sn',
        matricule: 'Mat09463',
        motif: 'Problème familial',
        document: 'J\'ai dû m\'occuper de ma grand-mère qui était hospitalisée en urgence. C\'était une situation familiale qui nécessitait ma présence.',
        dateAbsence: '2024-01-10',
        dateJustification: '2024-01-11',
        statut: 'En attente',
        isProcessing: false
      },
      // Exemples avec différents statuts pour démonstration
      {
        id: 5,
        nom: 'Sarr',
        prenom: 'Fatou',
        classe: 'L1 INFO',
        email: 'fatou.sarr@ism.edu.sn',
        matricule: 'Mat09464',
        motif: 'Maladie',
        document: 'Certificat médical pour grippe.',
        dateAbsence: '2024-01-08',
        dateJustification: '2024-01-09',
        statut: 'Validé',
        isProcessing: false
      },
      {
        id: 6,
        nom: 'Ndiaye',
        prenom: 'Moussa',
        classe: 'L2 COMPTA',
        email: 'moussa.ndiaye@ism.edu.sn',
        matricule: 'Mat09465',
        motif: 'Voyage personnel',
        document: 'Absence pour voyage personnel non justifiée.',
        dateAbsence: '2024-01-05',
        dateJustification: '2024-01-07',
        statut: 'Rejeté',
        isProcessing: false
      }
    ];
  }

  // Méthodes de filtrage
  setFilter(filter: string): void {
    this.currentFilter = filter;
    this.filterJustifications();
  }

  filterJustifications(): void {
    let filtered = this.getAllJustifications();

    // Filtrage par statut
    if (this.currentFilter !== 'all') {
      filtered = filtered.filter(justif => justif.statut === this.currentFilter);
    }

    // Filtrage par terme de recherche
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(justif => 
        justif.nom.toLowerCase().includes(term) ||
        justif.prenom.toLowerCase().includes(term) ||
        justif.classe.toLowerCase().includes(term) ||
        justif.motif.toLowerCase().includes(term) ||
        justif.matricule.toLowerCase().includes(term)
      );
    }

    this.filteredJustifications = filtered;
  }

  // Méthodes d'accès aux données
  getAllJustifications(): Justification[] {
    return this.justifications || [];
  }

  getFilteredJustifications(): Justification[] {
    return this.filteredJustifications || [];
  }

  getJustificationsByStatus(status: string): Justification[] {
    return this.justifications.filter(justif => justif.statut === status);
  }

  // Actions sur les justifications
  voirDetails(justificationId: number): void {
  console.log('Navigation vers détails justification:', justificationId);
  // Correction : utiliser la bonne route définie dans app.routes.ts
  this.router.navigate(['/justifications', justificationId]);
}

  validerJustification(justification: Justification, index: number): void {
  if (justification.isProcessing) return;

  console.log('Validation de la justification:', justification.id);
  justification.isProcessing = true;

  // Simuler un appel API
  setTimeout(() => {
    justification.statut = 'Validé';
    justification.isProcessing = false;
    
    // Mettre à jour le filtrage
    this.filterJustifications();
    
    // Mettre à jour le statut de l'absence correspondante
    this.updateAbsenceStatus(justification, 'Justifiée');
    
    // Mettre à jour la justification en base
    this.updateJustificationStatus(justification.id, 'Validé');
    
    this.showSuccessMessage(`Justification de ${justification.prenom} ${justification.nom} validée avec succès ! L'absence est maintenant justifiée.`);
  }, 1500);
}
    // updateAbsenceStatus(justification: Justification, arg1: string) {
    //     throw new Error('Method not implemented.');
    // }

  invaliderJustification(justification: Justification, index: number): void {
  if (justification.isProcessing) return;

  console.log('Invalidation de la justification:', justification.id);
  justification.isProcessing = true;

  // Simuler un appel API
  setTimeout(() => {
    justification.statut = 'Rejeté';
    justification.isProcessing = false;
    
    // Mettre à jour le filtrage
    this.filterJustifications();
    
    // Mettre à jour le statut de l'absence correspondante
    this.updateAbsenceStatus(justification, 'Rejetée');
    
    // Mettre à jour la justification en base
    this.updateJustificationStatus(justification.id, 'Rejeté');
    
    this.showSuccessMessage(`Justification de ${justification.prenom} ${justification.nom} rejetée ! L'absence reste non justifiée.`);
  }, 1500);
}
   updateAbsenceStatus(justification: Justification, nouveauStatut: 'Justifiée' | 'Rejetée'): void {
  console.log(`Mise à jour de l'absence pour ${justification.prenom} ${justification.nom} - Statut: ${nouveauStatut}`);
  
  // Ici, vous devriez appeler votre service pour mettre à jour l'absence
  // Vous pouvez identifier l'absence par le matricule et la date d'absence
  const absenceData = {
    matricule: justification.matricule,
    dateAbsence: justification.dateAbsence,
    nouveauStatut: nouveauStatut,
    justificationId: justification.id
  };

   // Exemple d'appel de service :
  // this.absenceService.updateAbsenceStatus(absenceData).subscribe({
  //   next: (response) => {
  //     console.log('Absence status updated successfully', response);
  //   },
  //   error: (error) => {
  //     console.error('Error updating absence status', error);
  //     this.showErrorMessage('Erreur lors de la mise à jour du statut de l\'absence');
  //   }
  // });

  // Pour l'instant, juste un log
  console.log('Données pour mise à jour absence:', absenceData);
}
  updateJustificationStatus(id: number, statut: string): void {
    // Ici, implémentez l'appel à votre service
    console.log(`Mise à jour justification ${id} avec statut: ${statut}`);
    
    // Exemple d'appel de service :
    // this.justificationService.updateStatus(id, statut).subscribe({
    //   next: (response) => {
    //     console.log('Status updated successfully', response);
    //   },
    //   error: (error) => {
    //     console.error('Error updating status', error);
    //     this.showErrorMessage('Erreur lors de la mise à jour');
    //   }
    // });
  }

  // Méthodes utilitaires
  getStatusClass(statut: string): string {
    switch (statut) {
      case 'En attente': return 'status-pending';
      case 'Validé': return 'status-validated';
      case 'Rejeté': return 'status-rejected';
      default: return '';
    }
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  showSuccessMessage(message: string): void {
    // Implémentez votre système de notification
    console.log('SUCCESS:', message);
    alert(message); // Remplacer par votre système de notifications
  }

  showErrorMessage(message: string): void {
    // Implémentez votre système de notification d'erreur
    console.log('ERROR:', message);
    alert(message); // Remplacer par votre système de notifications
  }

  // Navigation
  navigateToAccueil(): void {
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
}