import { Selector } from '@ngxs/store';
import { ItemStateModel } from './items.state';

export class ItemsGetter {
  @Selector()
  static getItemsList(state: ItemStateModel) {
    return state.ids.map((id) => state.entities[id]);
  }
}
