import { Quartier } from "./quartier";

export class Zone {
    id? : number =0;
    libelle? : string ='';
    montantLivraison? : number = 0;
    quartiers? : Quartier[] = [];
}
