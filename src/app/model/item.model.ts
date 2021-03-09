import { SubItem } from './subItem.model';

export interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  count: number;
  subItem: SubItem;
}
