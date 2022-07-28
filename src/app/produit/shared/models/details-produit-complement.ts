import { BoissonTaille } from "./boisson-taille";
import { Produit } from "./produit";

export interface DetailsProduitComplement {
    burger: Produit;
    menu: Produit;
    produit : Produit;
    portionFrites : Produit[];
    boissonTailles : BoissonTaille[];
}
