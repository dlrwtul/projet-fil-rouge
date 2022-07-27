import { BoissonTaille } from './boisson-taille';

export interface Taille {
    id:number;
    libelle:string;
    prix: number;
    boissonTailles:BoissonTaille[];
}
