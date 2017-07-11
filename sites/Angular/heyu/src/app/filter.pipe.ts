import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(values: any, searchTerm: any): any {
    if(searchTerm === undefined) return values;
    return values.filter(function(value) {
      return value.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

}
