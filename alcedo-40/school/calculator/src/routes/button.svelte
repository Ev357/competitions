<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";

	let {
		children,
		...rest
	}: { children: Snippet } & HTMLButtonAttributes = $props();
</script>

<button type="button" class="border rounded p-2 flex justify-center" {...rest}>
	{@render children()}
</button>
