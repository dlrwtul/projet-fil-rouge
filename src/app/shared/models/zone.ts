import { Quartier } from "./quartier";
import { Commande } from './commande';

export interface Zone {
    id? : number ;
    libelle? : string ;
    montantLivraison? : number;
    quartiers? : Quartier[] ;
    commandes? : Commande[];
    checkAll?: boolean
}
