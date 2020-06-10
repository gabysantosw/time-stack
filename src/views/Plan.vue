<template>
  <div class="plan__wrapper">
    <section class="plan">
      <h1 class="heading">Plan your stack</h1>
      <p class="time">
        <span class="visually-hidden">Current time:</span>
        <span class="time__digits">{{ formatTime }}</span>
      </p>
      <ul class="" v-if="planIsNotEmpty">
        <li
          class="action-plan"
          v-for="(action, index) in plan"
          :key="index"
          :class="[handleColor(action.color)]"
        >
          <span class="action-plan__name">{{ action.name }}</span>
          <span class="action-plan__duration">{{ action.duration }}m</span>
          <button class="action-plan__delete" @click="deleteFromPlan(index)">
            Remove
          </button>
        </li>
      </ul>
      <p class="plan__empty" v-else>
        To begin a stack, you need an action
      </p>
      <p class="info" v-if="planIsNotEmpty">
        Stack duration:
        <span class="info__duration">{{ getTotalDuration }}m</span>, ends at
        <span class="info__end-time">{{ getEndTime }}</span>
      </p>
      <router-link
        class="button button--start"
        :to="{ name: 'Start', params: { endTime: getEndTime } }"
        v-if="planIsNotEmpty"
      >
        Start!
      </router-link>
    </section>
    <aside class="aside">
      <h2 class="aside__heading">Actions</h2>
      <ul class="" v-if="actionsIsNotEmpty">
        <li
          class="side-action"
          v-for="(action, index) in actions"
          :key="index"
          :class="[handleColor(action.color)]"
        >
          <button class="side-action__button" @click="addToPlan(action)">
            <span class="side-action__name">{{ action.name }}</span>
            <span class="side-action__duration">{{ action.duration }}m</span>
          </button>
        </li>
      </ul>
      <router-link to="/actions/add" class="button button--aside">
        Add action
      </router-link>
    </aside>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Plan',
  created() {
    this.actions = this.actionsGetter;
    this.plan = this.planGetter;
    this.currentTime = new Date();
  },
  data() {
    return {
      actions: [],
      plan: [],
      currentTime: null,
      interval: null
    };
  },
  mounted() {
    this.interval = window.requestAnimationFrame(this.updateTime);
  },
  destroyed() {
    this.endInterval();
  },
  methods: {
    ...mapActions(['add_to_plan', 'delete_from_plan']),
    addToPlan(action) {
      this.add_to_plan(action);
    },
    deleteFromPlan(index) {
      this.delete_from_plan(index);
    },
    updateTime() {
      this.currentTime = new Date();
      this.interval = window.requestAnimationFrame(this.updateTime);
    },
    endInterval() {
      window.cancelAnimationFrame(this.interval);
      this.interval = null;
    },
    handleColor(color) {
      return {
        '--blue': color === 'blue' ? true : false,
        '--green': color === 'green' ? true : false,
        '--red': color === 'red' ? true : false,
        '--purple': color === 'purple' ? true : false,
        '--yellow': color === 'yellow' ? true : false
      };
    }
  },
  computed: {
    ...mapGetters(['actionsGetter', 'planGetter']),
    actionsIsNotEmpty() {
      return this.actions.length !== 0;
    },
    planIsNotEmpty() {
      return this.plan.length !== 0;
    },
    formatTime() {
      let minutes = this.currentTime.getMinutes();
      if (minutes < 10) minutes = `0${minutes}`;
      return `${this.currentTime.getHours()}:${minutes}`;
    },
    getTotalDuration() {
      let total = 0;
      for (const action of this.plan) {
        total += action.duration;
      }
      return total;
    },
    getEndTime() {
      const endTime = new Date(
        // minutes to miliseconds: minutes * 60000
        this.currentTime.getTime() + this.getTotalDuration * 60000
      );
      let minutes = endTime.getMinutes();
      if (minutes < 10) minutes = `0${minutes}`;
      return `${endTime.getHours()}:${minutes}`;
    }
  }
};
</script>

<style lang="scss">
.plan {
  flex-grow: 1;
  padding: $main-pad $main-pad 8rem $main-pad;

  &__wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  &__empty {
    color: $o-light;
  }
}

.info {
  color: $o-light;
  text-align: center;
  line-height: 1.25em;

  &__duration,
  &__end-time {
    font-size: 1.125rem;
    font-family: $monospace;
    color: $light;
  }
}

.aside {
  flex-shrink: 0;
  width: 6rem;
  padding: 1em 0.5em;
  background-color: $neutro;
  color: $o-dark;
  text-align: center;

  &__heading {
    font-size: 1rem;
    margin-bottom: 1em;
  }
}

.time {
  display: flex;
  justify-content: flex-end;

  margin: 0 -1rem 2em -1rem;
  border-bottom: 0.25em solid $accent;

  font-size: 1rem;
  font-family: $monospace;
  line-height: 1em;

  position: relative;

  &__digits {
    position: absolute;
    bottom: -1.7em;

    padding: 0.25em 0.5em;
    border-radius: 0 0 0 $main-radius;
    background-color: $accent;
  }
}

.action-plan {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  min-height: 4rem;

  padding: 0.5em 1em;
  border-radius: $main-radius;
  margin-bottom: 0.5em;

  color: $dark;

  position: relative;

  &__name {
    align-self: center;

    text-transform: capitalize;
    // to avoid long words from breaking the layout
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
    hyphens: auto;
  }

  &__duration {
    flex-shrink: 0;
    color: $o-dark;
    font-family: $monospace;
    font-size: 1rem;
    min-width: 3.25em;
    text-align: right;
  }

  &__delete {
    position: absolute;
    top: 0;
    right: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    box-sizing: border-box;
    width: 4rem;
    padding: 1em;
    border-radius: 0 $main-radius 0 $main-radius;
    background-color: $light;

    color: $dark;
    text-align: center;
    font-size: 0.85rem;
    text-transform: uppercase;
    text-decoration: none;
  }
}

.side-action {
  box-shadow: inset 0 0 0 0.125rem $o-dark;
  border-radius: $main-radius;
  margin-bottom: 1em;

  &__button {
    width: 100%;
    padding: 0.75em 0.5em;
    background-color: transparent;
  }

  &__name {
    display: block;
    margin-bottom: 0.5em;
    font-size: 0.875rem;
  }

  &__duration {
    display: block;
    text-align: right;
    font-family: $monospace;
    font-size: 1rem;
  }
}

.button--start {
  display: block;
  position: fixed;
  width: 6rem;
  bottom: #{1rem + $NAV_HEIGHT};
}
</style>
