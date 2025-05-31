import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAbsenceDuJourComponent } from './liste-absence-du-jour.component';

describe('ListeAbsenceDuJourComponent', () => {
  let component: ListeAbsenceDuJourComponent;
  let fixture: ComponentFixture<ListeAbsenceDuJourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeAbsenceDuJourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeAbsenceDuJourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
