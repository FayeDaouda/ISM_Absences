import { Component, Input} from '@angular/core';
import { Router} from '@angular/router';
import { Observable } from 'rxjs';
import { EtudiantModel } from '../../shared/models/etudiant.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-etudiant',
  imports: [CommonModule],
  templateUrl: './etudiant.component.html',
  styleUrl: './etudiant.component.css'
})

export class EtudiantComponent {
  @Input({
    alias : "etudiant", 
    required: true
  }) etudiant!: EtudiantModel;

  constructor(private router : Router ) {
  }

  etudiant$:Observable<EtudiantModel[]> = new Observable();
  protected readonly Array = Array;
}

