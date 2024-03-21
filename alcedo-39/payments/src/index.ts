import prompts from "prompts";

interface Person {
  firstName: string;
  lastName: string;
  birthNumber: string;
  value: number;
}

const denominations = [5000, 2000, 500, 200, 100, 50, 20, 10, 5, 2, 1] as const;
type Payment = Record<(typeof denominations)[number], number>;

const questions = [
  {
    type: "text",
    name: "firstname",
    message: "Jméno: ",
  },
  {
    type: "text",
    name: "lastName",
    message: "Příjmení: ",
  },
  {
    type: "text",
    name: "birthNumber",
    message: "Rodné číslo: ",
    validate: (value: string) => new RegExp("[0-9]{6}/[0-9]{4}").test(value),
  },
  {
    type: "number",
    name: "value",
    message: "Částka: ",
  },
];

const getPayment = (value: number) => {
  const result: Payment = {
    5000: 0,
    2000: 0,
    500: 0,
    200: 0,
    100: 0,
    50: 0,
    20: 0,
    10: 0,
    5: 0,
    2: 0,
    1: 0,
  };

  for (let denomination of denominations) {
    const count = Math.floor(value / denomination);
    if (count > 0) {
      result[denomination] = count;
      value -= count * denomination;
    }
  }

  return result;
};

const getFilteredPayment = (payment: Payment) =>
  Object.entries(payment).reduce<Partial<Payment>>(
    (filteredPayment, [denomination, count]) => {
      if (count > 0) {
        (filteredPayment as any)[denomination] = count;
      }
      return filteredPayment;
    },
    {}
  );

const getCoinCount = (payment: Payment) =>
  Object.entries(payment).reduce((total, [denomination, count]) => {
    if (+denomination <= 50) {
      total += count;
    }

    return total;
  }, 0);

const getBanknoteCount = (payment: Payment) =>
  Object.entries(payment).reduce((total, [denomination, count]) => {
    if (+denomination >= 100) {
      total += count;
    }

    return total;
  }, 0);

(async () => {
  const { pocetOsob } = await prompts({
    type: "number",
    name: "pocetOsob",
    message: "Počet osob: ",
  });

  const persons: Person[] = [];

  for (let i = 0; i < pocetOsob; i++) {
    const person: Person = await prompts(questions as any);
    persons.push(person);
  }

  const result = persons
    .map((person) => {
      const payment = getPayment(person.value);
      return {
        ...person,
        payment: getFilteredPayment(payment),
        coinCount: getCoinCount(payment),
        banknoteCount: getBanknoteCount(payment),
      };
    })
    .toSorted((a, b) => {
      if (a.lastName.toLowerCase() < b.lastName.toLowerCase()) return -1;
      if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) return 1;
      return 0;
    });

  const wholeCointCount = result.reduce(
    (wholeCointCount, result) => wholeCointCount + result.coinCount,
    0
  );

  const wholeBanknoteCount = result.reduce(
    (wholeBanknoteCount, result) => wholeBanknoteCount + result.banknoteCount,
    0
  );

  console.table(result);
  console.log(`Celkový počet mincí: ${wholeCointCount}`);
  console.log(`Celkový počet bankovek: ${wholeBanknoteCount}`);

  const resultJson = JSON.stringify({
    persons: result,
    wholeCointCount,
    wholeBanknoteCount,
  });

  await Bun.write("PLATIDLA.json", resultJson);
})();
