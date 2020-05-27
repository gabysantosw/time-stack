<template>
  <div>
    <h1>Start</h1>
    <template v-if="planIsNotEmpty">
      <p class="" v-if="countdownText !== null">{{ countdownText }}</p>
      <p class="">Progress: {{ formatProgress }}</p>
      <ul class="">
        <li class="" v-for="(action, index) in uncompletedActions" :key="index">
          {{ action.name }} / {{ action.duration }}
        </li>
      </ul>
    </template>
  </div>
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
    }
  },
  computed: {
    ...mapGetters(['planGetter']),
    formatProgress() {
      return `${Math.floor(this.minutesPassed)}/${
        this.plan[this.currentAction].duration
      }`;
    },
    planIsNotEmpty() {
      return this.plan.length !== 0;
    },
    uncompletedActions() {
      let progress = [...this.plan];
      progress.splice(0, this.currentAction);
      return progress;
    }
  }
};
</script>

<style lang="scss"></style>
