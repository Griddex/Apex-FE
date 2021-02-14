function flattenObject<T, K extends keyof T>(obj: T) {
  const flattened = {} as T;
  const myKeys = Object.keys(obj) as K[];

  myKeys.forEach((key: K) => {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      const currentFlattenedObj = obj[key];
      Object.assign(flattened, flattenObject(currentFlattenedObj));
    } else {
      flattened[key] = obj[key];
    }
  });

  return flattened;
}

export default flattenObject;
