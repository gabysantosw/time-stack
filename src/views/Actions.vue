<template>
  <div class="actions">
    <h1 class="heading">Actions</h1>
    <ul class="actions__list" v-if="actionsIsNotEmpty">
      <li
        class="action"
        v-for="(action, index) in actions"
        :key="index"
        :class="[handleColor(action.color)]"
      >
        <span class="action__name">{{ action.name }}</span>
        <span class="action__duration">{{ action.duration }}m</span>
        <router-link
          :to="{ name: 'EditAction', params: { id: index } }"
          class="action__edit"
        >
          Edit
        </router-link>
      </li>
    </ul>
    <p class="actions__empty" v-else>
      Create an action to stack
    </p>
    <router-link to="/actions/add" class="button button--main">
      New action
    </router-link>
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
  methods: {
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
    ...mapGetters(['actionsGetter']),
    actionsIsNotEmpty() {
      return this.actions.length !== 0;
    }
  }
};
</script>

<style lang="scss">
.actions {
  // ISSUE: always shows an scrollbar
  // box-sizing: border-box;
  // max-height: 100%;
  // overflow-y: scroll;

  box-sizing: border-box;
  width: 100%;
  padding: $main-pad;
  margin-bottom: $NAV_HEIGHT;
  background-color: $neutro;
  color: $dark;

  position: relative;

  &__list {
    margin: 0 auto;
    width: $INNER_WIDTH;
    max-width: 100%;
  }

  &__empty {
    margin-bottom: 1em;
    color: $o-dark;
    text-align: center;
  }
}
</style>
