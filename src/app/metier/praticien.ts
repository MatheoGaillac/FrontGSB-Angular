export class Praticien {

  public id_praticien: number = 0;
  public type_praticien: any = {};
  public id_type_praticien: number = 0;
  public nom_praticien: string = "";
  public prenom_praticien: string = "";
  public adresse_praticien: string = "";
  public cp_praticien: number = 0;
  public ville_praticien: string = "";
  public coef_notoriete: number = 0;

  constructor(json?: any) {
    if (json) {
      this.id_praticien = json.id_praticien;
      this.type_praticien = json.type_praticien;
      this.id_type_praticien = json.id_type_praticien;
      this.nom_praticien = json.nom_praticien;
      this.prenom_praticien = json.prenom_praticien;
      this.adresse_praticien = json.adresse_praticien;
      this.cp_praticien = json.cp_praticien;
      this.ville_praticien = json.ville_praticien;
      this.coef_notoriete = json.coef_notoriete;
    }
  }

  public getPraticien(): string {
    return '${this.id_praticien}';
  }
}
