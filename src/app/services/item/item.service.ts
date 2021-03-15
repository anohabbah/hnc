import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Items } from '@hnc/models/item.interface';

@Injectable()
export class ItemService {
  load(): Observable<Items> {
    return of({
      offset: 0,
      limit: 0,
      total: 0,
      results: []
    });
  }
}
