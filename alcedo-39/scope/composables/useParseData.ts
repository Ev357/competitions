export const useParseData = (inputData: {
  vzorekZaS: number;
  lengthZaznam: number;
  rozsah: number;
  values: number[];
}) => {
  let time = 0;

  type DataRecord = { x: number; y: number };

  return inputData.values.reduce<DataRecord[]>((outData, value) => {
    const x = time;
    time += 1 / inputData.vzorekZaS;
    const y = value;

    outData.push({ x, y });

    return outData;
  }, []);
};
