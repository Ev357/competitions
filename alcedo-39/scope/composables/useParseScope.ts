export const useParseScope = (scope: string) => {
  scope = scope.trim();

  const splittedScope = scope.split("\n");

  let vzorekZaS = 0;
  let lengthZaznam = 0;
  let rozsah = 0;

  const values: number[] = [];

  splittedScope.forEach((line, index) => {
    switch (index) {
      case 0:
        vzorekZaS = +line.trim();
        break;
      case 1:
        lengthZaznam = +line.trim();
        break;
      case 2:
        rozsah = +line.trim();
        break;
      default:
        values.push(+line.trim());
    }
  });

  return { vzorekZaS, lengthZaznam, rozsah, values };
};
