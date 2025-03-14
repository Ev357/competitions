import { parseArgs } from "util";

const { values } = parseArgs({
	args: Bun.argv,
	options: {
		file: {
			type: "string",
		},
		word: {
			type: "string",
		},
	},
	strict: true,
	allowPositionals: true,
});

const isPalindrome = (input: string) => {
	const lengthIsOdd = input.length % 2 !== 0;

	const reverse = (string: string) => {
		return string.split("").toReversed().join("");
	};

	if (!lengthIsOdd) {
		const middleLength = input.length / 2;
		const firstHalf = input.slice(0, middleLength);
		const secondHalf = input.slice(middleLength);

		const isPalindrome = firstHalf === reverse(secondHalf);

		if (isPalindrome) {
			return true;
		}

		return false;
	}

	const middleLength = Math.floor(input.length / 2);
	const firstHalf = input.slice(0, middleLength);
	const secondHalf = input.slice(middleLength + 1);

	if (firstHalf === reverse(secondHalf)) {
		return true;
	}

	return false;
};

const word = (input: string) => {
	const isIt = isPalindrome(input);
	if (isIt) {
		console.log(`slovo je palindrom a má ${input.length} znaků`);
		return;
	}
	console.log("slovo není palindrom");
};
const file = async (filePath: string) => {
	const file = Bun.file(filePath);
	const text = await file.text();

	const sentences = text.split("\n").map((sentence) => sentence.trim());

	const palindromes: string[] = [];

	for (const sentence of sentences) {
		if (isPalindrome(sentence.toLowerCase().replaceAll(" ", ""))) {
			palindromes.push(sentence);
		}
	}

	for (const palindrome of palindromes) {
		console.log(palindrome);
	}

	const biggestPalindrome = palindromes.reduce<string | undefined>(
		(biggestPalindrome, palindrome) => {
			if (!biggestPalindrome) {
				return palindrome;
			}

			if (
				biggestPalindrome.replaceAll(" ", "").length >
				palindrome.replaceAll(" ", "").length
			) {
				return biggestPalindrome;
			}
			return palindrome;
		},
		undefined,
	);

	if (!biggestPalindrome) {
		console.log("nejsou žádné palindromy");
		return;
	}

	console.log(`největší palindrom je: ${biggestPalindrome}`);
	console.log(`má délku ${biggestPalindrome.replaceAll(" ", "").length}`);
};

if (values.word) {
	word(values.word.trim().toLowerCase());
}

if (values.file) {
	await file(values.file);
}

