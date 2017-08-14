import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'sort'
})
export class SortPipe implements PipeTransform {
	transform(values, exponent) {
		if(!values) return values;
		return values.sort((value, value2) => { 
			let date1 = new Date(value.date);
			let date2 = new Date(value2.date);
			
			if (date1 < date2) {
                return 1;
            } else if (date1 > date2) {
                return -1;
            } else {
                return 0;
            }
		});
	}
}