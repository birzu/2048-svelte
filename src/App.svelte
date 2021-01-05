<script lang="ts">
  import Board from "$components/board/Board.svelte";
  import GameScores from "./components/game/GameScores.svelte";
  import Modal from "./components/UI/Modal.svelte";
  import Moves from "./components/UI/Moves.svelte";
  import { currentMove } from "./stores/currentMove";
  import { currentScore } from "./stores/currentScore";
  import type { TGState } from "./types";

  let title = "2048";
  let reset = false;
  let state: TGState = "RUNNING";
  let result = "";

  $: if (state === "OVER") {
    result = "You Lost";
  } else if (state === "WON") {
    result = "You Won";
  }
</script>

<style lang="scss" global>
  @import url("https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;600&display=swap");
  *,
  *::after,
  *::before {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 62.5%;

    @media only screen and (max-width: 37.5em) {
      font-size: 50%;
    }
  }

  body {
    min-height: 100vh;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: "Titillium Web", sans-serif;
    font-weight: 400;
    position: relative;
  }

  .game-container {
    height: 45vh;

    @media only screen and (max-width: 48em) {
      height: 40vh;
    }
    @media only screen and (max-width: 37.5em) {
      height: auto;
    }
  }

  .game {
    display: grid;
    width: 77vh;
    margin: 0 auto;
    grid-template-columns: 45vh 1fr;
    grid-template-rows: 45vh;
    gap: 5rem;

    @media only screen and (max-width: 48em) {
      width: 68vh;
      grid-template-columns: 40vh 1fr;
      grid-template-rows: 40vh;
      gap: 3rem;
    }
    @media only screen and (max-width: 40em) {
      width: 66vh;
      grid-template-columns: 40vh 1fr;
      grid-template-rows: 40vh;
    }
    @media only screen and (max-width: 37.5em) {
      width: 44vh;
      grid-template-columns: 44vh;
      grid-template-rows: 1fr 44vh;
      justify-content: center;
      gap: 2rem;
    }
    @media only screen and (max-width: 30em) {
      width: 36vh;
      grid-template-columns: 36vh;
      grid-template-rows: 1fr 36vh;
      gap: 1rem;
    }
    @media only screen and (max-width: 23.4375em) {
      width: 40vh;
      grid-template-columns: 40vh;
      grid-template-rows: 1fr 40vh;
      gap: 1rem;
    }
    @media only screen and (max-width: 17.5em) {
      width: 36vh;
      grid-template-columns: 36vh;
      grid-template-rows: 1fr 36vh;
      gap: 1rem;
    }
  }

  .game-controls {
    height: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 0.8rem;
    overflow: hidden;
    @media only screen and (max-width: 37.5em) {
      grid-row: 1 / 2;
      height: 100%;
      flex-direction: row;
      padding: 0.6rem 0;
    }
  }

  header {
    width: 75vh;
    padding: 3em 4em;
    margin: 0 auto;
    min-height: 10vh;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: max-content 1fr;
    justify-items: center;
    align-items: center;

    @media only screen and (max-width: 48em) {
      width: 67vh;
    }
    @media only screen and (max-width: 40em) {
      width: 65vh;
    }
    @media only screen and (max-width: 37.5em) {
      width: 48vh;
      min-height: 10rem;
      padding: 3rem 2rem;
    }
    @media only screen and (max-width: 30em) {
      width: 38vh;
    }
    @media only screen and (max-width: 23.4375em) {
      width: 42vh;
    }
    @media only screen and (max-width: 17.5em) {
      width: 36vh;
    }
    & .heading {
      font-size: 7.2rem;
      color: #776e65;
      font-weight: 600;
      justify-self: left;
      @media only screen and (max-width: 40em) {
        font-size: 6.8rem;
      }
      @media only screen and (max-width: 37.5em) {
        font-size: 5.2rem;
      }
    }

    & .description {
      font-size: 1.7rem;
      color: #776e65;
      @media only screen and (max-width: 37.5em) {
        font-size: 1.8rem;
      }
      @media only screen and (max-width: 23.4375em) {
        font-size: 1.6rem;
      }

      & strong {
        font-size: 1.8rem;
        @media only screen and (max-width: 37.5em) {
          font-size: 1.8rem;
        }
        @media only screen and (max-width: 23.4375em) {
          font-size: 1.6rem;
        }
      }
    }
  }

  .footer {
    width: 76vh;
    font-size: 1.6rem;
    color: #776e65;
    margin: 7rem auto 0 auto;

    @media only screen and (max-width: 48em) {
      width: 70vh;
    }
    @media only screen and (max-width: 40em) {
      width: 65vh;
    }
    @media only screen and (max-width: 37.5em) {
      width: 48vh;
      font-size: 1.7rem;
    }
    @media only screen and (max-width: 30em) {
      width: 36vh;
    }
    @media only screen and (max-width: 23.4375em) {
      width: 40vh;
      margin-bottom: 2rem;
    }
    @media only screen and (max-width: 17.5em) {
      width: 36vh;
      margin-bottom: 2rem;
    }
    & a {
      &:link,
      &:visited {
        font-weight: 600;
        color: #776e65;
      }
    }
  }

  .modal-root {
    position: fixed;
    background-color: rgba(#fff, 0.4);
    backdrop-filter: blur(2px);
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
  }

  .game__result {
    font-size: 4.4rem;
    color: #776e65;
    margin-bottom: 1.2rem;
    font-weight: 400;
  }

  .game__scores {
    width: 80%;
    display: flex;
    font-size: 2rem;
    color: #776e65;
    justify-content: center;
    margin-bottom: 2.5rem;
    & strong {
      text-transform: uppercase;
      font-size: 2rem;
    }
  }

  .game__reset {
    cursor: pointer;
    padding: 1.2rem 2rem;
    font-size: 1.8rem;
    font-weight: 600;
    color: #f6f9f1;
    background-color: #655d55;
    outline: none;
    border: none;
    border-radius: 0.3rem;

    &:focus {
      outline: 3px solid #f2b179;
    }
  }
</style>

<header>
  <h1 class="heading">{title}</h1>
  <p class="description">
    <strong>How to play: </strong>
    Use
    <strong>arrow keys</strong>
    to move the tiles. When two adjecent tiles have the same number inside they
    merge and create a new tile.
    <strong>Win</strong>
    by getting the value of a tile to
    <strong>2048</strong>. Game over when there is no more space for new tiles.
  </p>
</header>
<main class="game-container">
  <section class="game">
    <Board
      on:update-state={(e) => {
        state = e.detail.state;
      }}
      shouldReset={reset} />
    <aside class="game-controls">
      <GameScores />
      <Moves currMove={$currentMove} />
    </aside>
  </section>
</main>
<footer class="footer">
  Based on the famous game
  <a
    href="https://github.com/gabrielecirulli/2048"
    rel="noopener"
    target="_blank">2048</a>
  by Gabriele Cirulli. This implementation is made using Svelte and Typescript
  which is also open source and the source code can be found on
  <a
    href="https://github.com/birzu/2048-svelte"
    rel="noopener"
    target="_blank">github</a>
</footer>
{#if state === 'OVER' || state === 'WON'}
  <div class="modal-root">
    <Modal open={false}>
      <h3 slot="header" class="game__result">{result}</h3>
      <button
        class="game__reset"
        slot="actions"
        on:click={() => (reset = true)}>New game</button>
      <div class="game__scores" slot="content">
        <div class="game__scores game__scores--curr">
          <p><strong>Score: </strong><span>{$currentScore}</span></p>
        </div>
      </div>
    </Modal>
  </div>
{/if}
