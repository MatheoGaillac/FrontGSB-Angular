export class Inviter {
	public id_activite_compl: number = 0;
	public id_praticien: number = 0;
	public specialiste: string = "";
	public date_activite: string = "";
	public lieu_activite: string = "";
	public theme_activite: string = "";
	public motif_activite: string = "";
  
	constructor(json?: any) {
	  if (json) {
		this.id_activite_compl = json.id_activite_compl;
		this.id_praticien = json.id_praticien;
		this.specialiste = json.specialiste;
		this.date_activite = json.date_activite;
		this.lieu_activite = json.lieu_activite;
		this.theme_activite = json.theme_activite;
		this.motif_activite = json.motif_activite;
	  }
	}
  
	public getInvitation(): string {
	  return `${this.id_activite_compl}, ${this.id_praticien}`;
	}
  }
  