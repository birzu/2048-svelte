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
  }

  .score {
    background-color: rgba(#eee4da, 0.5);
    margin: 0 1rem 1rem 1rem;
    border-radius: 0.7rem;
    padding: 1rem 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    &:not(:first-child) {
      margin: 1rem;
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

  @media only screen and (max-width: 56.25em) {
    .score {
      line-height: 1.3;
      padding: 0.7rem 1.2rem;
      & span {
        font-size: 3.2rem;
      }
    }
  }
  @media only screen and (max-width: 37.5em) {
    .score-container {
      padding: 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    .score {
      line-height: 1.3;
      flex-basis: 48%;
      height: 100%;
      padding: 0.4rem 0.2rem;

      &:not(:first-child) {
        margin: 0;
      }

      & span {
        font-size: 3.2rem;
      }
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
