<script lang="ts">
  import {
    getState,
    GRID_SIZE,
    moveDown,
    moveLeft,
    moveRight,
    moveUp,
  } from "$src/game";
  import { bestScore } from "$src/stores/bestScore";
  import { currentMove } from "$src/stores/currentMove";
  import { currentScore } from "$src/stores/currentScore";
  import type { TGState, MatMoveFn } from "$src/types";
  import { pickRandomCellValue, pickRandomCoords } from "$src/utils";
  import { onMount } from "svelte";

  let mat = Array.from({ length: GRID_SIZE }, () => {
    return new Array(GRID_SIZE).fill(0);
  });
  let gameState: TGState = "RUNNING";
  let prevMat = mat;

  $: prevScore = $currentScore;
  $: addPossible = mat.some((row) => row.some((cell) => cell === 0));
  $: if ($currentScore > $bestScore) {
    bestScore.setNewBest($currentScore);
    localStorage.setItem("best-score", $currentScore.toString());
  }

  const addRandomCell = function () {
    const n = pickRandomCellValue();

    let [i, j] = pickRandomCoords();
    while (mat[i][j] !== 0) {
      [i, j] = pickRandomCoords();
    }

    mat[i][j] = n;
  };

  // mutates mat
  const updateMat = function (fn: MatMoveFn) {
    const ns = fn(mat, $currentScore);
    prevMat = mat;
    mat = ns.mat;
    // update currentScore
    prevScore = $currentScore;
    currentScore.setCurrent(ns.score);
    gameState = getState(mat);
    if (addPossible) {
      addRandomCell();
      gameState = getState(mat);
    }
  };

  window.addEventListener("keydown", function (e) {
    switch (e.code) {
      case "ArrowLeft":
        currentMove.setMove("LEFT");
        gameState === "RUNNING" && updateMat(moveLeft);
        break;
      case "ArrowRight":
        currentMove.setMove("RIGHT");
        gameState === "RUNNING" && updateMat(moveRight);
        break;
      case "ArrowUp":
        currentMove.setMove("UP");
        gameState === "RUNNING" && updateMat(moveUp);
        break;
      case "ArrowDown":
        currentMove.setMove("DOWN");
        gameState === "RUNNING" && updateMat(moveDown);
        break;
    }
  });

  onMount(() => {
    addRandomCell();
    addRandomCell();
  });
</script>

<style lang="scss">
  @import "src/styles/vars.scss";

  .board {
    width: 45vh;
    height: 45vh;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 1rem;
    background-color: $color-board-bg;
    padding: 1rem;
    border-radius: 0.7rem;
  }

  .cell-container {
    border-radius: 0.4rem;
    display: grid;
    place-items: center;
    background-color: $color-cell-bg;
  }

  .cell {
    border-radius: 0.4rem;
    font-size: 3rem;
    font-weight: 600;
    grid-column: 1 / -1;
    grid-row: 1/ -1;
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
  }

  .score {
    font-size: 3.6rem;
    color: $color-board-bg;
    margin-bottom: 1.8rem;
  }
</style>

{#if gameState === 'RUNNING'}
  <article class="board">
    {#each mat as r, i}
      {#each r as cell, j ({ i, j, cell })}
        <div class="cell-container">
          {#if cell}
            <div class={`cell ${`cell-bg--${cell} cell-color--${cell}`}`}>
              {!!cell ? cell : ''}
            </div>
          {/if}
        </div>
      {/each}
    {/each}
  </article>
{:else if gameState === 'OVER'}
  <article class="game-over">
    <h1>Game Over</h1>
  </article>
{:else}
  <article class="game-won">
    <h1>You Won!</h1>
  </article>
{/if}
