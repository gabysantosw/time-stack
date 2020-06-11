<template>
  <section class="form-section">
    <h2 class="visually-hidden">Add action</h2>
    <form action="" class="" @submit.prevent>
      <actionInputs :action="action" />

      <div class="button-group">
        <router-link to="/actions" class="button-group__cancel">
          Cancel
        </router-link>
        <button
          class="button button--form"
          @click="addAction"
          @keyup.enter="addAction"
        >
          Create
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import actionInputs from '@/components/actionInputs.vue';
import { mapActions } from 'vuex';

export default {
  name: 'AddAction',
  components: {
    actionInputs
  },
  data() {
    return {
      action: {
        name: '',
        duration: 30,
        color: 'blue'
      }
    };
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
