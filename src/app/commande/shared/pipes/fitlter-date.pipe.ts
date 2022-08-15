import { Pipe, PipeTransform } from '@angular/core';
import { Commande } from 'src/app/shared/models/commande';

@Pipe({
  name: 'fitlterDate'
})
export class FitlterDatePipe implements PipeTransform {

  transform(value: Commande[]|null,date : string): Commande[] {
    if (value == null) {
      return []
    }
    if (value.length === 0 || !date) {
      return value;
    }
    let dateToFilter = new Date(date)
    let filteredCommandes: Commande[] = [];
    for (let commande of value) {
      if (commande.createdAt != undefined) {
        const commandeDate = new Date(commande.createdAt)
        if (commandeDate.toLocaleDateString() == dateToFilter.toLocaleDateString()) {
          filteredCommandes.push(commande);
        }
      }
    }
    return filteredCommandes;
  }

}
