import { Pipe, PipeTransform } from '@angular/core';
import { FirestoreService } from 'app/core/services'; 
import { Observable } from 'rxjs/Observable'

@Pipe({
  name: 'doc'
})
export class DocPipe implements PipeTransform {

  constructor(private db: FirestoreService) {}

  transform(value: any): Observable<any> {
    console.log(value)
    return this.db.doc$(value.path);
  }

}
