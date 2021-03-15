import { Injectable } from '@angular/core';
import {combineLatest, merge, Observable, Subject} from 'rxjs';
import { Items } from '@hnc/models/item.interface';
import { AngularFireDatabase } from '@angular/fire/database';
import { filter, map, skip, switchAll, take, withLatestFrom } from 'rxjs/operators';

interface Query {
  refresh: boolean;
  offset: number;
  limit: number;
}

@Injectable()
export class ItemService {
  private queries: Subject<Query>;

  constructor(private db: AngularFireDatabase) {
    this.queries = new Subject<Query>();
  }

  load(query: Query): void {
    this.queries.next(query);
  }

  get(): Observable<Items> {
    const rawItemIds = this.db.list('/v0/topstories').valueChanges() as Observable<number[]>;

    const itemIds = combineLatest([rawItemIds, this.queries]).pipe(
      filter(([_, query]) => query.refresh),
      map(([ids, _]) => ids)
    );

    const selector = ({ offset, limit }: Query, ids: number[]) => combineLatest(
      ids.slice(offset, limit + offset)
        .map(id => this.db.object('/v0/item/' + id).valueChanges())
    ) as Observable<Items>;

    return merge(
      combineLatest([this.queries, itemIds]).pipe(
        map(([query, ids]) => selector(query, ids).pipe(take(1)))
      ),
      this.queries.pipe(skip(1), withLatestFrom(itemIds, selector))
    ).pipe(switchAll());
  }
}
