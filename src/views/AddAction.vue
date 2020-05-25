<template>
  <div>
    <h1>Add action</h1>
    <form action="" class="" @submit.prevent>
      <label for="name">Name:</label>
      <input
        type="text"
        name="name"
        id="name"
        class=""
        ref="autofocus"
        v-model="action.name"
        required
      />

      <label for="duration">
        Duration: <span>{{ action.duration }}m</span></label
      >
      <input
        type="range"
        name="duration"
        id="duration"
        min="0.1"
        max="3"
        step="30"
        v-model="action.duration"
      />

      <p>Color:</p>

      <div>
        <input
          type="radio"
          name="color"
          id="huey"
          value="huey"
          v-model="action.color"
        />
        <label for="huey">Huey</label>
      </div>

      <div>
        <input
          type="radio"
          name="color"
          id="dewey"
          value="dewey"
          v-model="action.color"
        />
        <label for="dewey">Dewey</label>
      </div>

      <div>
        <input
          type="radio"
          name="color"
          id="louie"
          value="louie"
          v-model="action.color"
        />
        <label for="louie">Louie</label>
      </div>

      <router-link to="/actions">Cancel</router-link>
      <button class="" @click="addAction" @keyup.enter="addAction">
        Add action
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AddAction',
  data() {
    return {
      action: {
        name: '',
        duration: 0.1,
        color: 'huey'
      }
    };
  },
  mounted() {
    this.$refs.autofocus.focus();
  },
  methods: {
    ...mapActions(['add_action']),
    addAction() {
      // validation
      if (this.action.name === '') return console.log('name is required');

      this.add_action(this.action);
      this.$router.push({ name: 'Actions' });
    }
  }
};
</script>

<style lang="scss"></style>
