export interface IGenerateKeyValueMap {
  key: string;
  value: string;
  data: any;
}

const generateKeyValueMap = (key: string, value: string, data: any) => {
  const newMap = data.reduce((acc: any, row: any) => {
    const keyValue = row[key];
    const valueValue = row[value];

    return { ...acc, [keyValue]: valueValue };
  }, {});

  return newMap;
};

export default generateKeyValueMap;
