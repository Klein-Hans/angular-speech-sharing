import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if(!items) return null;
    
    if(!searchText) return items;
    
    return items.filter(item => {
      let result: boolean;
      Object.keys(item).filter(key => {
        if(((typeof item[key]) == "string" || (typeof item[key]) == "number") && 
          item[key].toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase())) 
          result = true
      })
      return result
    })
  }

}
