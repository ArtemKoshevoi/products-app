import { Item } from '../model/item.model';

export function createEntities(
  payload: Item[],
  initialValue
): { entities: {}; ids: number[] } {
  const { ids = [], entities } = initialValue;
  return payload.reduce(
    (acc, item) => {
      return {
        entities: { ...acc.entities, [item.id]: item },
        ids: acc.ids.includes(item.id) ? acc.ids : [...acc.ids, item.id],
      };
    },
    { ids, entities }
  );
}
