<template> 
  <v-list-item 
    class=" pl-5 pl-sm-3"
    color="green">
    <v-list-item-action class="mr-2"> 
        <v-checkbox
          dense
          class="todo-item-check"
          off-icon="mdi-sticker-outline"
          on-icon="mdi-sticker-check-outline"
          :ripple="false"
          @change="doneNote(noteObj.noteId)">
        </v-checkbox>
    </v-list-item-action>

    <v-list-item-title>
        <input 
          v-model="noteObj.text"  
          @change="(e) => updateNote(e)"
        >
    </v-list-item-title>

    <v-btn @click="addTodo(noteObj.noteId)" icon plain large>
      <v-icon size="22px">mdi-sticker-plus-outline</v-icon>
    </v-btn>

    <v-btn @click="confirmDelete()" icon plain> 
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
        noteObj: function () {
            return {
              noteId: this.note.id,
              text: this.note.text
            }
        },
        todosData: function () {
            return this.note.todos;
        },
        todosIsSet: function () {
            return this.note.todos && this.note.todos.length > 0;
        },
    },
    methods: {
      ...mapActions([
        'addTodo', 
        'editNote', 
        'deleteNote',
        'doneNote',
        'setupConfirmDialog',
        'resetConfirmDialog'
      ]),
      updateNote: function (e){
        this.noteObj.text = e.target.value;
        this.editNote(this.noteObj);
      },
      // Confirm dele
      confirmDelete: function () {
        let confirmObj = {
          showed: true,
          title: 'Confirm delete',
          text: 'Are you sure you want to delete this note?',
          denideHandler: () => this.resetConfirmDialog(),
          successHandler: () => {
            this.deleteNote(this.noteObj.noteId);
            this.resetConfirmDialog();
          }
        }
        
        this.setupConfirmDialog(confirmObj);
      }
    },
};
</script>

<style lang="scss" scoped>

</style>
