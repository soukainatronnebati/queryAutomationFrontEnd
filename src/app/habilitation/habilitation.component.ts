import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import {NgForOf} from "@angular/common";
@Component({
  selector: 'app-habilitation',
  templateUrl: './habilitation.component.html',
  styleUrl: './habilitation.component.css'
})
export class HabilitationComponent {

  ExcelData: any[] = [];
  email: string = '';
  constructor() { }


  ReadExcel(event: any) {
    let files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      let fileReader = new FileReader();
      fileReader.readAsBinaryString(files[i]);
      fileReader.onload = (e) => {
        let workBook = XLSX.read(fileReader.result, { type: 'binary' });
        let sheet = workBook.Sheets[workBook.SheetNames[0]];

        // Récupérer l'email à partir de la cellule B3
        let emailCell = sheet['B3'].v;
        // Supprimer le caractère * à la fin de l'email
        this.email = emailCell.replace(/\*$/, '');

        let row = 6;
        let SIUDs = [];
        let allEndWithZero = true;
        while (sheet['A' + row]) {
          // Récupérer le SIUD et supprimer les espaces
          let SIUD = sheet['A' + row].v.trim();

          // Vérifier si le SIUD se termine par 0
          if (!/0$/.test(SIUD)) {
            allEndWithZero = false;
          }

          SIUDs.push(SIUD);
          row++;
        }

        if (allEndWithZero) {
          console.log("Fichier erroné: Tous les SIUD se terminent par 0");
        } else {
          // Créer une chaîne CSV avec le séparateur ';' et ajouter les données à ExcelData
          SIUDs.forEach(SIUD => {
            this.ExcelData.push({ SIUD: SIUD, Email: this.email });
          });
        }
      }
    }

  }


  exportToCSV() {
    const header = ['siud', 'email']; // Entêtes en minuscules

    const csvContent = header.join(';') + '\n' +
      this.ExcelData.map(row => Object.values(row).join(';')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'Modification-Mails.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);

    link.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  }
  generateUpdateQueries() {
    // Créer un tableau pour stocker les requêtes de modification
    let updateQueries: string[] = [];

    // Parcourir les données du premier fichier CSV (ExcelData)
    this.ExcelData.forEach(row => {
      // Générer la requête de modification pour chaque SIUD avec son email correspondant
      let query = `UPDATE utilisateurs SET uti_email='${row.Email}' WHERE uti_login='${row.SIUD}';`;
      updateQueries.push(query);
    });

    // Convertir les requêtes en une chaîne CSV
    const csvContent = updateQueries.join('\n');

    // Créer un fichier CSV contenant les requêtes de modification
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Créer un objet URL pour le téléchargement du fichier CSV
    const url = window.URL.createObjectURL(blob);

    // Créer un élément d'ancrage pour le téléchargement du fichier CSV
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'Requete_update.csv'); // Renommer le fichier CSV
    link.style.visibility = 'hidden';
    document.body.appendChild(link);

    // Simuler un clic sur le lien pour démarrer le téléchargement
    link.click();

    // Libérer l'URL et supprimer l'élément d'ancrage
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  }
  generateSelectQueries() {
    // Créer un tableau pour stocker les SIUD
    let siudArray: string[] = [];

    // Parcourir les données du premier fichier CSV (ExcelData) et stocker les SIUD dans siudArray
    this.ExcelData.forEach(row => {
      siudArray.push(row.SIUD);
    });

    // Générer la requête SELECT avec une clause IN contenant tous les SIUD
    let query = `SELECT * FROM utilisateurs WHERE uti_login IN ('${siudArray.join("','")}');`;

    // Créer un fichier CSV contenant la requête SELECT
    const csvContent = query;

    // Créer un objet Blob à partir du contenu CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Créer un objet URL pour le téléchargement du fichier CSV
    const url = window.URL.createObjectURL(blob);

    // Créer un élément d'ancrage pour le téléchargement du fichier CSV
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'requete_select.csv'); // Nom du fichier CSV
    link.style.visibility = 'hidden';
    document.body.appendChild(link);

    // Simuler un clic sur le lien pour démarrer le téléchargement
    link.click();

    // Libérer l'URL et supprimer l'élément d'ancrage
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  }




}
