// justification.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JustificationService, Justification } from '../../services/justification.service';

@Component({
  selector: 'app-justification',
  templateUrl: './justifications.component.html',
  styleUrls: ['./justifications.component.css']
})
export class JustificationComponent implements OnInit {
  
  // Informations utilisateur (à récupérer du service d'authentification)
  userDisplayName: string = 'Lucien da Souza';
  userRole: string = 'Administrateur';
  userInitials: string = 'LS';

  // Données de la justification
  justification: Justification = {
    id: 1,
    nom: 'Faye',
    prenom: 'Daouda',
    classe: 'L3CDSD',
    email: 'daouda.faye1@ism.edu.sn',
    matricule: 'Mat09462',
    motif: 'Absence',
    documentTexte: 'Je me suis cassé la jambe en m\'entrainant...........................',
    dateAbsence: '2024-01-15',
    statut: 'en_attente'
  };

  // État du composant
  loading: boolean = false;
  error: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private justificationService: JustificationService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de la justification depuis les paramètres de route
    const justificationId = this.route.snapshot.paramMap.get('id');
    if (justificationId) {
      this.loadJustification(parseInt(justificationId));
    }
  }

  /**
   * Charger les données de la justification
   */
  loadJustification(id: number): void {
    this.loading = true;
    this.error = '';
    
    this.justificationService.getJustificationById(id).subscribe({
      next: (data: any) => {
        if (data) {
          this.justification = data;
        } else {
          this.error = 'Justification non trouvée';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement de la justification:', err);
        this.error = 'Erreur lors du chargement des données';
        this.loading = false;
        
        // Données de fallback pour les tests
        this.justification = {
          id: id,
          nom: 'Faye',
          prenom: 'Daouda',
          classe: 'L3CDSD',
          email: 'daouda.faye1@ism.edu.sn',
          matricule: 'Mat09462',
          motif: 'Absence',
          documentTexte: 'Je me suis cassé la jambe en m\'entrainant...........................',
          dateAbsence: '2024-01-15',
          statut: 'en_attente'
        };
      }
    });
  }

  /**
   * Valider la justification
   */
  validerJustification(): void {
    if (confirm('Êtes-vous sûr de vouloir valider cette justification ?')) {
      this.loading = true;
      
      this.justificationService.validerJustification(this.justification.id).subscribe({
        next: () => {
          this.justification.statut = 'validee';
          this.loading = false;
          alert('Justification validée avec succès !');
          this.router.navigate(['/dashboard']);
        },
        error: (err: any) => {
          console.error('Erreur lors de la validation:', err);
          this.loading = false;
          alert('Erreur lors de la validation. Veuillez réessayer.');
        }
      });
    }
  }

  /**
   * Invalider la justification
   */
  invaliderJustification(): void {
    if (confirm('Êtes-vous sûr de vouloir invalider cette justification ?')) {
      this.loading = true;
      
      this.justificationService.invaliderJustification(this.justification.id).subscribe({
        next: () => {
          this.justification.statut = 'invalidee';
          this.loading = false;
          alert('Justification invalidée avec succès !');
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Erreur lors de l\'invalidation:', err);
          this.loading = false;
          alert('Erreur lors de l\'invalidation. Veuillez réessayer.');
        }
      });
    }
  }

  /**
   * Navigation vers l'accueil
   */
  navigateToAccueil(): void {
    this.router.navigate(['/dashboard']);
  }

  /**
   * Navigation vers les étudiants
   */
  navigateToEtudiants(): void {
    this.router.navigate(['/etudiants']);
  }

  /**
   * Déconnexion
   */
  deconnexion(): void {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      // Appeler le service de déconnexion
      // this.authService.logout();
      
      // Rediriger vers la page de connexion
      this.router.navigate(['/login']);
    }
  }
}