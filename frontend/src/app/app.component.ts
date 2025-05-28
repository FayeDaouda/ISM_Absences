// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet],
//   templateUrl: './app.component.html'
// })
// export class AppComponent {}


// app.component.ts
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoading = true;

  constructor(private router: Router) {}

  ngOnInit() {
    // Masquer l'écran de chargement après la navigation
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.isLoading = false;
        }, 100); // Court délai pour s'assurer que le composant est chargé
      }
    });

    // Masquer l'écran de chargement initial après un court délai
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }
}