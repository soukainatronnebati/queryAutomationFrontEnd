import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActiviteComponent } from './add-activite.component';

describe('AddActiviteComponent', () => {
  let component: AddActiviteComponent;
  let fixture: ComponentFixture<AddActiviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddActiviteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddActiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
