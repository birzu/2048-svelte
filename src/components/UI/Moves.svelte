<script lang="ts">
  import type { TMoves } from "$src/types";

  export let currMove: TMoves | null;

  $: isLeft = currMove === "LEFT";
  $: isRight = currMove === "RIGHT";
  $: isUp = currMove === "UP";
  $: isDown = currMove === "DOWN";
</script>

<style lang="scss">
  .moves {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-row-gap: 0.8rem;
    padding: 0 2rem;
    justify-items: center;
    align-items: center;
    margin-top: auto;
    margin-bottom: 0.3rem;
    border-radius: 0.8rem;

    &--up {
      grid-row: 1/ 2;
      grid-column: 1/ -1;
    }

    &--up,
    &--down,
    &--right,
    &--left {
      font-size: 3.6rem;
      line-height: 1.2;
      border: 2px solid #f2b179;
      padding: 0.5rem 1rem;
      min-width: 6rem;
      border-radius: 0.5rem;
      text-align: center;
      color: darken(#ede0c8, 30%);
    }
  }

  @keyframes flash {
    0% {
      background-color: transparent;
    }
    100% {
      background-color: #f2b179;
      color: #f9f6f2;
    }
  }
  .move-active {
    animation: flash 0.1s ease-out;
  }

  @media only screen and (max-width: 120em) {
    .moves {
      &--up,
      &--down,
      &--right,
      &--left {
        min-width: 5rem;
        font-size: 3.4rem;
      }
    }
  }
  @media only screen and (max-width: 75em) {
    .moves {
      &--up,
      &--down,
      &--right,
      &--left {
        min-width: 4.8rem;
        font-size: 3.2rem;
      }
    }
  }
  @media only screen and (max-width: 56.25em) {
    .moves {
      &--up,
      &--down,
      &--right,
      &--left {
        min-width: 4.4rem;
        font-size: 3rem;
      }
    }
  }

  @media only screen and (max-width: 48em) {
    .moves {
      &--up,
      &--down,
      &--right,
      &--left {
        min-width: 3.6rem;
        font-size: 2.8rem;
      }
    }
  }
  @media only screen and (max-width: 40em) {
    .moves {
      &--up,
      &--down,
      &--right,
      &--left {
        min-width: 3.2rem;
        font-size: 2.8rem;
      }
    }
  }
  @media only screen and (max-width: 37.5em) {
    .moves {
      display: none;
      visibility: hidden;
    }
  }
</style>

<div class="moves">
  <div class="moves--up" class:move-active={isUp}>&#8593;</div>
  <div class="moves--left" class:move-active={isLeft}>&#8592;</div>
  <div class="moves--down" class:move-active={isDown}>&#8595;</div>
  <div class="moves--right" class:move-active={isRight}>&#8594;</div>
</div>
