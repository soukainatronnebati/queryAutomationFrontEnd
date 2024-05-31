import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { CommonModule, NgForOf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgxPaginationModule } from "ngx-pagination";
import {query} from "@angular/animations";

@Component({
  selector: 'app-habiliter-utilisateur',
  templateUrl: './habiliter-utilisateur.component.html',
  styleUrl: './habiliter-utilisateur.component.css'
})
export class HabiliterUtilisateurComponent {
  CUIDs: string[] = [];
  entities: string[][] = [];
  selectedCUID: string = '';
  selectedEntity: string = '';
  selectedEntities: string[] = [];
  queries: { query: string, editMode: boolean }[] = [];

  allEntCodes: string[] = [
    "BJR", "TCD", "WLK", "JR4", "ERT", "TF7", "HD4", "QFY", "TGU", "GYL", "LT7", "NGF", "QSN", "CDN", "AJ9",
    "TCJ", "PWN", "MT4", "VQR", "UIB", "NRK", "CM7", "AJ8", "TXR", "FC4", "NJR", "QVR", "AJ5", "MFT", "DTV", "PK2"
  ];

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      const data = <any[][]>(XLSX.utils.sheet_to_json(ws, { header: 1 }));

      this.CUIDs = data.slice(7, 500).map(row => row[0]).filter(Boolean); // A8 to A500, filter out empty values
      this.entities = data.slice(7, 500).map(row => row.slice(3, 40).filter(Boolean)); // D8 to AN8, filter out empty values
    };
    reader.readAsBinaryString(target.files[0]);
  }
  addNewCUID(newCUIDValue: string) {
    if (newCUIDValue.trim() !== '') {
      this.CUIDs.push(newCUIDValue);
      this.selectedCUID = newCUIDValue; // Sélectionne le nouveau CUID ajouté
      alert('Le CUID a été ajouté avec succès.');
    } else {
      alert('Veuillez saisir un CUID.');
    }
  }

  onCUIDChange() {
    const cuidIndex = this.CUIDs.indexOf(this.selectedCUID);
    if (cuidIndex !== -1) {
      const entitiesString = this.entities[cuidIndex].join(',');
      this.selectedEntity = entitiesString; // Mettre à jour selectedEntity avec les entités du fichier Excel
    } else {
      this.selectedEntity = ''; // Réinitialiser selectedEntity si aucun CUID correspondant n'est trouvé
    }
  }


  generateQuery() {
    this.queries = []; // Clear previous queries

    const allEntCodes = ["BJR", "TCD", "WLK", "JR4", "ERT", "TF7", "HD4", "QFY", "TGU", "GYL", "LT7", "NGF", "QSN", "CDN", "AJ9", "TCJ", "PWN", "MT4", "VQR", "UIB", "NRK", "CM7", "FTeco", "AJ8", "TXR", "FC4", "NJR", "QVR", "AJ5", "FTecoS", "MFT", "ZZZ", "DTV", "PK2"];

    if (this.selectedEntity === 'toutes') {
      allEntCodes.forEach(code => {
        const query = this.createInsertQuery(this.selectedCUID, code);
        this.queries.push({ query, editMode: false });
      });
    } else {
      const entCodes = this.selectedEntity.split(',').map(ent => ent.trim());
      entCodes.forEach(code => {
        const query = this.createInsertQuery(this.selectedCUID, code);
        this.queries.push({ query, editMode: false });
      });
    }
  }

  toggleEditMode(index: number) {
    this.queries[index].editMode = !this.queries[index].editMode;
  }


  createInsertQuery(cuid: string, entCode: string): string {
    return `INSERT INTO UTILISATEUR_MULTI_ENTITE (SELECT UTI_ID FROM UTILISATEURS WHERE UTI_LOGIN IN (UPPER('${cuid}'), LOWER('${cuid}')), (SELECT ENT_ID FROM ENTITE_FT WHERE ENT_CODE = '${entCode}'));`;
  }

  saveQuery(index: number) {
    this.queries[index].editMode = false;
    alert('La requête a été modifiée avec succès.');
  }

  editQuery(index: number) {
    this.queries[index].editMode = true;
  }

  copyQuery(query: string) {
    navigator.clipboard.writeText(query).then(() => {
      alert('Query copied to clipboard');
    });
  }
  exportAllQueries() {
    const allQueries: string[] = [];

    this.CUIDs.forEach((cuid, index) => {
      if (this.selectedEntity.trim().toLowerCase() === 'toutes') {
        this.allEntCodes.forEach(entCode => {
          const query = this.createInsertQuery(cuid, entCode);
          allQueries.push(query);
        });
      } else {
        const entityCodes = this.entities[index];
        entityCodes.forEach(entCode => {
          const query = this.createInsertQuery(cuid, entCode);
          allQueries.push(query);
        });
      }
    });

    const csvContent = allQueries.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'queries.csv';
    a.click();
    URL.revokeObjectURL(url);
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

  //protected readonly query = query;
}
