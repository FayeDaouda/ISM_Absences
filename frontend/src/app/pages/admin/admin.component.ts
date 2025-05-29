import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { NavebarComponent } from '../../shared/components/navebar/navebar.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet,NavebarComponent, SidebarComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
