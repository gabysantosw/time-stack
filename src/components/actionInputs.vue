<template>
  <div>
    <label for="name" class="visually-hidden">Name:</label>
    <input
      type="text"
      name="name"
      placeholder="Name your action"
      id="name"
      class="input input--text"
      ref="autofocus"
      v-model="action.name"
      required
    />

    <label for="duration" class="duration">
      Duration: <span class="duration__digits">{{ action.duration }}m</span>
    </label>
    <input
      type="range"
      name="duration"
      id="duration"
      class="input input--range"
      min="5"
      max="240"
      step="5"
      v-model="action.duration"
    />

    <div class="radio">
      <p class="visually-hidden">Color:</p>

      <input
        type="radio"
        name="color"
        id="blue"
        class="input input--radio"
        value="blue"
        v-model="action.color"
      />
      <label for="blue" class="radio__label --blue">
        <span class="visually-hidden">Blue</span>
      </label>

      <input
        type="radio"
        name="color"
        id="green"
        class="input input--radio"
        value="green"
        v-model="action.color"
      />
      <label for="green" class="radio__label --green">
        <span class="visually-hidden">Green</span>
      </label>

      <input
        type="radio"
        name="color"
        id="red"
        class="input input--radio"
        value="red"
        v-model="action.color"
      />
      <label for="red" class="radio__label --red">
        <span class="visually-hidden">Red</span>
      </label>

      <input
        type="radio"
        name="color"
        id="purple"
        class="input input--radio"
        value="purple"
        v-model="action.color"
      />
      <label for="purple" class="radio__label --purple">
        <span class="visually-hidden">purple</span>
      </label>

      <input
        type="radio"
        name="color"
        id="yellow"
        class="input input--radio"
        value="yellow"
        v-model="action.color"
      />
      <label for="yellow" class="radio__label --yellow">
        <span class="visually-hidden">yellow</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    action: {
      type: Object
    }
  },
  mounted() {
    this.$refs.autofocus.focus();
  }
};
</script>

<style lang="scss">
.input {
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 1.25em;

  &:invalid {
    box-shadow: 0 0 0 0.25rem $invalid;
  }

  &:focus {
    opacity: 1;
  }

  &--text {
    padding: 0.75em 1em;
    border: none;
    border-bottom: 0.25rem solid $accent;
    border-radius: $main-radius;
    background-color: $neutro;
    font-size: 1rem;

    transition: opacity ease-in-out 400ms;
    opacity: 0.5;
  }

  &--range {
  }

  &--radio {
    display: none;
  }
}

.duration {
  display: block;
  margin-bottom: 0.5em;
  &__digits {
    font-size: 1.25rem;
    font-family: $monospace;
  }
}

.radio {
  display: flex;
  justify-content: space-between;

  margin-bottom: 1em;

  &__label {
    cursor: pointer;
    width: $MIN_TOUCH_SIZE;
    height: $MIN_TOUCH_SIZE;
    border-radius: 50%;

    position: relative;

    &::after {
      content: '';
      display: block;
      height: 100%;
      width: 100%;
      border-radius: 50%;
      box-shadow: inset 0 0 0 0.25rem $accent;

      transition: opacity ease-in-out 400ms;
      opacity: 0;
    }

    .input--radio:checked + &::after {
      opacity: 1;
    }
  }
}
</style>
