import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeJustificationsEnAttenteComponent } from './liste-justifications-en-attente.component';

describe('ListeJustificationsEnAttenteComponent', () => {
  let component: ListeJustificationsEnAttenteComponent;
  let fixture: ComponentFixture<ListeJustificationsEnAttenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeJustificationsEnAttenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeJustificationsEnAttenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
