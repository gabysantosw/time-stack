<template>
  <div>
    <h1>Edit action</h1>

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
        Duration: <span>{{ action.duration }}m</span>
      </label>
      <input
        type="range"
        name="duration"
        id="duration"
        min="30"
        max="240"
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
      <button class="" @click="deleteAction">Delete action</button>
      <router-link to="/actions">Cancel</router-link>
      <button class="" @click="updateAction">Done</button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'EditAction',
  created() {
    this.id = +this.$route.params.id;
    this.action = { ...this.actionByIdGetter(this.id) };
    if (this.action.name === undefined) this.$router.push({ name: 'Actions' });
  },
  mounted() {
    this.$refs.autofocus.focus();
  },
  data() {
    return {
      id: null,
      action: {}
    };
  },
  methods: {
    ...mapActions(['delete_action', 'update_action']),
    deleteAction() {
      this.delete_action(this.id);
      this.$router.push({ name: 'Actions' });
    },
    updateAction() {
      console.log(this.id);
      this.update_action({ action: this.action, index: this.id });
      this.$router.push({ name: 'Actions' });
    }
  },
  computed: {
    ...mapGetters(['actionByIdGetter'])
  }
};
</script>

<style lang="scss"></style>
