import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if(!items) return null;
    
    if(!searchText) return items;
    
    searchText = searchText.toLocaleLowerCase();

    return items.filter(item => {
      return item.author.toLocaleLowerCase().includes(searchText) |
        item.subject.toLocaleLowerCase().includes(searchText) | 
        item.content.toLocaleLowerCase().includes(searchText) |
        item.author.toLocaleLowerCase().includes(searchText);
    })
  }

}
