import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabiliterUtilisateurComponent } from './habiliter-utilisateur.component';

describe('HabiliterUtilisateurComponent', () => {
  let component: HabiliterUtilisateurComponent;
  let fixture: ComponentFixture<HabiliterUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabiliterUtilisateurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HabiliterUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
