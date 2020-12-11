<script lang="ts">
  export let bestScore: number;
  export let currScore: number;
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
    background-color: rgba(#f2b179, 0.84);
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
      color: #2e2e2e;
      opacity: 0.8;
    }

    & span {
      font-size: 4.2rem;
      color: #4d4d4d;
    }
  }
</style>

<div class="score-container">
  <div class="score score--best">
    <p class="score__title">Personal best</p>
    <span>{bestScore}</span>
  </div>
  <div class="score score--current">
    <p class="score__title">Score</p>
    <span>{currScore}</span>
  </div>
</div>
