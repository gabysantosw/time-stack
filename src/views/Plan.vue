<template>
  <div>
    <h1>Plan</h1>
    <section class="">
      <p class="">Current time: {{ formatTime }}</p>
      <ul class="" v-if="planIsNotEmpty">
        <li class="" v-for="(action, index) in plan" :key="index">
          {{ action.name }}
          {{ action.duration }}
          <button @click="deleteFromPlan(index)">Remove</button>
        </li>
      </ul>
      <p class="" v-if="planIsNotEmpty">
        Stack duration: {{ getTotalDuration }}m, ends at {{ getEndTime }}
      </p>
      <router-link to="/start" v-if="planIsNotEmpty">Start!</router-link>
    </section>
    <aside class="">
      <ul class="" v-if="actionsIsNotEmpty">
        <li class="" v-for="(action, index) in actions" :key="index">
          <button class="" @click="addToPlan(action)">
            <span class="">{{ action.name }}</span>
            <span class="">{{ action.duration }}</span>
          </button>
        </li>
      </ul>
    </aside>
    <router-link to="/actions/add">Add action</router-link>
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

<style lang="scss"></style>
