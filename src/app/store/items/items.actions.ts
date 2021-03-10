import { Item } from '../../model/item.model';

export const ActionTypes = {
  GET_ITEMS: '[Items] Get',
  GET_ITEMS_SUCCESS: '[Items] Get Success',
  GET_ITEMS_FAIL: '[Items] Get Fail',
  CREATE_ITEMS: '[Items] Create',
};

export class GetItems {
  static readonly type = ActionTypes.GET_ITEMS;
}

export class GetItemsSuccess {
  static readonly type = ActionTypes.GET_ITEMS_SUCCESS;
  constructor(public payload: Omit<Item, 'subItem'>[]) {}
}

export class GetItemsFail {
  static readonly type = ActionTypes.GET_ITEMS_FAIL;
  constructor(public err: string) {}
}

export class CreateItems {
  static readonly type = ActionTypes.CREATE_ITEMS;
  constructor(public payload: Item) {}
}
