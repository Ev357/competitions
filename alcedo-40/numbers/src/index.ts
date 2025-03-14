const sourceFolder = "src";

// a)
await (async () => {
	let isGood = false;
	console.log("a)");
	while (!isGood) {
		const number = prompt("číslo v desítkové spustavě\n>")?.trim();
		if (number === undefined || number === "" || number === null) {
			console.log("Neplatné číslo");
			continue;
		}
		const convertedNumber = Number.parseInt(number);

		if (Number.isNaN(convertedNumber)) {
			console.log("Neplatné číslo");
			continue;
		}

		const binary = convertedNumber.toString(2);

		console.log(`původní číslo: ${number}`);
		console.log(`binární číslo: ${binary}`);
		isGood = true;
	}
})();

// b)
await (async () => {
	let isGood = false;
	console.log("b)");
	while (!isGood) {
		const number = prompt("číslo v šestnáctkové spustavě\n>")?.trim();
		if (number === undefined || number === "" || number === null) {
			console.log("Neplatné číslo");
			continue;
		}
		const convertedNumber = Number.parseInt(number, 16);

		if (Number.isNaN(convertedNumber)) {
			console.log("Neplatné číslo");
			continue;
		}

		const binary = convertedNumber.toString(2);

		console.log(`původní číslo: ${number}`);
		console.log(`binární číslo: ${binary}`);
		isGood = true;
	}
})();

const numbersFile = Bun.file(`${sourceFolder}/CISLA.txt`);
const numbersText = await numbersFile.text();
const allNumbers = numbersText
	.split(" ")
	.map((number) => Number.parseInt(number.trim()));

// c)
await (async () => {
	console.log("c)");
	for (const number of allNumbers) {
		console.log(number);
	}
})();

// d)
await (async () => {
	console.log("d)");

	const isPrime = (number: number) => {
		if (number < 2) {
			return false;
		}

		for (let i = 2, max = Math.sqrt(number); i <= max; i++) {
			if (number % i === 0) {
				return false;
			}
		}

		return true;
	};

	const countOfPrimes = allNumbers.reduce((count, number) => {
		if (isPrime(number)) {
			count++;
		}
		return count;
	}, 0);

	console.log(`Počet prvočíselných čísel: ${countOfPrimes}`);
})();

// e)
await (async () => {
	console.log("e)");

	for (const number of allNumbers) {
		const binary = number.toString(2);
		console.log(`${number} ${binary}`);
	}
})();

// f)
await (async () => {
	console.log("f)");

	const data = allNumbers.join("\n");

	await Bun.write(`${sourceFolder}/CISLA2.txt`, data);

	console.log("Soubor CISLA2.txt byl vytvořen");
})();

// g)
await (async () => {
	console.log("g)");

	const biggestNumber = allNumbers.reduce((biggestNumber, number) => {
		if (number > biggestNumber) {
			return number;
		}
		return biggestNumber;
	}, 0);

	const numberInHex = biggestNumber.toString(16);

	console.log(`Největší číslo v hex: ${numberInHex}`);
})();

// h)
await (async () => {
	const hexNumbersFile = Bun.file(`${sourceFolder}/CISLAHEX.txt`);
	const hexNumbersText = await hexNumbersFile.text();
	const allHexNumbers = hexNumbersText
		.split(" ")
		.map((number) => Number.parseInt(number.trim().toUpperCase(), 16));

	const binaryNumbers = allHexNumbers.map((number) => number.toString(2));

	for (const number of binaryNumbers) {
		console.log(number);
	}
})();

