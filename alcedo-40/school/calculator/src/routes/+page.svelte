<script lang="ts">
	import {
		ChevronDown,
		ChevronUp,
		Divide,
		Equal,
		HardDriveDownload,
		HardDriveUpload,
		Minus,
		Plus,
		Replace,
		X,
	} from "lucide-svelte";
	import Button from "./button.svelte";

	type Operation = "add" | "sub" | "mul" | "div" | "res" | "up" | "down";

	let buffer = $state<
		{
			type: Operation;
			value: number;
		}[]
	>([]);

	let inputValue = $state("");
	let systemValue = $state("10");
	let memoryValue = $state("1");
	let transferValue = $state("");
	let memory = $state(new Map<number, number>());

	let system = $derived.by(() => {
		const convertedValue = Number(systemValue);

		if (Number.isNaN(convertedValue)) {
			return 10;
		}

		return convertedValue;
	});

	let input = $derived.by(() => {
		const getConvertedValue = () => {
			if (system === 10) {
				return Number.parseFloat(inputValue);
			}

			return Number.parseInt(inputValue, system);
		};

		const convertedValue = getConvertedValue();
		if (Number.isNaN(convertedValue)) return;

		return convertedValue;
	});

	let memoryIndex = $derived.by(() => {
		const convertedValue = Number(memoryValue);
		if (Number.isNaN(convertedValue)) return;

		return convertedValue;
	});

	let transferTo = $derived.by(() => {
		const convertedValue = Number(transferValue);
		if (Number.isNaN(convertedValue)) return;

		return convertedValue;
	});

	const handleOperation = (type: Operation) => {
		if (input === undefined) return;

		buffer.push({
			type,
			value: input,
		});

		inputValue = "";

		switch (type) {
			case "res": {
				if (result === undefined) return;

				inputValue = result.toString(system);

				buffer = [];
				break;
			}
			case "up": {
				const valueToUp = result ?? input;

				inputValue = Math.pow(valueToUp, 2).toString(
					system,
				);
				buffer = [];
				break;
			}
			case "down": {
				const valueToUp = result ?? input;

				inputValue =
					Math.sqrt(valueToUp).toString(system);
				buffer = [];
				break;
			}
			default: {
				if (result === undefined) return;

				inputValue = result.toString(system);
				break;
			}
		}
	};

	let result = $derived(
		buffer.reduce<
			| {
					value: number;
					nextOperation: Operation;
			  }
			| undefined
		>((result, operation) => {
			if (result === undefined) {
				return {
					value: operation.value,
					nextOperation: operation.type,
				};
			}

			switch (result.nextOperation) {
				case "add":
					return {
						value:
							result.value +
							operation.value,
						nextOperation: operation.type,
					};
				case "sub":
					return {
						value:
							result.value -
							operation.value,
						nextOperation: operation.type,
					};
				case "mul":
					return {
						value:
							result.value *
							operation.value,
						nextOperation: operation.type,
					};
				case "div":
					return {
						value:
							result.value /
							operation.value,
						nextOperation: operation.type,
					};
				case "div":
					return {
						value:
							result.value /
							operation.value,
						nextOperation: operation.type,
					};
				default:
					return result;
			}
		}, undefined)?.value,
	);

	const saveMemory = () => {
		if (memoryIndex === undefined || input === undefined) return;

		memory.set(memoryIndex, input);
	};

	const loadMemory = () => {
		if (memoryIndex === undefined || input === undefined) return;

		const value = memory.get(memoryIndex);

		if (value === undefined) return;

		inputValue = value.toString(system);
	};

	const transfer = () => {
		if (input === undefined || transferTo === undefined) return;

		inputValue = input.toString(transferTo);

		systemValue = String(transferTo);
	};
</script>

<div class="inset-0 w-full absolute items-center justify-center flex">
	<div class="p-4 gap-2 flex flex-col w-64 pb-16">
		<input
			type="text"
			class="border rounded h-12 p-2"
			bind:value={inputValue}
		/>

		<div class="grid grid-cols-4 gap-2">
			<Button onclick={() => handleOperation("add")}>
				<Plus />
			</Button>
			<Button onclick={() => handleOperation("sub")}>
				<Minus />
			</Button>
			<Button onclick={() => handleOperation("mul")}>
				<X />
			</Button>
			<Button onclick={() => handleOperation("div")}>
				<Divide />
			</Button>
			<Button onclick={() => handleOperation("up")}>
				<ChevronUp />
			</Button>
			<Button onclick={() => handleOperation("down")}>
				<ChevronDown />
			</Button>
			<Button onclick={saveMemory}>
				<HardDriveDownload />
			</Button>
			<Button onclick={loadMemory}>
				<HardDriveUpload />
			</Button>
			<Button onclick={transfer}>
				<Replace />
			</Button>
			<Button onclick={() => handleOperation("res")}>
				<Equal />
			</Button>
		</div>
		<input
			type="number"
			class="border rounded h-12 p-2"
			placeholder="Soustava"
			bind:value={systemValue}
		/>
		<input
			type="number"
			class="border rounded h-12 p-2"
			placeholder="Paměť"
			bind:value={memoryValue}
		/>
		<input
			type="number"
			class="border rounded h-12 p-2"
			placeholder="Převod soustavy"
			bind:value={transferValue}
		/>
	</div>
</div>
