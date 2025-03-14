import { parseArgs } from "util";

const { values } = parseArgs({
	args: Bun.argv,
	options: {
		list: {
			type: "string",
		},
		count: {
			type: "string",
		},
	},
	strict: true,
	allowPositionals: true,
});

type ListType = "+" | "-" | "*" | "/";
const getList = () => {
	const charList: ListType[] = ["+", "-", "*", "/"];
	if (!values.list) {
		return charList;
	}

	for (const char of values.list.trim()) {
		if (!charList.includes(char as ListType)) {
			console.log("neznámý znak");
			process.exit(1);
		}
	}

	return values.list.trim().split("") as ListType[];
};

const getCount = () => {
	if (
		values.count === undefined ||
		values.count === null ||
		values.count === ""
	) {
		return 10;
	}
	const count = Number.parseInt(values.count);
	if (Number.isNaN(count)) {
		console.log("count musí být číslo");
		process.exit(1);
	}

	if (count < 1) {
		console.log("count musí být větší než 0");
		process.exit(1);
	}

	return count;
};

const list = getList();
const count = getCount();

const getRandomNumber = () => {
	const min = -99;
	const max = 99;
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateAdd = () => {
	while (true) {
		const firstNumber = getRandomNumber();
		const secondNumber = getRandomNumber();

		const result = firstNumber + secondNumber;

		if (result < -99 || result > 99) {
			continue;
		}
		return {
			firstNumber,
			secondNumber,
			result,
		};
	}
};

const generateSub = () => {
	while (true) {
		const firstNumber = getRandomNumber();
		const secondNumber = getRandomNumber();

		const result = firstNumber - secondNumber;

		if (result < -99 || result > 99) {
			continue;
		}
		return {
			firstNumber,
			secondNumber,
			result,
		};
	}
};

const generateMul = () => {
	while (true) {
		const firstNumber = getRandomNumber();
		const secondNumber = getRandomNumber();

		const result = firstNumber * secondNumber;

		if (result < -99 || result > 99) {
			continue;
		}
		return {
			firstNumber,
			secondNumber,
			result,
		};
	}
};

const generateDiv = () => {
	while (true) {
		const firstNumber = getRandomNumber();
		const secondNumber = getRandomNumber();

		const result = firstNumber / secondNumber;

		if (Math.floor(result) !== result) {
			continue;
		}

		if (result < -99 || result > 99) {
			continue;
		}
		return {
			firstNumber,
			secondNumber,
			result,
		};
	}
};

const generateCombination = () => {
	const getRandomNumber = () => {
		const min = 0;
		const max = list.length - 1;
		return Math.floor(Math.random() * (max - min + 1) + min);
	};
	mainLoop: while (true) {
		const combination: ListType[] = [];

		for (let i = 0; i < count; i++) {
			const operation = list[getRandomNumber()];
			if (!operation) {
				throw "error";
			}
			combination.push(operation);
		}

		const uniq = [...new Set(combination)];
		for (const operation of list) {
			if (!uniq.includes(operation)) {
				continue mainLoop;
			}
		}

		return combination;
	}
};

const combination = generateCombination();

const examples = combination.map((operation) => {
	switch (operation) {
		case "+":
			return {
				operation,
				...generateAdd(),
			};
		case "-":
			return {
				operation,
				...generateSub(),
			};
		case "*":
			return {
				operation,
				...generateMul(),
			};
		case "/":
			return {
				operation,
				...generateDiv(),
			};
	}
});

const printExample = examples.map((example) => {
	return [example.firstNumber, example.operation, example.secondNumber, "="];
});

console.log("Příklady:");
console.table(printExample);

let isRunning = true;
let index = 0;

const results: { value: string; isCorrect: boolean }[] = [];

while (isRunning) {
	const example = examples[index];

	if (!example) {
		isRunning = false;
		continue;
	}

	const result = prompt(
		`${example.firstNumber} ${example.operation} ${example.secondNumber} =\n>`,
	)?.trim();

	if (!result) {
		continue;
	}

	if (result === example.result.toString()) {
		results.push({
			isCorrect: true,
			value: result,
		});
		index++;
		continue;
	} else {
		results.push({
			isCorrect: false,
			value: result,
		});
	}
}

console.log("Výsledky:");

const printResults = examples.map((example, index) => {
	return [
		example.firstNumber,
		example.operation,
		example.secondNumber,
		"=",
		results[index]?.value as string,
		(results[index]?.isCorrect ? "ok" : "chyba") as string,
	];
});

console.table(printResults);

console.log(`Celkem: ${results.length}`);
const wereTrue = results.filter((result) => result?.isCorrect).length;
const wereFalse = results.filter((result) => !result?.isCorrect).length;
console.log(`Správně: ${wereTrue}`);

console.log(`Chybně: ${wereFalse}`);
console.log(`Úspěšnost: ${(wereTrue / (wereTrue + wereFalse)) * 100}%`);

console.log("Chybné příklady:");

results.forEach((result, index) => {
	if (!result?.isCorrect) {
		console.log(
			`${examples[index]?.firstNumber} ${examples[index]?.operation} ${examples[index]?.secondNumber} = ${result?.value} správně ${examples[index]?.result}`,
		);
	}
});

