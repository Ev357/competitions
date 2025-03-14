<script lang="ts">
import Input from "$lib/components/ui/input/input.svelte";
import { onMount } from "svelte";

// biome-ignore lint/style/useConst: svelte
let canvasWidth = $state("600");
// biome-ignore lint/style/useConst: svelte
let numberCanvasWidth = $derived(Number(canvasWidth));
// biome-ignore lint/style/useConst: svelte
let canvasHeight = $state("400");
// biome-ignore lint/style/useConst: svelte
let numberCanvasHeight = $derived(Number(canvasHeight));

// biome-ignore lint/style/useConst: svelte
let middlePoint = $derived({
	x: Number(canvasWidth) / 3,
	y: Number(canvasHeight) / 2,
});

let index = $state(0);

onMount(() => {
	const canvas = document.getElementById("canvas");
	if (!(canvas instanceof HTMLCanvasElement)) return;

	const ctx = canvas.getContext("2d");
	if (!ctx) return;

	const steps: (() => void)[] = [
		() => {
			ctx.fillStyle = "white";
			ctx.fillRect(0, 0, Number(canvasWidth), Number(canvasHeight));
		},
		() => {
			ctx.strokeStyle = "red";
			ctx.beginPath();
			ctx.moveTo(0, numberCanvasHeight);
			ctx.lineTo(middlePoint.x, middlePoint.y);
			ctx.stroke();
		},
		() => {
			ctx.lineTo(numberCanvasWidth, middlePoint.y);
			ctx.stroke();
		},
		() => {
			ctx.lineTo(numberCanvasWidth, numberCanvasHeight);
			ctx.closePath();
			ctx.fillStyle = "red";
			ctx.fill();
		},
		() => {
			ctx.strokeStyle = "blue";
			ctx.beginPath();
			ctx.moveTo(0, numberCanvasHeight - 1);
			ctx.lineTo(middlePoint.x, middlePoint.y - 1);
			ctx.stroke();
		},
		() => {
			ctx.lineTo(0, 0);
			ctx.stroke();
		},
		() => {
			ctx.fillStyle = "blue";
			ctx.fill();
		},
	];

	const onEnter = (event: KeyboardEvent) => {
		if (event.key !== "Enter") return;

		const step = steps[index];
		if (!step) return;

		step();
		index++;
	};

	window.addEventListener("keydown", onEnter);
});
</script>

<div class="flex flex-col gap-2 p-2 inset-0 absolute justify-between">
	<canvas
		width={canvasWidth}
		height={canvasHeight}
		style:height={`${canvasHeight}px`}
		style:width={`${canvasWidth}px`}
		id="canvas"
		class="border"
	></canvas>
	<div class="flex gap-2">
		<Input
			type="number"
			step={50}
			class="w-fit"
			min={600}
			max={1200}
			placeholder="Width"
			bind:value={canvasWidth}
			onchange={() => {
				canvasHeight = String(
					(numberCanvasWidth / 3) * 2,
				);
			}}
		/>
		<Input
			type="number"
			step={50}
			class="w-fit"
			min={400}
			max={800}
			placeholder="Height"
			bind:value={canvasHeight}
			onchange={() => {
				canvasWidth = String(
					(numberCanvasHeight / 2) * 3,
				);
			}}
		/>
	</div>
</div>
