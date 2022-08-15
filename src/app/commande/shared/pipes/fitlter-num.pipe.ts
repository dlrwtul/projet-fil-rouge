import { Pipe, PipeTransform } from '@angular/core';
import { Commande } from 'src/app/shared/models/commande';

@Pipe({
  name: 'fitlterNum'
})
export class FitlterNumPipe implements PipeTransform {

  transform(value: Commande[]|null,numero: string): Commande[] {
    
    if (value == null) {
      return []
    }
    if (value.length === 0 || !numero) {
      return value;
    }
    let filteredCommandes: Commande[] = [];
    for (let commande of value) {
      if (commande.numero != undefined) {
        if (commande.numero.match(numero)) {
          filteredCommandes.push(commande);
        }
      }
    }
    return filteredCommandes;
  }

}
