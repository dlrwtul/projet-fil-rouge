import { BoissonTaille } from "src/app/produit/shared/models/boisson-taille";

export interface CommandeBoissonTaille {
    quantite :number;
    boissonTaille?: BoissonTaille;
    prix?: number;
    type: 'CommandeBoissonTaille'
}
