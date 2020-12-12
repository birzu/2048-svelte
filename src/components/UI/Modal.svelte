<script lang="ts">
  import { fade, fly, scale } from "svelte/transition";
  import { cubicOut, linear } from "svelte/easing";
  export let open: boolean;
</script>

<style lang="scss">
  .modal {
    box-sizing: border-box;
    width: 65vh;
    height: 30rem;
    outline: none;
    border: none;
    border-radius: 0.4rem;
    box-shadow: 0 4px 1.2rem 0 rgba($color: #000000, $alpha: 0.5);
    padding: 2.5rem 4rem;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    align-items: center;

    &__content {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
</style>

<dialog
  {open}
  class="modal"
  in:scale={{ duration: 200, easing: cubicOut }}
  out:fade={{ duration: 100, easing: linear }}>
  <div class="modal__header">
    <slot name="header" />
  </div>
  <div class="modal__content">
    <slot name="content" />
  </div>
  <div class="modal__actions">
    <slot name="actions" />
  </div>
</dialog>
