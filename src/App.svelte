<script lang="ts">
  import Board from "$components/board/Board.svelte";

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
    min-height: 100vh;
    max-width: 100vw;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: "Titillium Web", sans-serif;
    font-weight: 400;
  }

  .game {
    display: grid;
    place-items: center;
  }

  header {
    min-height: 10rem;
  }
</style>

<header>
  <h1>{title}</h1>
</header>
<main>
  <section class="game">
    <Board />
  </section>
</main>
