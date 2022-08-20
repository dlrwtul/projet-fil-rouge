import { Pipe, PipeTransform } from '@angular/core';
import { Zone } from 'src/app/shared/models/zone';

@Pipe({
  name: 'zone'
})
export class ZonePipe implements PipeTransform {

  transform(value: Zone[]|null,libelle: string): Zone[] | null {
    
    if (value == null) {
      return null
    }
    if (libelle == '') {
      return value;
    }
    let filteredZones : Zone[] = []
    value.forEach(element => {
      if (element.libelle == libelle) {
        filteredZones.push(element)
      }
    });
    return filteredZones;
  }

}
