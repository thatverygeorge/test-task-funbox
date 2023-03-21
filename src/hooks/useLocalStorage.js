export function useLocalStorage(itemKey, objectKey, data) {
  localStorage.setItem(
    itemKey,
    JSON.stringify(
      Object.assign(JSON.parse(localStorage.getItem(itemKey)) ?? {}, {
        [objectKey]: data,
      })
    )
  );
}
