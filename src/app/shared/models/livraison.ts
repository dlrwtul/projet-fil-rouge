import { Commande } from 'src/app/shared/models/commande';
import { Livreur } from '../../livraison/shared/models/livreur';

export interface Livraison {
    id?: number
    livreur?: Livreur,
    commandes?: Commande[],
    etat? : string
}
