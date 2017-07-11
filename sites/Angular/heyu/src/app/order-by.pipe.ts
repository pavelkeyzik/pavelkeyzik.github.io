import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(values: any, arg: boolean): any {
    if(!values) return values;
    return values.sort(function(value) {
      if(value.online === arg) return -1;
      if(value.online != arg) return 1;
      return 0;
    });
    // return values.filter(function(value) {
    //   return value.online === arg;
    // });
  }

}
