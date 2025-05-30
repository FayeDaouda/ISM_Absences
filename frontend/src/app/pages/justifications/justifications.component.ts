// justification-detail.component.ts - Version corrigée
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
}

@Component({
  selector: 'app-justification-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './justifications.component.html',
  styleUrls: ['./justifications.component.css']
})
export class JustificationsComponent implements OnInit {
  
  justification: Justification | null = null;
  isProcessing = false;

  // Informations utilisateur
  userInitials = 'LS';
  userDisplayName = 'Lucien da Souza';
  userRole = 'Administrateur';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadJustification();
  }

  loadJustification(): void {
    // Récupérer l'ID depuis les paramètres de route
    const justificationId = this.route.snapshot.paramMap.get('id');
    console.log('ID récupéré depuis la route:', justificationId);
    
    if (justificationId) {
      // Récupérer les détails de la justification
      this.justification = this.getMockJustification(parseInt(justificationId));
      console.log('Justification chargée:', this.justification);
    } else {
      // Si pas d'ID, utiliser des données par défaut
      console.log('Aucun ID fourni, utilisation des données par défaut');
      this.justification = this.getDefaultJustification();
    }
  }

  getMockJustification(id: number): Justification {
    // Données mockées correspondant aux IDs du dashboard et des absences
    const mockJustifications: Justification[] = [
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
        statut: 'En attente'
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
        statut: 'En attente'
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
        statut: 'En attente'
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
        statut: 'En attente'
      }
    ];

    const foundJustification = mockJustifications.find(j => j.id === id);
    console.log('Justification trouvée pour ID', id, ':', foundJustification);
    
    return foundJustification || this.getDefaultJustification();
  }

  getDefaultJustification(): Justification {
    return {
      id: 0,
      nom: 'Faye',
      prenom: 'Daouda',
      classe: 'L3CDSD',
      email: 'daouda.faye1@ism.edu.sn',
      matricule: 'Mat09462',
      motif: 'Absence',
      document: 'Je me suis cassé la jambe en m\'entrainant et n\'ai pas pu me déplacer pour venir en cours.',
      statut: 'En attente'
    };
  }

  validerJustification(): void {
    if (this.isProcessing || !this.justification) return;

    console.log('Validation de la justification:', this.justification.id);
    this.isProcessing = true;

    // Simuler un appel API
    setTimeout(() => {
      if (this.justification) {
        this.justification.statut = 'Validé';
        
        // Ici, vous devriez appeler votre service pour mettre à jour en base
        this.updateJustificationStatus(this.justification.id, 'Validé');
        
        // Afficher un message de succès
        this.showSuccessMessage('Justification validée avec succès !');
        
        // Optionnel : rediriger après validation
        setTimeout(() => {
          this.navigateToAbsences();
        }, 2000);
      }
      
      this.isProcessing = false;
    }, 1500);
  }

  invaliderJustification(): void {
    if (this.isProcessing || !this.justification) return;

    console.log('Invalidation de la justification:', this.justification.id);
    this.isProcessing = true;

    // Simuler un appel API
    setTimeout(() => {
      if (this.justification) {
        this.justification.statut = 'Rejeté';
        
        // Ici, vous devriez appeler votre service pour mettre à jour en base
        this.updateJustificationStatus(this.justification.id, 'Rejeté');
        
        // Afficher un message de succès
        this.showSuccessMessage('Justification rejetée !');
        
        // Optionnel : rediriger après invalidation
        setTimeout(() => {
          this.navigateToAbsences();
        }, 2000);
      }
      
      this.isProcessing = false;
    }, 1500);
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