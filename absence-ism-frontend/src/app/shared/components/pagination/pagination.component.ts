import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})

export class PaginationComponent {
  @Input() pages: number[] = [];
  @Input() currentPage: number = 0; 
  @Output() onPageChange = new EventEmitter<number>(); 

  goToPage(page: number) {
    if (page >= 0 && page < this.pages.length) {
      this.onPageChange.emit(page);
    }
  }
}
