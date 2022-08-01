import { BoissonTaille } from "src/app/produit/shared/models/boisson-taille";

export interface CommandeMenuBoissonTaille {
    quantite : number ;
    boissonTaille?: BoissonTaille ;
    prix?: number ;
}
