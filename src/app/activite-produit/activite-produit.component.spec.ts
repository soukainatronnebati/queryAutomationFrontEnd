import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteProduitComponent } from './activite-produit.component';

describe('ActiviteProduitComponent', () => {
  let component: ActiviteProduitComponent;
  let fixture: ComponentFixture<ActiviteProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiviteProduitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActiviteProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
