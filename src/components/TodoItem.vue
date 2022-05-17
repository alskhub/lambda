<template>
  <div>
    <v-divider dark></v-divider>
    <v-list-item 
      color="primary"
      class="ml-8 ml-sm-6 pl-5 pl-sm-3"
      dense>
      <v-list-item-action class="mr-2">
        <v-checkbox
          dense
          class="todo-item-check"
          off-icon="mdi-sticker-outline"
          on-icon="mdi-sticker-check-outline"
          :value="data.done"
          :ripple="false">
        </v-checkbox>
      </v-list-item-action>

      <v-list-item-title>
        <input :value="data.text">
      </v-list-item-title>

      <v-btn icon plain> 
        <v-icon size="22px">mdi-close</v-icon>
      </v-btn>
    </v-list-item>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  props: ['todo'],
  computed: {
    data: function() {
      return this.todo;
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
