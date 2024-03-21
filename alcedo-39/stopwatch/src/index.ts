import prompts from "prompts";

interface Competitor {
  firstName: string;
  lastName: string;
  birthDate: string;
  organization: string;
}

interface CompetitorWithOrder extends Competitor {
  order: number;
}

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
    name: "birthDate",
    message: "Datum narození: ",
  },
  {
    type: "text",
    name: "organization",
    message: "Organizace: ",
  },
];

const shuffleArray = <T>(array: T[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

(async () => {
  const { competitorCount } = await prompts({
    type: "number",
    name: "competitorCount",
    message: "Počet soutěžících: ",
  });

  const competitors: Competitor[] = [];

  for (let i = 0; i < competitorCount; i++) {
    const competitor: Competitor = await prompts(questions as any);
    competitors.push(competitor);
  }

  const groupCount = Math.floor(competitors.length / 2);
  let order: number[] = [];
  for (let i = 1; i <= groupCount; i++) {
    order.push(i);
    order.push(i);
  }

  order = shuffleArray(order);
  if (order.length !== competitors.length) {
    order.push(competitors.length);
  }

  const competitorsWithOrder: CompetitorWithOrder[] = competitors.map(
    (competitor, index) => ({
      ...competitor,
      order: order[index],
    })
  );

  console.table(competitorsWithOrder);
})();
