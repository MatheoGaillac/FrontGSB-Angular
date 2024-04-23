export class Inviter {

	public id_activite_compl: number = 0;
	public id_praticien: number = 0;
	public specialiste: string = "";
  
	constructor(json?: any) {
	  if (json) {
		this.id_activite_compl = json.id_activite_compl;
		this.id_praticien = json.id_praticien;
		this.specialiste = json.specialiste;

	  }
	}
  
	public getInvitation(): string {
        return `${this.id_activite_compl}, ${this.id_praticien}`;
	}
  }
  