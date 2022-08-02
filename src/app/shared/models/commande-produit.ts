import { Produit } from '../../produit/shared/models/produit';

export interface CommandeProduit {
    quantite: number ;
    prix?: number ;
    produit?: Produit ;
    type: 'CommandeProduit'
}
