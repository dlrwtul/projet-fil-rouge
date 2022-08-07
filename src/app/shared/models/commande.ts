import { CommandeBoissonTaille } from "./commande-boisson-taille"
import { CommandeProduit } from "./commande-produit"
import { Quartier } from "./quartier";
import { Zone } from "./zone";

export interface Commande {
    id?: number;
    numero?: string;
    createdAt?: Date;
    montant?: number;
    telephone?:string;
    adresse?:string
    zone?: Zone;
    quartier?: Quartier;
    commandeBoissonTailles?: CommandeBoissonTaille[];
    commandeMenus?: CommandeProduit[];
    commandeBurgers?: CommandeProduit[];
    commandePortionFrites?: CommandeProduit[];
    commandeProduits?: Array<CommandeProduit|CommandeBoissonTaille>;
}
