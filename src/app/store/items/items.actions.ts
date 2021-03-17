import { Item } from '../../model/item.model';

export const ActionTypes = {
  GET_ITEMS: '[Items] Get',
  GET_ITEMS_SUCCESS: '[Items] Get Success',
  GET_ITEMS_FAIL: '[Items] Get Fail',
  GET_ITEM: '[Items] Get Item',
  GET_ITEM_SUCCESS: '[Items] Get Item Success',
  GET_ITEM_FAIL: '[Items] Get Item Fail',
  CREATE_ITEMS: '[Items] Create',
  CREATE_ITEMS_SUCCESS: '[Items] Create Success',
  CREATE_ITEMS_FAIL: '[Items] Create Fail',
  DELETE_ITEMS: '[Items] Delete',
  DELETE_ITEMS_SUCCESS: '[Items] Delete Success',
  DELETE_ITEMS_FAIL: '[Items] Delete Fail',
  UPDATE_ITEMS: '[Items] Delete',
  UPDATE_ITEMS_SUCCESS: '[Items] Delete Success',
  UPDATE_ITEMS_FAIL: '[Items] Delete Fail',
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

export class GetItem {
  static readonly type = ActionTypes.GET_ITEM;
  constructor(public payload: number) {}
}

export class GetItemSuccess {
  static readonly type = ActionTypes.GET_ITEM_SUCCESS;
  constructor(public payload: Item) {}
}

export class GetItemFail {
  static readonly type = ActionTypes.GET_ITEM_FAIL;
  constructor(public err: string) {}
}

export class CreateItems {
  static readonly type = ActionTypes.CREATE_ITEMS;
  constructor(public payload: Item) {}
}

export class CreateItemsSuccess {
  static readonly type = ActionTypes.CREATE_ITEMS_SUCCESS;
  constructor(public payload: Item) {}
}

export class CreateItemsFail {
  static readonly type = ActionTypes.CREATE_ITEMS_FAIL;
  constructor(public err: string) {}
}

export class DeleteItems {
  static readonly type = ActionTypes.DELETE_ITEMS;
  constructor(public payload: number) {}
}

export class DeleteItemsSuccess {
  static readonly type = ActionTypes.DELETE_ITEMS_SUCCESS;
}

export class DeleteItemsFail {
  static readonly type = ActionTypes.DELETE_ITEMS_FAIL;
  constructor(public err: string) {}
}

export class UpdateItems {
  static readonly type = ActionTypes.UPDATE_ITEMS;
  constructor(public payload: Item) {}
}

export class UpdateItemsSuccess {
  static readonly type = ActionTypes.UPDATE_ITEMS_SUCCESS;
}

export class UpdateItemsFail {
  static readonly type = ActionTypes.UPDATE_ITEMS_FAIL;
  constructor(public err: string) {}
}
