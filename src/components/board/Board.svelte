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
  import type { TGState, MatMoveFn, SwipeDirection } from "$src/types";
  import { pickRandomCellValue, pickRandomCoords } from "$src/utils";
  import { afterUpdate, createEventDispatcher, onMount, tick } from "svelte";

  export let shouldReset: boolean;

  const dispatch = createEventDispatcher();
  let mat = Array.from({ length: GRID_SIZE }, () => {
    return new Array(GRID_SIZE).fill(0);
  });
  let gameState: TGState = "RUNNING";
  let prevMat = mat;
  let swipedirn: SwipeDirection | null = null;

  let threshold = 150;
  let duration = 300;
  let restraint = 100;

  let startX: number | null = null;
  let startY: number | null = null;
  let startTime: number, timeElapsed: number;

  const touchstart = function (e: TouchEvent) {
    [startX, startY] = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];
    startTime = Date.now();
  };

  const touchmove = function (e: TouchEvent) {
    e.preventDefault();
  };

  const touchend = function (e: TouchEvent) {
    if (!startX || !startY) return;
    let dirn: SwipeDirection;
    let { pageX, pageY } = e.changedTouches[0];
    let [xoffset, yoffset] = [pageX - startX, pageY - startY];
    timeElapsed = Date.now() - startTime;

    if (timeElapsed >= duration) return;

    if (Math.abs(xoffset) >= threshold && Math.abs(yoffset) <= restraint) {
      dirn = xoffset < 0 ? "left" : "right";
      swipedirn = dirn;
    } else if (
      Math.abs(yoffset) >= threshold &&
      Math.abs(xoffset) <= restraint
    ) {
      dirn = yoffset < 0 ? "up" : "down";
      swipedirn = dirn;
    }
  };

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
    dispatch("update-state", { state: gameState });
    if (addPossible) {
      addRandomCell();
      gameState = getState(mat);
      dispatch("update-state", { state: gameState });
    }
  };

  const reset = function () {
    gameState = "RUNNING";
    mat = Array.from({ length: GRID_SIZE }, () => {
      return new Array(GRID_SIZE).fill(0);
    });
    addRandomCell();
    addRandomCell();
    dispatch("update-state", { state: gameState });
  };

  const handleKeydown = function (event: KeyboardEvent) {
    switch (event.code) {
      case "ArrowLeft":
        currentMove.setMove("LEFT");
        gameState === "RUNNING" && updateMat(moveLeft);
        currentMove.reset();
        break;
      case "ArrowRight":
        currentMove.setMove("RIGHT");
        gameState === "RUNNING" && updateMat(moveRight);
        currentMove.reset();
        break;
      case "ArrowUp":
        currentMove.setMove("UP");
        gameState === "RUNNING" && updateMat(moveUp);
        currentMove.reset();
        break;
      case "ArrowDown":
        currentMove.setMove("DOWN");
        gameState === "RUNNING" && updateMat(moveDown);
        currentMove.reset();
        break;
    }
  };

  onMount(() => {
    addRandomCell();
    addRandomCell();
  });

  afterUpdate(async () => {
    if (shouldReset) {
      reset();
    }

    if (swipedirn) {
      switch (swipedirn) {
        case "left":
          currentMove.setMove("LEFT");
          gameState === "RUNNING" && updateMat(moveLeft);
          currentMove.reset();
          swipedirn = null;
          break;

        case "right":
          currentMove.setMove("RIGHT");
          gameState === "RUNNING" && updateMat(moveRight);
          currentMove.reset();
          swipedirn = null;
          break;

        case "up":
          currentMove.setMove("UP");
          gameState === "RUNNING" && updateMat(moveUp);
          currentMove.reset();
          swipedirn = null;
          break;

        case "down":
          currentMove.setMove("DOWN");
          gameState === "RUNNING" && updateMat(moveDown);
          currentMove.reset();
          swipedirn = null;
          break;
      }
    }
  });
</script>

<style lang="scss">
  @import "src/styles/vars.scss";

  .board {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 1rem;
    background-color: $color-board-bg;
    padding: 1rem;
    border-radius: 0.7rem;

    @media only screen and (max-width: 37.5em) {
      justify-self: center;
      width: 97%;
      height: 97%;
    }
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

<svelte:window on:keydown={handleKeydown} />

<article
  class="board"
  on:touchstart|stopPropagation={touchstart}
  on:touchmove|stopPropagation={touchmove}
  on:touchend|stopPropagation={touchend}
  on:touchcancel|stopPropagation={() => {
    swipedirn = null;
  }}>
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
