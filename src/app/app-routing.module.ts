import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProduitsComponent} from "./produits/produits.component";
import {AddProduitComponent} from "./add-produit/add-produit.component";
import {ActivitesComponent} from "./activites/activites.component";
import {AddActiviteComponent} from "./add-activite/add-activite.component";
import {ActiviteProduitComponent} from "./activite-produit/activite-produit.component";
import {CodeFournisseurComponent} from "./code-fournisseur/code-fournisseur.component";
import {HabiliterUtilisateurComponent} from "./habiliter-utilisateur/habiliter-utilisateur.component";
import {HabilitationComponent} from "./habilitation/habilitation.component";
import {CodeReleveComponent} from "./produits/code-releve/code-releve.component";
import {ReferencielComponent} from "./referenciel/referenciel.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch:'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent,
    children: [
      { path: 'produits', component: ProduitsComponent,
        children: [
          { path: 'AddProduits', component: AddProduitComponent },
        ]
      },
      { path: 'activites', component: ActivitesComponent,
        children: [
          { path: 'AddActivite', component: AddActiviteComponent },
        ]
      },
    {path : "activites", component : ActivitesComponent,
      children:[
        {path : "AddActivite", component : AddActiviteComponent},
      ]
    },

    {path : "coupleActiviteProduit", component : ActiviteProduitComponent},
    {path : "codeFournisseur", component : CodeFournisseurComponent},
    {path : "HabiliterUtilisateur", component : HabiliterUtilisateurComponent},
    {path : "habilitation", component : HabilitationComponent},
    {path : "codeReleve", component : CodeReleveComponent},
    {path : "Référentiel", component : ReferencielComponent}
  ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
