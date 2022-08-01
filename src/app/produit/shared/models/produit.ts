import { MenuProduit } from "./menu-produit";
import { MenuTaille } from "./menu-taille";
import { BoissonTaille } from './boisson-taille';
import { CommandeMenuBoissonTaille } from "src/app/shared/models/commande-menu-boisson-taille";

export interface Produit {
    id?: number;
    nom: string;
    prix:number
    image?: Blob;
    description?: string;
    type: string;
    menuBurgers? : MenuProduit[];
    menuPortionFrites? : MenuProduit[];
    menuTailles?: MenuTaille[],
    boissonTailles?: BoissonTaille[],
    commandeMenuBoissonTailles?: CommandeMenuBoissonTaille[];
}
