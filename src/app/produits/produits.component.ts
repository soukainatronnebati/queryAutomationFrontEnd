import {Component, ElementRef, Renderer2} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {Route, Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrl: './produits.component.css'
})
export class ProduitsComponent {

  //créer une liste des actions
  actions : Array<any> =[
    {title:"Liste des Produits","route":"produits", icon : "house"},
    {title:"Ajouter Produit","route":"AddProduits", icon : "search"},
    {title:"Modifier Produit","route":"newProduct", icon : "save"},
    {title:"Ajouter le ou les codes relèves à autoriser ","route":"/codeReleve", icon : "save"},

  ];
  currentAction :any;

  // il garde tjr action courante


  constructor(private route:Router){}

  generateQuery() {
    //Fonction JavaScript pour générer la requête
  }

  afficherCodesReleves(elementRef: ElementRef, renderer: Renderer2): void {
    const domaine = (<HTMLSelectElement>elementRef.nativeElement.querySelector("#domaine")).value;
    const structureCodeReleve = elementRef.nativeElement.querySelector("#structureCodeReleve");

    // Réinitialiser la structure du code de relevé
    structureCodeReleve.innerHTML = "";

    // Ajouter la structure du code de relevé en fonction du domaine sélectionné
    switch (domaine) {
      case "maintenance":
        const ul = renderer.createElement("ul");
        renderer.appendChild(structureCodeReleve, renderer.createText("Structure du code de relevé pour Maintenance :"));
        renderer.appendChild(structureCodeReleve, renderer.createElement("br"));
        const liItems = ["ABS - Absent avisé", "ANC - Annulation commande par client final", "ANN - Annulation de la commande", "DEF - Intervention définitive", "DFA - Defaut sur le support", "DIA - Diagnostic Initial Affiné"];
        liItems.forEach(item => {
          const li = renderer.createElement("li");
          renderer.appendChild(li, renderer.createText(`"${item}"`));
          renderer.appendChild(ul, li);
        });
        renderer.appendChild(structureCodeReleve, ul);
        break;
      // Ajouter d'autres cas pour les autres domaines ici
    }
  }

  afficherComposant(elementRef: ElementRef, renderer: Renderer2): void {
    const autreComposant = elementRef.nativeElement.querySelector("#autreComposant");
    renderer.setStyle(autreComposant, 'display', 'block');
  }

}
