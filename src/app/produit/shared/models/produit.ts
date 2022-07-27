import { MenuProduit } from "./menu-produit";
import { MenuTaille } from "./menu-taille";

export interface Produit {
    id?: number;
    nom: string;
    prix:number
    image: Blob;
    description?: string;
    type: string;
    menuBurgers? : MenuProduit[];
    menuPortionFrites? : MenuProduit[];
    menuTailles?: MenuTaille[]
}
