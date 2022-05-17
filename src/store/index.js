import Vue from 'vue'
import Vuex from 'vuex'

import notesModule from './modules/notes.js';
import todosModule from './modules/todos.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    confirmDialog: {
      showed: false,
      title: '',
      text: '',
      denideHandler: null,
      successHandler: null
    }
  },
  getters: {
    confirmDialogSettings(state) {
      return state.confirmDialog;
    }
  },
  mutations: {
    setConfirmDialodData(state, payload){
      state.confirmDialog = payload;
    },
  },
  actions: {
    getDbSnapshot(context) {
      let notes = JSON.parse(localStorage.getItem('notesSnapshot'));
      localStorage.removeItem('notesSnapshot');

      context.commit('setNotesData', notes || []);
      context.commit('clearNotesDataSnapshot');
    },
    setDbSnapshot(context, data) {
      let notes = data || context.getters.notesList;
      localStorage.setItem('notesSnapshot', JSON.stringify(notes));
      context.commit('setNotesDataSnapshot', notes);
    },
    resetDbSnapshot(context) {
      localStorage.removeItem('notesSnapshot');
      context.commit('clearNotesDataSnapshot');
    },
    setupConfirmDialog(context, confirmData){
      context.commit('setConfirmDialodData', confirmData);
    },
    resetConfirmDialog(context){
      context.commit('setConfirmDialodData', {
        showed: false,
        title: '',
        text: '',
        denideHandler: null,
        successHandler: null
      });
    },
    exportNotes(context){
        let dataStr = JSON.stringify(context.getters.notesList);
        let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
        let exportFileDefaultName = 'myNotes.json';
    
        let linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    },
    // importNotes(context, file){
    // // 
    // },
  },
  modules: {
    notesModule,
    todosModule,
  }
})
