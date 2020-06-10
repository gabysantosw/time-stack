<template>
  <section class="start">
    <h1 class="visually-hidden">Start</h1>
    <router-link to="/stack" class="button button--cancel">Cancel</router-link>
    <template v-if="planIsNotEmpty">
      <p class="countdown" v-if="countdownText !== null">{{ countdownText }}</p>
      <progress
        class="progress"
        :max="formatActionDuration"
        :value="formatMinutesPassed"
      ></progress>
      <div
        class="progress__circle"
        :class="[handleColor(uncompletedActions[0].color)]"
        :style="updateProgress"
      ></div>
      <p class="start__text">
        <span class="start__time">{{ minutesLeft }}m</span>
        left for this action
      </p>
      <ul class="list">
        <li
          class="action action--start"
          v-for="(action, index) in uncompletedActions"
          :key="index"
          :class="[handleColor(action.color)]"
        >
          <span class="action__name">{{ action.name }}</span>
          <span class="action__duration">{{ action.duration }}m</span>
        </li>
      </ul>
    </template>
    <p class="start__text">
      This stack ends at <span class="start__time">{{ getEndTime }}</span>
    </p>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Start',
  created() {
    this.plan = this.planGetter;
    if (this.plan.length <= 0) this.$router.push({ name: 'Plan' });
  },
  data() {
    return {
      plan: [],
      currentTime: null,
      startTime: null,
      countdownText: 'Ready...',
      minutesPassed: null,
      currentAction: 0,
      interval: null
    };
  },
  beforeMount() {
    if (this.planIsNotEmpty) {
      // ready, set, go
      let count = 0;
      let countdown = setInterval(() => {
        if (count === 1) this.countdownText = 'Set...';
        if (count === 3) this.countdownText = 'GO!';
        if (count > 3) {
          this.countdownText = null;
          this.currentTime = new Date();
          this.startTime = new Date();
          this.interval = requestAnimationFrame(this.updateTime);
          clearInterval(countdown);
        }
        count++;
      }, 500);
    }
  },
  destroyed() {
    this.endInterval();
  },
  methods: {
    ...mapActions(['reset_plan']),
    updateTime() {
      this.currentTime = new Date();
      if (this.minutesPassed >= this.plan[this.currentAction].duration) {
        this.currentAction++;
        this.startTime = new Date();
        this.minutesPassed = 0;
      } else {
        this.minutesPassed =
          (this.currentTime.getTime() - this.startTime.getTime()) / 1000 / 60;
      }
      if (this.currentAction >= this.plan.length) {
        this.stackCompleted();
      } else {
        this.interval = requestAnimationFrame(this.updateTime);
      }
    },
    stackCompleted() {
      this.plan = [];
      this.reset_plan();
      this.endInterval();
      this.$router.push({ name: 'Plan' });
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
    ...mapGetters(['planGetter']),
    minutesLeft() {
      return (
        this.plan[this.currentAction].duration - Math.floor(this.minutesPassed)
      );
    },
    // formatProgress() {
    //   return `${Math.floor(this.minutesPassed)}/${
    //     this.plan[this.currentAction].duration
    //   }`;
    // },
    planIsNotEmpty() {
      return this.plan.length !== 0;
    },
    uncompletedActions() {
      let progress = [...this.plan];
      progress.splice(0, this.currentAction);
      return progress;
    },
    getEndTime() {
      return this.$route.params.endTime;
    },
    formatMinutesPassed() {
      return Math.floor(this.minutesPassed);
    },
    formatActionDuration() {
      return this.plan[this.currentAction].duration;
    },
    updateProgress() {
      return `--progress: -${(100 * this.formatMinutesPassed) /
        this.formatActionDuration}%;`;
    }
  }
};
</script>

<style lang="scss">
.start {
  width: 100%;
  padding: $main-pad;

  display: flex;
  flex-direction: column;
  align-items: center;

  &__text {
    margin-bottom: 1em;
  }

  &__time {
    font-family: $monospace;
    font-size: 1.25rem;
  }
}

.countdown {
  position: absolute;
  top: 8.5rem;
  font-size: 2rem;
  text-align: center;
  z-index: 1;
}

.progress {
  display: none;

  &__circle {
    --progress: -10%;
    width: 8rem;
    height: 8rem;
    background-color: $accent;
    margin-bottom: 1em;
    border-radius: 50%;
    border: 1em solid $accent;

    overflow: hidden;

    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 100%;
      width: 100%;
      height: 50%;
      background: $o-light;

      opacity: 0.1;

      animation: progress 2000ms 2000ms ease-in-out infinite backwards;
    }

    &::after {
      content: '';
      position: absolute;
      top: 100%;
      width: 100%;
      height: 100%;

      transition: transform 500ms ease-in;
      transform: translateY(var(--progress));
    }

    &.--blue::after {
      background-color: $blue;
    }

    &.--green::after {
      background-color: $green;
    }

    &.--red::after {
      background-color: $red;
    }

    &.--purple::after {
      background-color: $purple;
    }

    &.--yellow::after {
      background-color: $yellow;
    }
  }
}

.list {
  width: 100%;

  .action:first-child {
    margin-bottom: 1.5em;
  }

  .action:not(:first-child) {
    width: 70%;
    font-size: 0.75rem;
    margin-right: auto;
    margin-left: auto;
  }
}

@keyframes progress {
  0% {
    transform: translateY();
  }
  100% {
    transform: translateY(-300%);
  }
}
</style>
