import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeSituationComponent } from './code-situation.component';

describe('CodeSituationComponent', () => {
  let component: CodeSituationComponent;
  let fixture: ComponentFixture<CodeSituationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeSituationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CodeSituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
