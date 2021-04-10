const modifyCollectionObject = (
  selectedIndex: number,
  nameValueObj: Record<string, React.Key>,
  collectionObj: Record<string, React.Key>[]
) => {
  const selectedObj = collectionObj[selectedIndex];

  for (const name of Object.keys(nameValueObj)) {
    const value = nameValueObj[name];

    selectedObj[name] = value;
  }

  collectionObj[selectedIndex] = selectedObj;

  return collectionObj;
};

export default modifyCollectionObject;
