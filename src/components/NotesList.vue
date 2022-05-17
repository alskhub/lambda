<template>
  <v-card flat class="notes-outer">
    <v-card tile flat class="my-2" v-if="notes.length > 0">
        <v-list v-for="note in notes" :key="note.id" tile>
            <NoteItem :note="note"/>
            
            <v-list-item-group v-if="todosIsSet(note)">
                <TodoItem 
                  v-for="todo in note.todos" 
                  :key="todo.id" 
                  :todo='{...todo, noteId: note.id}' 
                />
            </v-list-item-group>
        </v-list>
    </v-card>
    
    <div class="notes-empty" v-else>
      <v-icon size="22px">mdi-sticker-remove-outline</v-icon>
      There are no notes here yet.
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import NoteItem from '@/components/NoteItem.vue';
import TodoItem from '@/components/TodoItem.vue';

export default {
  name: 'NotesList',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({
      notes: 'notesList',
    })
  },
  methods: {
    todosIsSet: function(note){
      return note.todos && note.todos.length > 0
    }
  },
  components: {
    NoteItem,
    TodoItem,
},
};
</script>

<style lang="scss">
  .notes-outer{
    height: 80vh;
    overflow: scroll;
  }

  .notes-empty{
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 10px;
    height: 100%;
    justify-content: center;

    i{
      font-size: 22px;
      opacity: 0.6;
    }
  }
</style>
