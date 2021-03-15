import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import {
  CreateItems,
  CreateItemsFail,
  CreateItemsSuccess,
  DeleteItems,
  DeleteItemsFail,
  DeleteItemsSuccess,
  GetItems,
  GetItemsFail,
  GetItemsSuccess,
  UpdateItems,
  UpdateItemsFail,
  UpdateItemsSuccess,
} from './items.actions';
import { ItemsService } from '../../shared/items.service';
import { createEntities } from '../../shared/createEntities';
import { Item } from '../../model/item.model';
import { SetSubItems } from '../subItems/subItem.action';
import { SubItem } from '../../model/subItem.model';

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
  constructor(private itemsService: ItemsService, private router: Router) {}

  @Selector()
  static getItemsList(state: ItemStateModel) {
    return state.ids.map((id) => state.entities[id]);
  }

  getExtractedData(
    rowData: Item[]
  ): { subItemEntities: SubItem[]; itemEntities: Omit<Item, 'subItem'>[] } {
    const subItemEntities = rowData.map((item) => item.subItem);
    const itemEntities = rowData.map((item) => {
      const { subItem, ...args } = item;
      return args;
    });
    return { subItemEntities, itemEntities };
  }

  @Action(GetItems)
  getItems(ctx: StateContext<ItemStateModel>) {
    return this.itemsService.getItems().pipe(
      switchMap((result) => {
        const { subItemEntities, itemEntities } = this.getExtractedData(result);
        return ctx.dispatch([
          new SetSubItems(subItemEntities),
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
  }

  @Action(CreateItems)
  createItems(ctx: StateContext<ItemStateModel>, { payload }: CreateItems) {
    return this.itemsService.addItem(payload).pipe(
      switchMap((result) => {
        const { subItem, ...args } = result;
        return ctx.dispatch([
          new CreateItemsSuccess(result),
          new SetSubItems([subItem]),
        ]);
      }),
      catchError((err) => {
        return ctx.dispatch(new CreateItemsFail(err));
      })
    );
  }

  @Action(CreateItemsSuccess)
  createItemsSuccess(
    ctx: StateContext<ItemStateModel>,
    { payload }: CreateItemsSuccess
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      ids: [...state.ids, payload.id],
      entities: { ...state.entities, [payload.id]: payload },
    });
  }

  @Action(CreateItemsFail)
  createItemsFail({ err }: CreateItemsFail) {
    console.log(`Error is ${err}`);
  }

  @Action(DeleteItems)
  deleteItems(ctx: StateContext<ItemStateModel>, { payload }: DeleteItems) {
    return this.itemsService.deleteItem(payload).pipe(
      switchMap((result) => {
        return ctx.dispatch([new DeleteItemsSuccess(), new GetItems()]);
      }),
      catchError((err) => {
        return ctx.dispatch(new DeleteItemsFail(err));
      })
    );
  }

  @Action(DeleteItemsSuccess)
  deleteItemsSuccess() {}

  @Action(DeleteItemsFail)
  deleteItemsFail({ err }: DeleteItemsFail) {
    console.log(`Error is ${err}`);
  }

  @Action(UpdateItems)
  updateItems(ctx: StateContext<ItemStateModel>, { payload }: UpdateItems) {
    return this.itemsService.updateItem(payload).pipe(
      switchMap((result) => {
        console.log(222, result);
        return ctx.dispatch(new UpdateItemsSuccess());
      }),
      catchError((err) => {
        return ctx.dispatch(new UpdateItemsFail(err));
      })
    );
  }
}
