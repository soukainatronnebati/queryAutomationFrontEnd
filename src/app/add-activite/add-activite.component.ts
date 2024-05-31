import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {NgxPaginationModule} from "ngx-pagination";

@Component({
  selector: 'app-add-activite',
  templateUrl: './add-activite.component.html',
  styleUrl: './add-activite.component.css'
})
export class AddActiviteComponent {
  actCode: string = '';
  queries: { type: string, champ: string, requete: string, editMode: boolean }[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5; // Définir le nombre d'éléments par page ici

  generateQuery() {
    const code = this.actCode;
    this.queries = [
      { type: 'SELECT', champ: 'Tous', requete: `SELECT * FROM ACTIVITE WHERE ACT_CODE='${code}';`, editMode: false },
      { type: 'UPDATE', champ: 'ACT_CONTROLE_ESSAI', requete: `UPDATE ACTIVITE SET ACT_CONTROLE_ESSAI =1 where  ACT_CODE ='${code}';`, editMode: false },
      { type: 'UPDATE', champ: 'ACT_MASQUAGE_PRIX_CLIENT', requete: `UPDATE ACTIVITE SET ACT_MASQUAGE_PRIX_CLIENT =1 where  ACT_CODE='${code}';`, editMode: false },
      { type: 'UPDATE', champ: 'ACT_NON_RENSEIGNE', requete: `UPDATE ACTIVITE SET ACT_NON_RENSEIGNE=1 where  ACT_CODE='${code}';`, editMode: false },
    ];
  }

  toggleEditMode(index: number) {
    this.queries[index].editMode = !this.queries[index].editMode;
  }
  escapeHtml(unsafe: string): string {
    return unsafe.replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  highlightSQL(query: string): string {
    const keywords = ['SELECT', 'UPDATE', 'INSERT', 'DELETE', 'FROM', 'WHERE', 'AND', 'OR', 'IN', 'SET', 'VALUES', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'ON', 'GROUP BY', 'ORDER BY', 'ASC', 'DESC', 'LIMIT'];
    let coloredQuery = query.replace(
      new RegExp('\\b(' + keywords.join('|') + ')\\b', 'gi'),
      '<span class="text-primary">$1</span>'
    );
    coloredQuery = coloredQuery.replace(
      /'[^']*'/g,
      '<span class="text-success">$&</span>'
    );
    return coloredQuery;
  }

  copyQuery(query: string) {
    const textarea = document.createElement('textarea');
    textarea.value = query;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Requête copiée dans le presse-papiers!');
  }



  deleteQuery(index: number) {
    this.queries.splice(index, 1);
  }

  extractQueries() {
    const csvContent = this.queries.map(query => query.requete).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'queries.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
