import { Produit } from "./produit";
import { Taille } from "./taille";

export interface BoissonTaille {
    id: number;
    boisson?: Produit;
    taille?: Taille;
    quantiteStock: number;
}
