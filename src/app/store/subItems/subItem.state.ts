import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SubItem } from '../../model/subItem.model';
import { createEntities } from '../../shared/createEntities';
import { SetSubItems } from './subItem.action';

export interface SubItemStateModel {
  ids: number[];
  entities: { [key: number]: SubItem };
}

@State<SubItemStateModel>({
  name: 'subItems',
  defaults: {
    ids: [],
    entities: {},
  },
})
@Injectable()
export class SubItemState {
  @Action(SetSubItems)
  getSubItemsSuccess(
    ctx: StateContext<SubItemStateModel>,
    { payload }: SetSubItems
  ) {
    const state = ctx.getState();
    const createdData = createEntities(payload, state);
    ctx.setState({
      ...state,
      ids: createdData.ids,
      entities: createdData.entities,
    });
  }
}
