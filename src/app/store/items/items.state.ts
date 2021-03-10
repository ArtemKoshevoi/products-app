import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import {
  CreateItems,
  GetItems,
  GetItemsFail,
  GetItemsSuccess,
} from './items.actions';
import { ItemsService } from '../../shared/items.service';
import { createEntities } from '../../shared/createEntities';
import { Item } from '../../model/item.model';
import { GetSubItemsSuccess } from '../subItems/subItem.action';

export interface ItemStateModel {
  ids: number[];
  entities: { [key: number]: Item };
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
      switchMap((result) => {
        const subItemEntities = result.map((item) => item.subItem);
        const itemEntities = result.map((item) => {
          const { subItem, ...args } = item;
          return args;
        });
        return ctx.dispatch([
          new GetSubItemsSuccess(subItemEntities),
          new GetItemsSuccess(itemEntities),
        ]);
      }),
      catchError((err) => {
        return ctx.dispatch(new GetItemsFail(err));
      })
    );
  }

  @Action(GetItemsSuccess)
  getItemsSuccess(
    ctx: StateContext<ItemStateModel>,
    { payload }: GetItemsSuccess
  ) {
    const state = ctx.getState();
    const createdData = createEntities(payload, state);
    ctx.setState({
      ...state,
      ids: createdData.ids,
      entities: createdData.entities,
    });
  }

  @Action(GetItemsFail)
  getItemsFail({ err }: GetItemsFail) {
    console.log(`Error is ${err}`);
    return of('');
  }

  @Action(CreateItems)
  createItems(ctx: StateContext<ItemStateModel>, { payload }: CreateItems) {
    return this.itemsService.addItem(payload);
  }
}
