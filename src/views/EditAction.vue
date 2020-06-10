<template>
  <section class="form-section">
    <h2 class="visually-hidden">Edit action</h2>
    <button class="danger-button" @click="deleteAction">
      Delete action
    </button>
    <form action="" class="" @submit.prevent>
      <actionInputs :action="action" />
      <div class="button-group">
        <router-link to="/actions" class="button-group__cancel">
          Cancel
        </router-link>
        <button class="button button--main" @click="updateAction">Done</button>
      </div>
    </form>
  </section>
</template>

<script>
import actionInputs from '@/components/actionInputs.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'EditAction',
  components: {
    actionInputs
  },
  created() {
    this.id = +this.$route.params.id;
    this.action = { ...this.actionByIdGetter(this.id) };
    if (this.action.name === undefined) this.$router.push({ name: 'Actions' });
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
      this.update_action({ action: this.action, index: this.id });
      this.$router.push({ name: 'Actions' });
    }
  },
  computed: {
    ...mapGetters(['actionByIdGetter'])
  }
};
</script>

<style lang="scss">
.danger-button {
  position: absolute;
  top: -3.25em;
  right: 1em;
  padding: 0.5em 1em;
  border: 0.125rem solid $invalid;
  border-radius: $main-radius;
  background-color: $neutro;
  color: $dark;
}
</style>
