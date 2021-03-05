import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { GetItems } from './items.actions';
import { ItemsService } from '../../shared/items.service';
import { createEntities } from '../../shared/createEntities';

export interface ItemStateModel {
  ids: number[];
  entities: {};
}

@State<ItemStateModel>({
  name: 'items',
  defaults: {
    ids: [],
    entities: {},
  },
})
@Injectable()
export class ItemsState {
  constructor(private itemsService: ItemsService) {}

  @Selector()
  static getItemsList(state: ItemStateModel) {
    return state.ids.map((id) => state.entities[id]);
  }

  @Action(GetItems)
  getItems(ctx: StateContext<ItemStateModel>) {
    return this.itemsService.getItems().pipe(
      tap((result) => {
        const state = ctx.getState();
        const entities = createEntities(result, state.entities);
        ctx.setState({
          ...state,
          ids: entities.ids,
          entities: entities.entities,
        });
      })
    );
  }
}
