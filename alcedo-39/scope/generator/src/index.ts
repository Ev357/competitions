// eslint-disable-next-line import/no-named-as-default
import prompts from "prompts";

const questions = [
  {
    type: "number",
    name: "vzorkovani",
    message: "Vzorkování: ",
  },
  {
    type: "number",
    name: "delkaZaznamu",
    message: "Délka záznamu: ",
  },
  {
    type: "number",
    name: "rozsah",
    message: "Rozsah: ",
  },
];

const generateVoltageSamples = (
  sampleCount: number,
  minValue: number,
  maxValue: number,
) => {
  const frequency = Math.random() * 10 + 1;
  const phase = Math.random() * Math.PI * 2;
  const amplitude = (maxValue - minValue) / 2;

  const voltageSamples: number[] = [];
  for (let i = 0; i < sampleCount; i++) {
    const time = i / sampleCount;
    let voltage = amplitude * Math.sin(2 * Math.PI * frequency * time + phase);

    voltage += ((Math.random() - 0.5) * (maxValue - minValue)) / 10;

    voltage = Math.min(Math.max(voltage, minValue), maxValue);

    voltageSamples.push(voltage);
  }
  return voltageSamples;
};

(async () => {
  const response = await prompts(questions as any);
  const pocet = response.vzorkovani * response.delkaZaznamu;
  const voltageSamples = generateVoltageSamples(
    pocet,
    -response.rozsah,
    response.rozsah,
  );

  let outFileText = `${response.vzorkovani}\n${response.delkaZaznamu}\n${response.rozsah}\n`;
  outFileText += voltageSamples.join("\n");

  await Bun.write("MERENI.txt", outFileText);
})();
