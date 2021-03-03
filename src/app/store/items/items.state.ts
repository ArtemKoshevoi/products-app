import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { Item } from '../../model/item.model';
import { GetItems } from './items.actions';
import { ItemsService } from '../../shared/items.service';

export interface ItemStateModel {
  items: Item[];
}

@State<ItemStateModel>({
  name: 'items',
  defaults: {
    items: [],
  },
})
@Injectable()
export class ItemsState {
  constructor(private itemsService: ItemsService) {}

  @Selector()
  static getItemsList(state: ItemStateModel) {
    return state.items;
  }

  @Action(GetItems)
  getItems({ setState, getState }: StateContext<ItemStateModel>) {
    return this.itemsService.getItems().pipe(
      tap((result) => {
        const state = getState();
        setState({
          ...state,
          items: result,
        });
      })
    );
  }
}
