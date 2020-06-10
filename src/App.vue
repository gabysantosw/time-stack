<template>
  <div id="app" class="app">
    <router-view />
    <nav class="nav" v-if="isNotStartView">
      <ul class="nav__list">
        <li class="nav__item">
          <router-link to="/stack" class="nav__link">Stack</router-link>
        </li>
        <li class="nav__item">
          <router-link to="/actions" class="nav__link">Actions</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  created() {
    // get innerHeight from window
    window.addEventListener('load', () => {
      let innerHeight = window.innerHeight;
      document.documentElement.style.setProperty(
        '--fullHeight',
        `${innerHeight}px`
      );
    });

    // handle window resizes
    window.addEventListener('resize', () => {
      let innerHeight = window.innerHeight;
      document.documentElement.style.setProperty(
        '--fullHeight',
        `${innerHeight}px`
      );
    });
  },
  computed: {
    isNotStartView() {
      return this.$route.name !== 'Start';
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/main.scss';

:root {
  --fullHeight: 100vh;
}

.app {
  min-height: var(--fullHeight);
  display: flex;
  align-items: stretch;

  position: relative;
}

.nav {
  position: fixed;
  bottom: 0;

  width: 100%;
  overflow: hidden;

  &__list {
    display: flex;
    background-color: $dark;
    text-align: center;
  }

  &__item {
    flex-grow: 1;
  }

  &__link {
    display: block;
    box-sizing: border-box;
    min-height: $NAV_HEIGHT;
    padding: 0.7em;
    background-color: $light;

    font-size: 1rem;
    color: $dark;
    text-decoration: none;

    position: relative;

    &:hover,
    &:focus {
      opacity: 0.9;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -0.4rem;
      left: 15%;

      width: 70%;
      height: 0.4rem;
      border-radius: $high-radius $high-radius 0 0;
      background-color: $accent;
      transition: transform ease-in-out 400ms;
    }

    &.route--active::after {
      transform: translateY(-0.4rem);
    }
  }
}
</style>
