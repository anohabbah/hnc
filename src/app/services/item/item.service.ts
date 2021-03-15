import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { Item, Items } from '@hnc/models/item.interface';
import { AngularFireDatabase } from '@angular/fire/database';
import {distinctUntilChanged, map, mergeMap} from 'rxjs/operators';
import { isEqual } from 'lodash-es';

@Injectable()
export class ItemService {
  constructor(private db: AngularFireDatabase) {}

  load(offset: number, limit: number): Observable<Items> {
    return this.db.list('/v0/topstories').valueChanges().pipe(
      map((ids: any[]) => ids.slice(offset, offset + limit)),
      distinctUntilChanged(isEqual),
      map((ids: any[]) => ids.map(id => this.db.object('/v0/item/' + id).valueChanges())),
      map((items) => ({
        offset,
        limit,
        total: limit,
        results: items as Observable<Item>[],
      }))
    );
  }
}
