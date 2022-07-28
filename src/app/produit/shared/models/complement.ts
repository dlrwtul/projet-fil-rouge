import { BoissonTaille } from './boisson-taille';
import { Produit } from './produit';
export interface Complement {
    portionFrites: Produit[];
    boissonTailles: BoissonTaille[];
}
