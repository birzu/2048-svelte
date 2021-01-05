<script lang="ts">
  import { bestScore } from "$src/stores/bestScore";
  import { currentScore } from "$src/stores/currentScore";
</script>

<style lang="scss">
  .score-container {
    color: #4d4d4d;
    font-size: 1.6rem;
    padding: 0rem 2rem;
    border-bottom-left-radius: 0.8rem;
    border-bottom-right-radius: 0.8rem;
    @media only screen and (max-width: 37.5em) {
      padding: 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }

  .score {
    background-color: rgba(#eee4da, 0.5);
    margin: 0 1rem 1rem 1rem;
    border-radius: 0.7rem;
    padding: 1rem 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media only screen and (max-width: 37.5em) {
      line-height: 1.4;
      flex-basis: 48%;
      height: 77%;
      margin: 0;
      padding: 0.4rem 0.2rem;
    }

    &:not(:first-child) {
      margin: 1rem;
      @media only screen and (max-width: 37.5em) {
        margin: 0;
      }
    }

    &__title {
      font-size: 1.4rem;
      text-transform: uppercase;
      font-weight: 600;
      color: #777;
      opacity: 0.8;
    }

    & span {
      font-size: 4.2rem;
      color: #776e65;
    }
  }
</style>

<div class="score-container">
  <div class="score score--best">
    <p class="score__title">Personal best</p>
    <span>{$bestScore}</span>
  </div>
  <div class="score score--current">
    <p class="score__title">Score</p>
    <span>{$currentScore}</span>
  </div>
</div>
