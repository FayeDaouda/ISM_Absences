// modules.component.ts
import { Component, OnInit, OnDestroy, TrackByFunction } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { Subscription } from 'rxjs';

interface Module {
  id: string;
  nom: string;
  code: string;
  enseignant: string;
  horaires: string;
  nombreEtudiants: number;
  presents: number;
  absents: number;
  couleur: string;
}

interface Filiere {
  id: string;
  nom: string;
  description: string;
  nombreEtudiants: number;
  nombreModules: number;
  couleur: string;
}

interface Etudiant {
  id: string;
  nom: string;
  prenom: string;
  matricule: string;
  classe: string;
  presente: boolean;
  motifAbsence?: string;
  dateAbsence?: string;
}

@Component({
  standalone: true,
  selector: 'app-modules',
  imports: [CommonModule],
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css']
})
export class ModulesComponent implements OnInit, OnDestroy {
justifierAbsence(_t218: any) {
throw new Error('Method not implemented.');
}
currentFilter: any;
filteredEtudiants: any;
    trackByEtudiantId!: TrackByFunction<any>;
setFilter(arg0: string) {
throw new Error('Method not implemented.');
}
  filiere: Filiere | null = null;
  filiereId: string = '';
  selectedModule: Module | null = null;
  currentView: 'filieres' | 'modules' | 'etudiants' = 'filieres';
  currentUser: User | null = null;
  private subscription = new Subscription();

  // Liste des filières
  filieres: Filiere[] = [
    {
      id: 'informatique',
      nom: 'Informatique',
      description: 'Formation en développement et systèmes informatiques',
      nombreEtudiants: 145,
      nombreModules: 8,
      couleur: 'bg-blue-500'
    },
    {
      id: 'gestion',
      nom: 'Gestion',
      description: 'Management et administration des entreprises',
      nombreEtudiants: 98,
      nombreModules: 6,
      couleur: 'bg-green-500'
    },
    {
      id: 'marketing',
      nom: 'Marketing',
      description: 'Stratégies commerciales et communication',
      nombreEtudiants: 76,
      nombreModules: 7,
      couleur: 'bg-purple-500'
    },
    {
      id: 'ressources-humaines',
      nom: 'Ressources Humaines',
      description: 'Gestion du personnel et développement RH',
      nombreEtudiants: 54,
      nombreModules: 5,
      couleur: 'bg-pink-500'
    },
    {
      id: 'logistique',
      nom: 'Logistique',
      description: 'Transport et gestion de la chaîne logistique',
      nombreEtudiants: 67,
      nombreModules: 6,
      couleur: 'bg-yellow-500'
    },
    {
      id: 'maintenance',
      nom: 'Maintenance Industrielle',
      description: 'Maintenance et réparation des équipements',
      nombreEtudiants: 43,
      nombreModules: 7,
      couleur: 'bg-red-500'
    }
  ];

  // Modules par filière
  modulesByFiliere: { [key: string]: Module[] } = {
    'informatique': [
      {
        id: 'dev-web',
        nom: 'Développement Web',
        code: 'INFO-301',
        enseignant: 'Dr. Mamadou Fall',
        horaires: 'Lun-Mer 8h-10h',
        nombreEtudiants: 45,
        presents: 38,
        absents: 7,
        couleur: 'bg-blue-500'
      },
      {
        id: 'base-donnees',
        nom: 'Base de Données',
        code: 'INFO-302',
        enseignant: 'Prof. Aissatou Diop',
        horaires: 'Mar-Jeu 10h-12h',
        nombreEtudiants: 42,
        presents: 35,
        absents: 7,
        couleur: 'bg-indigo-500'
      },
      {
        id: 'algo-prog',
        nom: 'Algorithmique et Programmation',
        code: 'INFO-303',
        enseignant: 'Dr. Ousmane Sow',
        horaires: 'Lun-Ven 14h-16h',
        nombreEtudiants: 48,
        presents: 42,
        absents: 6,
        couleur: 'bg-cyan-500'
      },
      {
        id: 'sys-info',
        nom: 'Systèmes d\'Information',
        code: 'INFO-304',
        enseignant: 'Prof. Fatou Ba',
        horaires: 'Mer-Ven 8h-10h',
        nombreEtudiants: 40,
        presents: 32,
        absents: 8,
        couleur: 'bg-teal-500'
      }
    ],
    'gestion': [
      {
        id: 'comptabilite',
        nom: 'Comptabilité Générale',
        code: 'GEST-201',
        enseignant: 'Dr. Ibrahima Ndiaye',
        horaires: 'Lun-Mer 9h-11h',
        nombreEtudiants: 35,
        presents: 30,
        absents: 5,
        couleur: 'bg-green-500'
      },
      {
        id: 'finance',
        nom: 'Finance d\'Entreprise',
        code: 'GEST-202',
        enseignant: 'Prof. Aminata Sall',
        horaires: 'Mar-Jeu 14h-16h',
        nombreEtudiants: 32,
        presents: 28,
        absents: 4,
        couleur: 'bg-emerald-500'
      },
      {
        id: 'management',
        nom: 'Management Stratégique',
        code: 'GEST-203',
        enseignant: 'Dr. Moussa Thiam',
        horaires: 'Ven 10h-14h',
        nombreEtudiants: 31,
        presents: 26,
        absents: 5,
        couleur: 'bg-lime-500'
      }
    ],
    'marketing': [
      {
        id: 'marketing-digital',
        nom: 'Marketing Digital',
        code: 'MARK-301',
        enseignant: 'Prof. Khadija Diallo',
        horaires: 'Lun-Mer 10h-12h',
        nombreEtudiants: 28,
        presents: 25,
        absents: 3,
        couleur: 'bg-purple-500'
      },
      {
        id: 'communication',
        nom: 'Communication d\'Entreprise',
        code: 'MARK-302',
        enseignant: 'Dr. Cheikh Sy',
        horaires: 'Mar-Jeu 8h-10h',
        nombreEtudiants: 25,
        presents: 22,
        absents: 3,
        couleur: 'bg-violet-500'
      }
    ]
  };

  // Étudiants par module (simulation de données)
  etudiantsByModule: { [key: string]: Etudiant[] } = {
    'dev-web': [
      { id: '1', nom: 'Diop', prenom: 'Amadou', matricule: 'INF2021001', classe: 'L3 INFO', presente: true },
      { id: '2', nom: 'Fall', prenom: 'Fatou', matricule: 'INF2021002', classe: 'L3 INFO', presente: true },
      { id: '3', nom: 'Ndiaye', prenom: 'Moussa', matricule: 'INF2021003', classe: 'L3 INFO', presente: false, motifAbsence: 'Maladie', dateAbsence: '2025-05-30' },
      { id: '4', nom: 'Sow', prenom: 'Aissatou', matricule: 'INF2021004', classe: 'L3 INFO', presente: true },
      { id: '5', nom: 'Ba', prenom: 'Ibrahim', matricule: 'INF2021005', classe: 'L3 INFO', presente: false, motifAbsence: 'Absence non justifiée', dateAbsence: '2025-05-30' }
    ],
    'base-donnees': [
      { id: '6', nom: 'Thiam', prenom: 'Mariama', matricule: 'INF2021006', classe: 'L3 INFO', presente: true },
      { id: '7', nom: 'Gueye', prenom: 'Ousmane', matricule: 'INF2021007', classe: 'L3 INFO', presente: false, motifAbsence: 'Rendez-vous médical', dateAbsence: '2025-05-30' },
      { id: '8', nom: 'Diouf', prenom: 'Khady', matricule: 'INF2021008', classe: 'L3 INFO', presente: true }
    ]
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.authService.currentUser$.subscribe({
        next: (user) => {
          this.currentUser = user;
        },
        error: (error) => {
          console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        }
      })
    );

    // Vérifier s'il y a des paramètres de route
    this.route.params.subscribe(params => {
      if (params['filiereId']) {
        this.filiereId = params['filiereId'];
        this.filiere = this.filieres.find(f => f.id === this.filiereId) || null;
        this.currentView = 'modules';
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Sélectionner une filière et afficher ses modules
  selectFiliere(filiere: Filiere): void {
    this.filiere = filiere;
    this.filiereId = filiere.id;
    this.currentView = 'modules';
    console.log('Filière sélectionnée:', filiere.nom);
  }

  // Sélectionner un module et afficher la liste des étudiants
  selectModule(module: Module): void {
    this.selectedModule = module;
    this.currentView = 'etudiants';
    console.log('Module sélectionné:', module.nom);
  }

  // Retourner à la vue précédente
  goBack(): void {
    if (this.currentView === 'etudiants') {
      this.currentView = 'modules';
      this.selectedModule = null;
    } else if (this.currentView === 'modules') {
      this.currentView = 'filieres';
      this.filiere = null;
      this.filiereId = '';
    }
  }

  // Obtenir les modules de la filière sélectionnée
  get currentModules(): Module[] {
    if (!this.filiereId) return [];
    return this.modulesByFiliere[this.filiereId] || [];
  }

  // Obtenir les étudiants du module sélectionné
  get currentEtudiants(): Etudiant[] {
    if (!this.selectedModule) return [];
    return this.etudiantsByModule[this.selectedModule.id] || [];
  }

  // Obtenir les étudiants présents
  get etudiantsPresents(): Etudiant[] {
    return this.currentEtudiants.filter(e => e.presente);
  }

  // Obtenir les étudiants absents
  get etudiantsAbsents(): Etudiant[] {
    return this.currentEtudiants.filter(e => !e.presente);
  }

  // Navigation
  navigateToAccueil(): void {
    this.router.navigate(['/dashboard']);
  }

  navigateToAbsences(): void {
    this.router.navigate(['/absences']);
  }

  navigateToEtudiants(): void {
    this.router.navigate(['/etudiants']);
  }

  // Déconnexion
  deconnexion(): void {
    try {
      console.log('Déconnexion en cours...');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  }

  // Getters pour l'affichage des informations utilisateur
  get userDisplayName(): string {
    if (!this.currentUser) return 'Lucien da Souza';
    return `${this.currentUser.prenom || ''} ${this.currentUser.nom || ''}`.trim();
  }

  get userRole(): string {
    if (!this.currentUser) return 'Administrateur';
    return this.currentUser.role === 'admin' ? 'Administrateur' : 
           this.currentUser.role || 'Utilisateur';
  }

  get userInitials(): string {
    if (!this.currentUser) return 'LS';
    const prenom = this.currentUser.prenom || '';
    const nom = this.currentUser.nom || '';
    return `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase() || 'UI';
  }

  // Marquer un étudiant comme présent/absent
  togglePresence(etudiant: Etudiant): void {
    etudiant.presente = !etudiant.presente;
    if (etudiant.presente) {
      etudiant.motifAbsence = undefined;
      etudiant.dateAbsence = undefined;
    } else {
      etudiant.dateAbsence = new Date().toISOString().split('T')[0];
    }
    console.log(`État de présence de ${etudiant.prenom} ${etudiant.nom} modifié:`, etudiant.presente);
  }

  // Ajouter un motif d'absence
  addMotifAbsence(etudiant: Etudiant, motif: string): void {
    if (!etudiant.presente) {
      etudiant.motifAbsence = motif;
      console.log(`Motif d'absence ajouté pour ${etudiant.prenom} ${etudiant.nom}:`, motif);
    }
  }
}