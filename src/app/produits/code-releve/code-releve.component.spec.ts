import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeReleveComponent } from './code-releve.component';

describe('CodeReleveComponent', () => {
  let component: CodeReleveComponent;
  let fixture: ComponentFixture<CodeReleveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeReleveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CodeReleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
