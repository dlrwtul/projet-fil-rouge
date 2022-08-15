import { Produit } from '../../produit/shared/models/produit';

export interface CommandeProduit {
    quantite: number ;
    prix?: number ;
    produit?: Produit ;
    burger?: Produit ;
    menu?: Produit ;
    portionFrites?: Produit ;
    type: 'CommandeProduit',
    '@type'? : 'CommandeProduit'
}
