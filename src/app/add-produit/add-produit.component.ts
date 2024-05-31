import { Component } from '@angular/core';
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NgxPaginationModule} from "ngx-pagination";

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrl: './add-produit.component.css'
})
export class AddProduitComponent {
  proCode: string = '';
  queries: any[] = [];

  generateQuery() {
    const code = this.proCode;
    const updates = [
      'PRO_IS_FIBRE=1',
      'PRO_ANALYSE_ESSAI=1',
      'PRO_CONTROLE_ESSAI=1',
      'PRO_CONTROLE_ESSAI_HAUT_DEBIT=1',
      'PRO_MASQUAGE_PRIX_CLIENT=1'
    ];

    const updateQuery = `UPDATE PRODUITS SET ${updates.join(', ')} WHERE PRO_CODE='${code}';`;

    this.queries = [
      { type: 'SELECT', champ: 'Tous', requete: `SELECT * FROM PRODUITS WHERE PRO_CODE='${code}';`, editMode: false },
      { type: 'UPDATE', champ: 'Multiple', requete: updateQuery, editMode: false }
    ];
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

  toggleEditMode(index: number) {
    this.queries[index].editMode = !this.queries[index].editMode;
  }

  deleteQuery(index: number) {
    this.queries.splice(index, 1);
  }

  extractQueries() {
    const csvContent = 'data:text/csv;charset=utf-8,' +
      this.queries.map(query => `${query.requete}`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'queries.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
