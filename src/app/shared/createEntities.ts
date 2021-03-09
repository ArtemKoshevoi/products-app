export function createEntities(payload: any[], initialValue) {
  const { ids = [], entities } = initialValue;
  return payload.reduce<{
    entities: { [key: number]: any };
    ids: number[];
  }>(
    (acc, item) => {
      return {
        entities: { ...acc.entities, [item.id]: item },
        ids: acc.ids.includes(item.id) ? acc.ids : [...acc.ids, item.id],
      };
    },
    { ids, entities }
  );
}
