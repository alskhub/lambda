<template>
  <div>
    <v-divider dark></v-divider>
    <v-list-item 
      :style="!todoObj.done || 'opacity: 0.3'"
      class="ml-8 ml-sm-6 pl-5 pl-sm-3"
      :ripple="false"
      inactive>
      <v-list-item-action class="mr-2">
        <v-checkbox
          dense
          class="todo-item-check"
          off-icon="mdi-sticker-outline"
          on-icon="mdi-sticker-check-outline"
          :ripple="false"
          v-model="todoObj.done"
          @change="doneTodo(todoObj)">
        </v-checkbox>
      </v-list-item-action>

      <v-list-item-title>
        <input 
          v-model="todoObj.text"
          :disabled="todoObj.done" 
          @change="(e) => updateTodo(e)">
      </v-list-item-title>

      <v-btn @click="confirmDelete()" icon plain> 
        <v-icon size="22px">mdi-close</v-icon>
      </v-btn>
    </v-list-item>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'TodoItem',
  props: ['todo'],
  computed: {
    todoObj: function() {
      return {
        done: this.todo.done,
        todoId: this.todo.id, 
        noteId: this.todo.noteId,
        text: this.todo.text,
      }
    }
  },
  methods: {
    ...mapActions([
      'editTodo', 
      'deleteTodo',
      'doneTodo',
      'setupConfirmDialog',
      'resetConfirmDialog'
    ]),
    updateTodo: function (e){
      setTimeout(() => {
      this.todoObj.text = e.target.value;
      this.editTodo(this.todoObj);
      }, 2000)
    },
    confirmDelete: function () {
        let confirmObj = {
          showed: true,
          title: 'Confirm delete',
          text: 'Are you sure you want to delete this task?',
          denideHandler: () => this.resetConfirmDialog(),
          successHandler: () => {
            this.deleteTodo(this.todoObj);
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
