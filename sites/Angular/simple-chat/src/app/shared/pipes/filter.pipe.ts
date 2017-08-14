import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'filter'
})
export class FilterPipe implements PipeTransform {
	transform(values, searchConversation) {
		if(!searchConversation) return values;
		// return values.filter(data => data.user_login == searchConversation);
		return values.filter(data=> data.user_login.toLocaleLowerCase().indexOf(searchConversation) != -1); 
	}
}