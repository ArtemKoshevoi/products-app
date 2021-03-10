interface OutputEntities {
  entities: { [key: number]: any };
  ids: number[];
}

export function createEntities(payload: any[], initialValue) {
  const { ids = [], entities } = initialValue;
  return payload.reduce<OutputEntities>(
    (acc, item) => {
      return {
        entities: { ...acc.entities, [item.id]: item },
        ids: acc.ids.includes(item.id) ? acc.ids : [...acc.ids, item.id],
      };
    },
    { ids, entities }
  );
}
