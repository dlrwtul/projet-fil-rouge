import { Produit } from './produit';

export interface MenuProduit {
    quantite: number;
    burger?: Produit;
    portionFrites?: Produit; 
}
