import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notes: [],
    dbObj: null,
    noteObject: {
      'id': null,
      'text': '',
      'done': false,
      'todos': [],
    },
    todoObject: {
      'id': null,
      'done': false,
      'text': '',
    },
  },
  getters: {
    dbConnection (state) {
      return state.dbObj;
    },
    notesList (state) {
      return state.notes;
    },
    notesListLength (state, getters) {
      return getters.notesList.length;
    },
    notesBackupList (state) {
      return {...state.notesBackup};
    },
    notesBlankItem (state) {
      return {...state.noteObject};
    },
    todoBlankItem (state) {
      return {...state.todoObject};
    },
    notesItem: (state, getters) => (noteId) =>  {
      return getters.notesList.filter((note) => note.id === noteId);
    },
    todosList: (state, getters) => (noteId) => {
      return getters.notesList[noteId].todos;
    },
    todosListLength: (state, getters) => (noteId) => {
      return getters.notesList[noteId].todos.length;
    },
    /*
    todoItem: (state) => (noteId, todoId) =>  {

    },*/
  },
  mutations: {
    setDbConnection(state, db) {
      state.dbObj = db;
    },
    addNote(state, note) {
      state.notes = [...state.notes, note];
    },
    addTodo(state, todoObj) {
      let currentList = [...state.notes];

      currentList.forEach((item, index) => {
        if(item.id === todoObj.noteId){
          state.notes[index].todos = [...state.notes[index].todos, todoObj.blank];
        }
      })
    },
    editNote(state, noteObj) {
      let currentList = [...state.notes];

      currentList.forEach((item, index) => {
        if(item.id === noteObj.noteId){
          state.notes[index].text = noteObj.value;
        }
      })
    },
    editTodo(state, payload) {
      let currentList = [...state.notes];

      currentList.forEach((item, index) => {
        if(item.id === payload.noteId){

          item.todos.forEach((todo, tindex) => {
            if(todo.id === payload.todoId){
              state.notes[index].todos[tindex].text = payload.text;
            }
          })
        }
      })
    },
    doneNote(state, payload) {
      let currentList = [...state.notes];

      currentList.forEach((item, index) => {
        if(item.id === payload){
          let status = !state.notes[index].done;
          state.notes[index].done = status;

          state.notes[index].todos = state.notes[index].todos.map((todo) => {
            todo.done = status;

            console.log(todo)
            return todo;
          })
        }
      })
    },
    doneTodo(state, payload) {
      let currentList = [...state.notes];

      currentList.forEach((item, index) => {
        if(item.id === payload.noteId){
          state.notes[index].todos = state.notes[index].todos.map((todo) => {
            if(todo.id === payload.todoId){
              todo.done = !todo.done;
            }
            return todo;
          })
        }
      })
    },
    deleteNote(state, payload) {
      delete state.notes[payload.noteId];
    },
    deleteTodo(state, payload) {
      delete state.notes[payload.noteId][payload.todoId];
    },
  },
  actions: {
    addNote ({commit, getters}) {
      let dbConnection = getters.dbConnection;
      let uniqueId = Math.random().toString(36).substr(2, 9);
      let blank = {...getters.notesBlankItem, id: uniqueId};

      commit('addNote', blank);

      dbConnection.then((db) => {
        let transaction = db.transaction(['notes'], 'readwrite');
        let store = transaction.objectStore('notes')

        store.add(blank);

        return transaction.complete;
      })

    },
    addTodo ({commit, getters}, payload) {
      let uniqueId = Math.random().toString(36).substr(2, 9);
      let blank = {...getters.todoBlankItem, id: uniqueId};

      commit('addTodo', {
        noteId: payload, 
        blank: blank 
      });
    },
    editNote ({commit}, payload) {
      console.log(payload.id + '' + payload.value);
      commit('addTodo', payload);
    },
    editTodo (context, payload) {
      context;
      console.log(payload.noteId +  ' :: ' + payload.todoId + ' ::: ' + payload.text);
    },
    doneNote ({commit}, payload) {
      commit('doneNote', payload);
    },
    doneTodo ({commit}, payload) {
      commit('doneNote', {
        noteId: payload.noteId,
        todoId: payload.todoId,
      });
    },/*
    deleteNote (context, id) {
      
    },
    deleteTodo (context, id) {
      
    },
    loadData (context) {

    },
    pushData (context) {

    },
    restoreData (context) {

    },*/
    getNoteFromDb() {},
    setNoteIntoDb() {},
    deleteNoteFromDb() {},
    getDbSnapshot() {},
    setDbSnapshot() {},
    openDatabase ({commit}) {
      let openRequest = indexedDB.open("noted", 1,)
            .onsuccess((db) => {
              if (!db.objectStoreNames.contains('notes')) { // если хранилище "books" не существует
                db.createObjectStore('notes', {keyPath: 'id', autoIncrement: true}); // создаем хранилище
              }

              if (!db.objectStoreNames.contains('notesSnapshot')) { // если хранилище "books" не существует
                db.createObjectStore('notesSnapshot', {keyPath: 'id', autoIncrement: true}); // создаем хранилище
              }
            })
            .onerror((err) => console.log(err));

      commit('setDbConnection', openRequest);

      // openRequest.onupgradeneeded = function() {
      //   let db = openRequest.result;
      //   i
      // };
      // openRequest.onerror = function() {
      //   console.error("Error", openRequest.error);
      // };
      // openRequest.onsuccess = function() {
      //   // let db = openRequest.result;
      //   // продолжить работу с базой данных, используя объект db
      // };
    }
  },
  modules: {
  }
})
