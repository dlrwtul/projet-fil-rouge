import { Pipe, PipeTransform } from '@angular/core';
import { Commande } from 'src/app/shared/models/commande';
import { Zone } from 'src/app/shared/models/zone';

@Pipe({
  name: 'etat'
})
export class EtatPipe implements PipeTransform {

  transform(value: Zone[]|null,etat: string): Zone[] | null {
    
    if (value == null) {
      return null
    }
    if (etat == '') {
      return value;
    }
    let filteredZones : Zone[] = []
    value.forEach(element => {
      let zone = structuredClone(element)
      let filteredTabs : Commande[] = []
      element.commandes?.forEach((commande) => {
        if (commande.etat == etat) {
          filteredTabs.push(commande)
        }
      })
      zone.commandes = filteredTabs
      filteredZones.push(zone)
    });
    return filteredZones;
  }

}
