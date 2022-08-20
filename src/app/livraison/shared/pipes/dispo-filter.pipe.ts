import { Pipe, PipeTransform } from '@angular/core';
import { Livreur } from '../models/livreur';

@Pipe({
  name: 'dispoFilter'
})
export class DispoFilterPipe implements PipeTransform {

  transform(value: Livreur[]|null,etat : string = ''): Livreur[] | null {
    
    if (value == null) {
      return null
    }
    let filteredDispo : Livreur[] = []
    let filteredIndispo : Livreur[] = []
    value.forEach(element => {
      if (element.etat == "disponible") {
        filteredDispo.push(element)
      }else {
        filteredIndispo.push(element)
      }
    });
    if (etat == 'disponible') {
      return filteredDispo
    }
    if (etat == 'indisponible') {
      return filteredIndispo
    }
    return [...filteredDispo,...filteredIndispo]
    
  }

}
