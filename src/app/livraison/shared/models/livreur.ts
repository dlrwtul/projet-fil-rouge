import { Livraison } from "src/app/shared/models/livraison"

export interface Livreur {
    id? : number,
    matriculeMoto?: string,
    etat?: string,
    login? : string,
    nom? : string,
    prenom? : string
    telephone? : string,
    livraisons?: Livraison[]
}
