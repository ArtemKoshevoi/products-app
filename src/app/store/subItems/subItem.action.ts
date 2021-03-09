import { SubItem } from '../../model/subItem.model';

export const ActionTypes = {
  GET_SUB_ITEMS: '[SubItems] Get',
  GET_SUB_ITEMS_SUCCESS: '[SubItems] Get Success',
  GET_SUB_ITEMS_FAIL: '[SubItems] Get Fail',
};

export class GetSubItems {
  static readonly type = ActionTypes.GET_SUB_ITEMS;
}

export class GetSubItemsSuccess {
  static readonly type = ActionTypes.GET_SUB_ITEMS_SUCCESS;
  constructor(public payload: SubItem[]) {}
}

export class GetSubItemsFail {
  static readonly type = ActionTypes.GET_SUB_ITEMS_FAIL;
  constructor(public err: string) {}
}
