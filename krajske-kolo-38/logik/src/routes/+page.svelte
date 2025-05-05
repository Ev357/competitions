<script lang="ts">
    let colorCounts = $state([
        {
            id: 5,
            text: `5`,
        },
        {
            id: 6,
            text: `6`,
        },
        {
            id: 7,
            text: `7`,
        },
        {
            id: 8,
            text: `8`,
        },
    ]);

    let rowCounts = $state([
        {
            id: 4,
            text: `4`,
        },
        {
            id: 5,
            text: `5`,
        },
    ]);

    let ways = $state([
        {
            id: "detailed",
            text: `přesná pozice`,
        },
        {
            id: "not-detailed",
            text: `bez přesné pozice`,
        },
    ]);

    let colorCount = $state(5);
    let rowCount = $state(4);
    let way = $state("detailed");
    let repeat = $state(false);

    const colors = [
        "red",
        "green",
        "blue",
        "yellow",
        "purple",
        "orange",
        "pink",
        "cyan",
        "lime",
        "brown",
        "teal",
        "magenta",
    ] as const;

    type Color = (typeof colors)[number];

    const colorInfo: Record<Color, { hex: string; label: string }> = {
        red: { hex: "#FF0000", label: "Červená" },
        green: { hex: "#008000", label: "Zelená" },
        blue: { hex: "#0000FF", label: "Modrá" },
        yellow: { hex: "#FFFF00", label: "Žlutá" },
        purple: { hex: "#800080", label: "Fialová" },
        orange: { hex: "#FFA500", label: "Oranžová" },
        pink: { hex: "#FFC0CB", label: "Růžová" },
        cyan: { hex: "#00FFFF", label: "Azurová" },
        lime: { hex: "#00FF00", label: "Limetková" },
        brown: { hex: "#A52A2A", label: "Hnědá" },
        teal: { hex: "#008080", label: "Modrozelená" },
        magenta: { hex: "#FF00FF", label: "Purpurová" },
    };

    let gameState = $state<"initial" | "playing" | "won" | "lost">("initial");
    let availableColors = $state<Color[]>([]);

    let activeRow = $state(0);
    let answer = $state<Color[]>([]);

    let isRevealed = $state(false);

    const startGame = () => {
        activeRow = 0;
        game = {
            player: [],
            answer: [],
        };
        isRevealed = false;
        gameState = "playing";
        availableColors = getAvailableColors(colorCount);
        answer = generateAnswer(rowCount, repeat, availableColors);
        for (let step = 0; step < 10; step++) {
            game.player.push(Array(rowCount).fill(undefined));
            game.answer.push(Array(rowCount).fill(undefined));
        }
    };

    const getAvailableColors = (count: number): Color[] => {
        const shuffled = [...colors].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    };

    const generateAnswer = (
        count: number,
        allowDuplicates: boolean,
        pool: Color[],
    ) => {
        const selectedColors: Color[] = [];

        while (selectedColors.length < count) {
            const randomColor = pool[Math.floor(Math.random() * pool.length)];

            if (allowDuplicates || !selectedColors.includes(randomColor)) {
                selectedColors.push(randomColor);
            }
        }

        return selectedColors;
    };

    const getReadableTextColor = (hex: string) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);

        const brightness = (r * 299 + g * 587 + b * 114) / 1000;

        return brightness > 128 ? "black" : "white";
    };

    const pickColor = (color: Color) => {
        const row = game.player[activeRow];
        const lastEntry = row.findIndex((color) => color === undefined);

        row[lastEntry] = color;

        const isOver = !row.some((color) => color === undefined);

        if (isOver) {
            submitRow(row);
        }
    };

    const submitRow = (row: (Color | undefined)[]) => {
        if (way === "detailed") {
            const thingy = row.map((color, index) => {
                const currentAnswer = answer[index];

                if (currentAnswer === color) {
                    return true;
                } else {
                    return false;
                }
            });

            displayAnswer(thingy);
        } else {
            const thingy: (boolean | undefined)[] = [];
            let isDoomed = false;
            for (let index = 0; index < row.length; index++) {
                const currentAnswer = answer[index];

                if (currentAnswer === row[index] && !isDoomed) {
                    thingy.push(true);
                    continue;
                }

                isDoomed = true;
                if (answer.includes(row[index]!)) {
                    thingy.push(false);
                    continue;
                }

                thingy.push(undefined);
            }

            const converted: (boolean | undefined)[] = thingy.filter(
                (thing) => thing !== undefined,
            );
            for (let index = 0; index < row.length; index++) {
                if (converted[index] !== undefined) {
                    continue;
                }

                converted[index] = undefined;
            }

            displayAnswer(converted);
        }

        checkIfWon();
        activeRow++;
    };

    const displayAnswer = (thingy: (boolean | undefined)[]) => {
        game.answer[activeRow] = thingy;
    };

    const checkIfWon = () => {
        const row = game.answer[activeRow];
        const didWon = row.every((color) => color === true);

        if (didWon) {
            gameState = "won";
            return;
        }

        if (activeRow === game.answer.length - 1) {
            gameState = "lost";
            return;
        }
    };

    let game = $state<{
        player: (Color | undefined)[][];
        answer: (boolean | undefined)[][];
    }>({
        player: [],
        answer: [],
    });
</script>

<div
    class="p-2 absolute inset-0 flex justify-center items-center flex-col gap-2"
>
    {#if gameState === "initial"}
        <div class="flex flex-col gap-2 border p-1">
            <div class="flex gap-2">
                <p>Počet barev:</p>
                <select bind:value={colorCount} class="w-40 border rounded-md">
                    {#each colorCounts as question}
                        <option value={question.id}>
                            {question.text}
                        </option>
                    {/each}
                </select>
            </div>
            <div class="flex gap-2">
                <p>Opakování barev</p>
                <input type="checkbox" bind:checked={repeat} />
            </div>
            <div class="flex gap-2">
                <p>Počet políček v jedné řádce</p>
                <select bind:value={rowCount} class="w-40 border rounded-md">
                    {#each rowCounts as rowCount}
                        <option value={rowCount.id}>
                            {rowCount.text}
                        </option>
                    {/each}
                </select>
            </div>
            <div class="flex gap-2">
                <p>Způsob hodnocení</p>
                <select bind:value={way} class="w-40 border rounded-md">
                    {#each ways as way}
                        <option value={way.id}>
                            {way.text}
                        </option>
                    {/each}
                </select>
            </div>
        </div>

        <button class="border rounded-md px-4 py-1" onclick={startGame}>
            Hrát
        </button>
    {:else if gameState === "playing"}
        <div class="flex gap-4">
            <div class="flex flex-col gap-2">
                {#each game.player.toReversed() as row}
                    <div class="flex gap-2 border rounded-md p-2">
                        {#each row as field}
                            <div
                                class="size-8 border rounded-full"
                                style={`background-color: ${field !== undefined ? colorInfo[field].hex : "white"}`}
                            ></div>
                        {/each}
                    </div>
                {/each}
            </div>

            <div class="flex flex-col gap-2">
                {#each game.answer.toReversed() as row}
                    <div class="flex gap-2 border rounded-md p-2">
                        {#each row as field}
                            <div
                                class={`size-8 border rounded-full ${field !== undefined ? (field ? "bg-black" : "bg-white") : "bg-blue-200"}`}
                            ></div>
                        {/each}
                    </div>
                {/each}
            </div>
        </div>

        <div class="flex gap-2">
            {#each availableColors as color}
                <button
                    class="border rounded-md px-4 py-1 cursor-pointer"
                    style={`background-color: ${colorInfo[color].hex}; color: ${getReadableTextColor(colorInfo[color].hex)};`}
                    onclick={() => pickColor(color)}
                >
                    {colorInfo[color].label}
                </button>
            {/each}
        </div>

        <button
            onclick={() => (isRevealed = !isRevealed)}
            class="border rounded-md px-4 py-1 cursor-pointer"
        >
            Zobrazit odpověď
        </button>

        {#if isRevealed}
            <div class="flex gap-2">
                <div class="flex gap-2 border rounded-md p-2">
                    {#each answer as field}
                        <div
                            class="size-8 border rounded-full"
                            style={`background-color: ${field !== undefined ? colorInfo[field].hex : "white"}`}
                        ></div>
                    {/each}
                </div>
            </div>
        {/if}
    {:else if gameState === "won"}
        <div class="flex gap-2 flex-col">
            <p>Výhra :)</p>
            <button class="border rounded-md px-4 py-1" onclick={startGame}>
                hrát znovu
            </button>
        </div>
    {:else if gameState === "lost"}
        <div class="flex gap-2 flex-col">
            <p>Prohra :(</p>
            <button
                class="border rounded-md px-4 py-1"
                onclick={() => (gameState = "initial")}
            >
                hrát znovu
            </button>
        </div>
    {/if}
</div>
