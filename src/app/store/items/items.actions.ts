import { Item } from '../../model/item.model';

export const ActionTypes = {
  GET_ITEMS: '[Items] Get',
  GET_ITEMS_SUCCESS: '[Items] Get Success',
  GET_ITEMS_FAIL: '[Items] Get Fail',
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
