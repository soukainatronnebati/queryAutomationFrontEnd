import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NgxPaginationModule} from "ngx-pagination";
import {ActiviteProduitComponent} from "./activite-produit/activite-produit.component";
import {AddProduitComponent} from "./add-produit/add-produit.component";
import {CodeFournisseurComponent} from "./code-fournisseur/code-fournisseur.component";
import {HabilitationComponent} from "./habilitation/habilitation.component";
import {HabiliterUtilisateurComponent} from "./habiliter-utilisateur/habiliter-utilisateur.component";
import {HistoriqueComponent} from "./historique/historique.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {ProduitsComponent} from "./produits/produits.component";
import {CodeReleveComponent} from "./produits/code-releve/code-releve.component";
import {CodeSituationComponent} from "./referenciel/code-situation/code-situation.component";
import {ReferencielComponent} from "./referenciel/referenciel.component";
import {ActivitesComponent} from "./activites/activites.component";
import {AddActiviteComponent} from "./add-activite/add-activite.component";
import { HomeComponent } from './home/home.component';
import {LoginComponent} from "./login/login.component";

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    AppComponent,
    NavbarComponent,
    ProduitsComponent,
    CodeReleveComponent,
    ActiviteProduitComponent,
    AddProduitComponent,
    CodeFournisseurComponent,
    HabilitationComponent,
    HabiliterUtilisateurComponent,
    HistoriqueComponent,
    CodeSituationComponent,
    ReferencielComponent,
    ActivitesComponent,
    AddActiviteComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgForOf,
    NgIf,
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,

  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
