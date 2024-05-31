import {Component, ElementRef, Renderer2} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";


@Component({
  selector: 'app-code-releve',
  templateUrl: './code-releve.component.html',
  styleUrl: './code-releve.component.css'
})
export class CodeReleveComponent {

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

  Domaines:any = [
    {id: 1, name:"Maintenance"},
    {id:2, name:"Production"},
    {id: 3, name: "Etudes"},
    {id: 4, name: "Autres"}
  ]

  ShowCode(id: number) {

  }

}


