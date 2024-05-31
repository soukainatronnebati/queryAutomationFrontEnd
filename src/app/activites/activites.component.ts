import {Component, ElementRef, Renderer2} from '@angular/core';
import {NgForOf} from "@angular/common";
import {Router, RouterLink, RouterModule} from "@angular/router";

@Component({
  selector: 'app-activites',
  templateUrl: './activites.component.html',
  styleUrl: './activites.component.css'
})
export class ActivitesComponent {

  //créer une liste des actions
  actions : Array<any> =[
    {title:"Liste des codes activités","route":"activites", icon : "house"},
    {title:"Ajouter un code Activité","route":"AddActivite", icon : "search"},
    {title:"Modifier un code Activité","route":"newProduct", icon : "save"},
    {title:"Associer l’activité avec un domaine","route":"/activites", icon : "save"},



  ];
  currentAction :any;
  // il garde tjr action courante
  constructor(private route:Router){}

  generateQuery() {
    //Fonction JavaScript pour générer la requête
  }

}
