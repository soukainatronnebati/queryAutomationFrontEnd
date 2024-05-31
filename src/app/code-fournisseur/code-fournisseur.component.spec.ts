import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeFournisseurComponent } from './code-fournisseur.component';
import { NgModule } from '@angular/core';


describe('CodeFournisseurComponent', () => {
  let component: CodeFournisseurComponent;
  let fixture: ComponentFixture<CodeFournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeFournisseurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
