<template>
  <div>
    <h1>Actions</h1>
    <ul class="" v-if="actionsIsNotEmpty">
      <li class="" v-for="(action, index) in actions" :key="index">
        <span class="">{{ action.name }}</span>
        <span class="">{{ action.duration }}</span>
        <router-link :to="{ name: 'EditAction', params: { id: index } }">
          Edit
        </router-link>
      </li>
    </ul>
    <router-link to="/actions/add">Add action</router-link>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Actions',
  created() {
    this.actions = this.actionsGetter;
  },
  data() {
    return {
      actions: []
    };
  },
  computed: {
    ...mapGetters(['actionsGetter']),
    actionsIsNotEmpty() {
      return this.actions.length !== 0;
    }
  }
};
</script>

<style lang="scss"></style>
