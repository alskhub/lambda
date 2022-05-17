<template> 
  <v-list-item 
    class=" pl-5 pl-sm-3"
    color="#333">
    <v-list-item-action class="mr-2"> 
        <v-checkbox
          dense
          class="todo-item-check"
          off-icon="mdi-sticker-outline"
          on-icon="mdi-sticker-check-outline"
          :value="noteData.done"
          :ripple="false"
          @change="doneNote(noteData.id)">
        </v-checkbox>
    </v-list-item-action>

    <v-list-item-title>
        <input v-model="noteData.text" @blur="(e) => updateNote(e)">
    </v-list-item-title>

    <v-btn @click.stop="addTodo(noteData.id)" icon plain large>
      <v-icon size="22px">mdi-sticker-plus-outline</v-icon>
    </v-btn>

    <v-btn icon plain> 
      <v-icon size="22px">mdi-close</v-icon>
    </v-btn>
  </v-list-item>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: "NoteItem",
    props: ["note"],
    computed: {
        noteData: function () {
            return this.note;
        },
        todosData: function () {
            return this.note.todos;
        },
        todosIsSet: function () {
            return this.note.todos && this.note.todos.length > 0;
        },
    },
    methods: {
      ...mapActions(['addTodo', 'editNote', 'doneNote']),
      updateNote: function (e){
        let noteObj = {
          id: this.note.id, 
          value: e.target.value
        };
        
        this.editNote(noteObj);
      }
    },
};
</script>

<style lang="scss" scoped>

</style>
