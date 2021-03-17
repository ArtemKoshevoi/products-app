import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { GetItem } from '../store/items/items.actions';
import { Store } from '@ngxs/store';
import { Item } from '../model/item.model';

@Injectable({
  providedIn: 'root',
})
export class CreateEditItemsResolver implements Resolve<Observable<Item>> {
  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.store.dispatch(new GetItem(+route.paramMap.get('itemId')));
  }
}
