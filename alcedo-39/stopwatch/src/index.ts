import prompts from "prompts";

(async () => {
  const { pocetOsob } = await prompts({
    type: "number",
    name: "pocetOsob",
    message: "Počet osob: ",
  });
})();
