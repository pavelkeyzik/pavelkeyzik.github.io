import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any, args: string): any {

    var direction = 1;

    if (value) {
      if(args == 'old') {
         direction = 1;
      }
      else if(args == 'new') {
        direction = -1;
      }

      value.sort((a, b) => {
        if(a.publishedAt < b.publishedAt) return -direction;
        else if(a.publishedAt > b.publishedAt) return direction;
        else return 0;
      });
    }

    return value;
  }

}
