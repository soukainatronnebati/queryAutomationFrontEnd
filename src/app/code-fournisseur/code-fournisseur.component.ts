import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import {NgForOf} from "@angular/common";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import {findIndex} from "rxjs";
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {RouterModule} from "@angular/router";

interface ExcelData {
  etlCode: string;
  entId: string;
  entCode: string;
  siFournisseur: string;
}

@Component({
  selector: 'app-code-fournisseur',
  templateUrl: './code-fournisseur.component.html',
  styleUrls: ['./code-fournisseur.component.css']
})
export class CodeFournisseurComponent {

  constructor(private http: HttpClient) {}

  etlCode: string = '';
  entId: string = '';
  entCode: string[] = [];
  siFournisseur: string = '';
  counter: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 5; // Définir le nombre d'éléments par page ici

  queries: { type: string, champ: string, requete: string, editMode: boolean }[] = [];
  QueryVersionForm: { type: string, champ: string, requete: string, editMode: boolean } = { type: 'Mettre à jour', champ: 'VERSION_FORMULAIRES', requete: '', editMode: false };
  Query3: { type: string, champ: string, requete: string, editMode: boolean } = { type: 'Mettre à jour', champ: 'ETL_ENVOI_REFERENTIEL_VQSE', requete: '', editMode: false };
  Query4: { type: string, champ: string, requete: string, editMode: boolean } = { type: 'select', champ: 'ETL_CODE', requete: '', editMode: false };
  Query5: { type: string, champ: string, requete: string, editMode: boolean } = { type: 'select', champ: 'ETL_ID', requete: '', editMode: false };
  Query6: { type: string, champ: string, requete: string, editMode: boolean } = { type: 'select', champ: 'ENT_ID , ETL_ID', requete: '', editMode: false };
  Query7: { type: string, champ: string, requete: string, editMode: boolean } = { type: 'Mettre à jour', champ: 'VALIDATION_FACTURE_AUTO', requete: '', editMode: false };
  Query8: { type: string, champ: string, requete: string, editMode: boolean } = { type: 'Mettre à jour', champ: 'ETL_SFTP_LOGIN, ETL_SFTP_PASSWD, ETL_REP_ERREUR_DT', requete: '', editMode: false };

  entIdMap: { [key: string]: string } = {
    // Mapping des codes ENT_ID aux valeurs correspondantes
    "BJR": "209",
    "TCD": "252",
    "WLK": "210",
    "JR4": "214",
    "ERT": "218",
    "TF7": "219",
    "HD4": "220",
    "QFY": "202",
    "TGU": "204",
    "GYL": "205",
    "LT7": "206",
    "NGF": "207",
    "QSN": "213",
    "CDN": "222",
    "AJ9": "225",
    "TCJ": "231",
    "PWN": "1",
    "MT4": "2",
    "VQR": "208",
    "UIB": "211",
    "NRK": "221",
    "CM7": "224",
    "FTeco": "99",
    "AJ8": "230",
    "TXR": "212",
    "FC4": "217",
    "NJR": "223",
    "QVR": "216",
    "AJ5": "226",
    "FTecoS": "272",
    "MFT": "227",
    "ZZZ": "293",
    "DTV": "203",
    "PK2": "228"
  };
  etlIdMap: { [key: string]: string } = {
    "ETL_CODE":"ETL_ID",
    "SDDOCC":"9664",
    "CSTPOT":"7488",
    "20B018":"8138",
    "20B019":"8139",
    "SERFIM":"8233",
    "SCPNAT":"9601",
    "AXMGSE":"8826",
    "SADE92":"2275",
    "CSTPIC":"3133",
    "CO2SE4":"9270",
    "CI1SE5":"9271",
    "GR1SE8":"9277",
    "VDOCOR":"1028",
    "DL1SE9":"9279",
    "SL1SO4":"9289",
    "SG2SO5":"9292",
    "CI1IF1":"9293",
    "SL1IF2":"9297",
    "SG1RM1":"9299",
    "SG2RM1":"9300",
    "SL2AG2":"9308",
    "ETL2eco2":"100",
    "CO1AG7":"9316",
    "SYNAQU":"1228",
    "SL1AG8":"9318",
    "VERIDF":"8433",
    "QUALPL":"5828",
    "ENGGSE":"9320",
    "NGDEST":"9598",
    "ALQPOT":"5968",
    "SL7IF2":"9604",
    "CODPRM":"9661",
    "AVATH":"2314",
    "SPIFIB":"5761",
    "SL8SO4":"9606",
    "CI2NE3":"9252",
    "EIFEST":"7288",
    "20B032":"8142",
    "ILLEBR":"3558",
    "SD1NE4":"9253",
    "CAMGUA":"8556",
    "APFPIC":"5180",
    "SD2NE4":"9254",
    "SOGNPC":"2888",
    "IN1SE3":"9267",
    "SG1RM3":"9303",
    "SG2RM3":"9304",
    "CO1AG1":"9305",
    "CO2AG1":"9306",
    "SL1AG2":"9307",
    "CO1AG4":"9311",
    "UTILPL":"5740",
    "CO2AG4":"9312",
    "SL1AG5":"9313",
    "CO2AZ5":"9314",
    "CO1AG6":"9315",
    "CO2AZ6":"9317",
    "SMARTF":"7693",
    "SOGPUB":"3438",
    "PROTF7":"8867",
    "FAUCHE":"8927",
    "SNEFCO":"8928",
    "CATPIC":"5200",
    "KICREU":"3638",
    "INEFTH":"5460",
    "CIPNAT":"9602",
    "NGDNCE":"9618",
    "ETLeco":"99",
    "INBTHD":"7171",
    "ALYPOT":"7528",
    "PXOTST":"7529",
    "SOLU30":"7733",
    "SPBTHD":"7172",
    "CONSRD":"570",
    "SPIECN":"9187",
    "ACAPHC":"4218",
    "CO1GO1":"9255",
    "SP1GO2":"9257",
    "CI2GO2":"9258",
    "IN2SE3":"9268",
    "LSBPL":"748",
    "CIRMAR":"3718",
    "ECOCG4":"6188",
    "INEOBG":"6468",
    "SADAQU":"6708",
    "KYOPES":"9640",
    "AXIREU":"7590",
    "VINCOM":"7833",
    "PRSVIA":"7873",
    "INFCOM":"7973",
    "SOGCEM":"8481",
    "HERTHE":"8684",
    "AXIANS":"8745",
    "AXUISO":"9207",
    "CO2NE2":"9250",
    "VI2GO1":"9256",
    "CONPOT":"6208",
    "SGTLPC":"6768",
    "VINCEM":"7128",
    "CIRCEM":"7913",
    "CNSGUY":"7793",
    "SOTPOT":"7468",
    "APFAMS":"6288",
    "TIBCOM":"7894",
    "VI2IF2":"9298",
    "NEWREU":"7549",
    "SADEST":"6588",
    "SADCEM":"7148",
    "SFCREU":"7569",
    "VINNDF":"7993",
    "VINCSE":"8393",
    "APFNDF":"8536",
    "EIFGUA":"8557",
    "ENGIE":"8644",
    "TUNZIN":"8645",
    "CITEL":"8724",
    "SSISVC":"8786",
    "S30PTF":"9167",
    "IN1SE1":"9263",
    "SD1SE7":"9275",
    "SD2SE7":"9276",
    "GR2SE8":"9278",
    "CI1S10":"9281",
    "CI2S10":"9282",
    "IN1SO2":"9285",
    "IN2SO2":"9286",
    "SD1SO3":"9287",
    "SG2IF1":"9294",
    "KYEIDF":"9295",
    "VINCBR":"6988",
    "INETF7":"7428",
    "EIFFSE":"7673",
    "SOGEST":"7854",
    "20B015":"8135",
    "20B017":"8137",
    "STRREU":"8558",
    "SPIIDF":"8578",
    "SLDOCC":"9663",
    "CI2SE5":"9272",
    "APFLYO":"6068",
    "SPICEM":"7933",
    "CAPEST":"6548",
    "AXIOCC":"9147",
    "SD1NE1":"9247",
    "SD2NE1":"9248",
    "CI1GO4":"9261",
    "IN2SE1":"9264",
    "CO1SE4":"9269",
    "SYNOCC":"9319",
    "SONEG":"7268",
    "E.P.S.":"7408",
    "SPIPDL":"7448",
    "20B020":"8140",
    "CIBTHD":"7168",
    "VIBTHD":"7169",
    "SOBTHD":"7170",
    "FERIDF":"7228",
    "CIRLPC":"7813",
    "20B016":"8136",
    "20B023":"8141",
    "SMAFIB":"8598",
    "INEONP":"8768",
    "CO1NE2":"9249",
    "CI1NE3":"9251",
    "SG1GO3":"9259",
    "SP2GO3":"9260",
    "DL2SE9":"9280",
    "SG1SO1":"9283",
    "SG2SO1":"9284",
    "SD2SO3":"9288",
    "SL2SO4":"9290",
    "SG1SO5":"9291",
    "CIEIDF":"9296",
    "INESPC":"9389",
    "CSTSPC":"9391",
    "INENSU":"9413",
    "RCGROU":"9441",
    "KY4IF2":"9462",
    "APFEST":"9463",
    "CI2GO4":"9468",
    "CI1SE2":"9469",
    "CIRSPC":"9491",
    "VIP2IF":"9509",
    "SADGOS":"9548",
    "SL2SE6":"9553",
    "BEGDOO":"9574",
    "NGDPRM":"9599",
    "SBHAG3":"9359",
    "SG3GO1":"9379",
    "KY3GO3":"9382",
    "KY3GO4":"9383",
    "NG3SEC":"9386",
    "EETSPC":"9390",
    "SGTSSU":"9416",
    "SADNSU":"9419",
    "CI2SE2":"9470",
    "VIP2SO":"9492",
    "SNP2ES":"9493",
    "SD4NE4":"9550",
    "SD5NE4":"9551",
    "SD0NAT":"9555",
    "GRPNAT":"9603",
    "SGTNSU":"9420",
    "KY4IF1":"9461",
    "SMAEST":"9464",
    "CI3SOB":"9487",
    "CIRSSU":"9490",
    "INDPRM":"9600",
    "CIDPRM":"9662",
    "CIRGOS":"9393",
    "INESSU":"9414",
    "SADSSU":"9418",
    "KY1RM2":"9466",
    "CI3SEB":"9486",
    "ANRNDF":"9488",
    "SOGGOS":"9549",
    "CO2GO1":"9554",
    "SL7SO4":"9605",
    "SDOPES":"9639",
    "NGGDOO":"9641",
    "PROEST":"9465",
    "KY2RM2":"9467",
    "CIRNSU":"9489",
    "AIDSBT":"9508",
    "SL1SE6":"9552",
    "AGGPRM":"9595",
    "SGDOCC":"9665",
    "POCORA":"9339",
    "NG3NEA":"9380",
    "SG3GO2":"9381",
    "CO3SEA":"9384",
    "CO3SOA":"9387",
    "ARTOCC":"9528",
    "VIGPRM":"9594",
    "SLGPRM":"9596",
    "SEGPRM":"9597",
    "CIOPES":"9638"
  };

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


  // Méthode pour récupérer l'ETL_ID à partir de l'ETL_CODE
  getEtlId(etlCode: string): string {
    return this.etlIdMap[etlCode];
  }

  generateQueryVersionForm() {
    // Construction de la partie de la requête pour les ENT_CODE
    let entCodeCondition = this.entCode.map(code => `'${code}'`).join(', ');
    this.QueryVersionForm.requete = `UPDATE ETL_FT SET VERSION_FORMULAIRES='S5F0' WHERE ETL_ID = (SELECT ETL_ID FROM ETL WHERE ETL_CODE='${this.etlCode}')
    AND ENT_ID in (SELECT ENT_ID FROM ENTITE_FT WHERE ENT_CODE IN (${entCodeCondition}));`;
  }

  generateQueriesFromExcelData() {
    this.Query3.requete = `UPDATE ETL SET ETL_ENVOI_REFERENTIEL_VQSE=1 WHERE ETL_CODE='${this.etlCode}';`;
    this.Query4.requete = `select * from ETL WHERE ETL_CODE = '${this.etlCode}';`;
    let etlId = this.etlIdMap[this.etlCode];
    this.Query5.requete = `select * from ETL_FT WHERE ETL_ID = '${etlId}';`; // Utilisation de l'ETL_ID associé au ETL_CODE
    // Récupérer les ENT_ID associés aux ENT_CODE
    let entIds = this.entCode.map(code => this.entIdMap[code]);

    // Construire la requête pour Query6 avec les ENT_ID et l'ETL_ID correspondant
    this.Query6.requete = `select * from ETL_FT WHERE ENT_ID in (${entIds.map(id => `'${id}'`).join(', ')}) and ETL_ID = '${etlId}';`;
    this.Query7.requete = `UPDATE ETL_FT SET VALIDATION_FACTURE_AUTO = 0 WHERE ENT_ID in (${entIds.map(id => `'${id}'`).join(', ')}) and ETL_ID = '${etlId}';`;
    this.Query8.requete = `UPDATE ETL_FT SET ETL_SFTP_LOGIN='SET', ETL_SFTP_PASSWD='20BEE010', ETL_REP_ERREUR_DT='OUT' WHERE ETL_ID = '${etlId}' AND ENT_ID in (${entIds.map(id => `'${id}'`).join(', ')});`;

  }


  ReadExcel(event: any) {
    let files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      let fileReader = new FileReader();
      fileReader.readAsBinaryString(files[i]);
      fileReader.onload = (e) => {
        let workBook = XLSX.read(fileReader.result, {type: 'binary'});
        let sheet = workBook.Sheets[workBook.SheetNames[0]];

        this.etlCode = sheet['B14'].v;
        this.entId = sheet['B7'].v;
        this.siFournisseur = sheet['B20'].v;

        for (let row = 29; row <= 39; row++) {
          this.entCode.push(sheet['A' + row].v);
        }
      }
    }
  }

  generateUniqueId(): string {
    return 'entCode' + this.counter++;
  }

  generateQuery() {
    // Générer la requête en utilisant les valeurs des entités fournies
    // Exemple de requête:
    this.queries = [{
      type: 'Mettre à jour',
      champ: 'ETL_SEUIL_APPEL_TAM',
      requete: `UPDATE ETL SET ETL_SEUIL_APPEL_TAM=200 WHERE ETL_CODE = '${this.etlCode}';`,
      editMode: false
    }];
    this.generateQueryVersionForm();
    this.queries.push(this.QueryVersionForm);

    this.generateQueriesFromExcelData();
    this.queries.push(this.Query3);
    this.queries.push(this.Query4);
    this.queries.push(this.Query5);
    this.queries.push(this.Query6);
    this.queries.push(this.Query7);
    this.queries.push(this.Query8);
  }


  toggleEditMode(index: number) {
    this.queries[index].editMode = !this.queries[index].editMode;
  }



  deleteQuery(index: number) {
    this.queries.splice(index, 1);
  }


    modifyQuery(index: number, type: string, champ: string, requete: string) {
      this.queries[index].type = type;
      this.queries[index].champ = champ;
      this.queries[index].requete = requete;
      this.queries[index].editMode = false; // Désactive le mode d'édition après la modification

      // Afficher une alerte pour indiquer que la modification a été effectuée avec succès
      alert('La requête a été modifiée avec succès !');
    }
  copyQuery(requete: string) {
    // Copier la valeur du champ "Requête"
    navigator.clipboard.writeText(requete)
      .then(() => {
        // Vous pouvez ajouter ici une confirmation ou une action supplémentaire après la copie
        alert('La requête a été copiée avec succès !');
      })
      .catch((error) => {
        // Gérer l'erreur ou afficher un message à l'utilisateur si la copie a échoué
        alert('Une erreur est survenue lors de la copie de la requête : ' + error);
      });
  }

  extractQueries() {
    const csvContent = this.queries.map(query => `"${query.requete}"`).join('\n');
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
