import z from "zod";
import prompts from "prompts";

(async () => {
  let response = await prompts({
    type: "text",
    name: "text",
    message: "Vyber soustavu: ",
  });
  const soustavaSchema = z.number().min(2).max(16);
  const soustavaResult = soustavaSchema.safeParse(+response.text.trim());
  let soustava: number;
  if (!soustavaResult.success) {
    throw "Špatný input";
  }
  soustava = soustavaResult.data;

  response = await prompts({
    type: "text",
    name: "text",
    message: "A: ",
  });
  let a: number;

  const aResult = parseInt(response.text.trim(), soustava);
  if (Number.isNaN(aResult)) {
    throw "Špatný input";
  }
  a = aResult;

  console.log(a);

  // -----

  response = await prompts({
    type: "text",
    name: "text",
    message: "B: ",
  });
  let b: number;

  const bResult = parseInt(response.text.trim(), soustava);
  if (Number.isNaN(aResult)) {
    throw "Špatný input";
  }
  b = bResult;

  const decimalResult = a + b;
  const finalResult = decimalResult.toString(soustava);

  console.log(`Desítková soustava: ${decimalResult}`);
  console.log(`${soustava} soustava: ${finalResult.toUpperCase()}`);
})();
