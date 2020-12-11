<script lang="ts">
  import Board from "$components/board/Board.svelte";
  import GameScores from "./components/game/GameScores.svelte";
  import Moves from "./components/UI/Moves.svelte";

  let title = "2048";
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
  }

  body {
    max-height: 100vh;
    max-width: 100vw;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: "Titillium Web", sans-serif;
    font-weight: 400;
  }

  .game {
    display: grid;
    width: 77vh;
    margin: 0 auto;
    grid-template-columns: 45vh 1fr;
    gap: 5rem;
  }

  .game-controls {
    display: flex;
    flex-direction: column;
    border-radius: 0.8rem;
    overflow: hidden;
  }

  header {
    width: 75vh;
    margin: 5rem auto 4rem auto;
    min-height: 14rem;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: max-content 1fr;
    justify-items: center;
    align-items: center;

    & .heading {
      font-size: 7.2rem;
      color: #776e65;
      font-weight: 600;
      justify-self: left;
    }

    & .description {
      font-size: 1.7rem;
      color: #776e65;

      & strong {
        font-size: 1.8rem;
      }
    }
  }

  .footer {
    width: 76vh;
    font-size: 1.6rem;
    color: #776e65;
    margin: 7rem auto 0 auto;

    & a {
      &:link,
      &:visited {
        font-weight: 600;
        color: #776e65;
      }
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
<main>
  <section class="game">
    <Board />
    <aside class="game-controls">
      <GameScores bestScore={0} currScore={0} />
      <Moves currMove="LEFT" />
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
