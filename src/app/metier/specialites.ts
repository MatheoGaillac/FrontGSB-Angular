export class Specialites {
  public id_specialite: string = "";
  public lib_specialite: string = "";
  constructor(json?: any) {
    if (json) {
      this.id_specialite = json.id_specialite;
      this.lib_specialite = json.lib_specialite;
    }
  }

  public getSpecialite(): string {
    return `${this.id_specialite}`;
  }
}
