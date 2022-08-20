import { Pipe, PipeTransform } from '@angular/core';
import { Commande } from 'src/app/shared/models/commande';

@Pipe({
  name: 'paginate'
})
export class PaginatePipe implements PipeTransform {

  transform(value: Commande[]|null,page: number,size: number): Commande[] {
    
    if (value == null) {
      return []
    }
    if (value.length === 0 || !page) {
      return value;
    }
    let start = (page-1)*size
    let end = start + size
    console.log(start,end);
    return value.slice(start,end);
  }

}
