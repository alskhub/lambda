export default {
    state: {
        notes: [],
        notesSnapshot: [],
        noteObject: {
            'id': null,
            'text': '',
            'done': false,
            'todos': [],
        },
    },
    getters: {
        notesList(state) {
            let notesTmp = [...state.notes].filter((note) => !note.done);

            // if(state.notes.length > 0){
                // let filtered = notesTmp.filter((note) => !note.done);

                notesTmp.forEach((item, index) => {
                    notesTmp[index].todos = item.todos.filter((todo) => !todo.done)
                })
            // }
            

            return notesTmp;
        },
        notesListLength(state, getters) {
            return getters.notesList.length;
        },
        notesItem: (state, getters) => (noteId) => {
            return getters.notesList.filter((note) => note.id === noteId);
        },
        notesBlankItem(state) {
            return {
                ...state.noteObject
            };
        },
        notesSnapshotList (state) {
            return state.notesSnapshot;
        },
        notesSnapshotListLength (state) {
            return state.notesSnapshot.length;
        },
    },
    mutations: {
        addNote(state, note) {
            state.notes = [...state.notes, note];
        },
        editNote(state, noteObj) {
            let currentList = [...state.notes];

            currentList.forEach((item, index) => {
                if (item.id === noteObj.noteId) {
                    state.notes[index].text = noteObj.text;
                }
            })
        },
        doneNote(state, id) {
            let currentList = [...state.notes];

            currentList.forEach((item, index) => {
                if (item.id === id) {
                    state.notes[index].done = true;
                }
            })
        },
        deleteNote(state, id) {
            let currentList = [...state.notes];

            currentList.forEach((item, index) => {
                if (item.id === id) {
                    state.notes.splice(index, 1);
                }
            })
        },
        setNotesData(state, notes) {
            state.notes = [...notes];
        },
        setNotesDataSnapshot(state, snapshot) {
            state.notesSnapshot = [...snapshot];
        },
        clearNotesDataSnapshot(state) {
            state.notesSnapshot = [];
        },
    },
    actions: {
        addNote(context) {
            let uniqueId = Math.random().toString(36).substr(2, 9);
            let blank = {
                ...context.getters.notesBlankItem,
                id: uniqueId
            };

            context.dispatch('setDbSnapshot');
            context.commit('addNote', blank);
        },
        editNote(context, payload) {
            context.commit('editNote', {
                noteId: payload.noteId,
                text: payload.text
            });
            context.dispatch('resetDbSnapshot');
        },
        doneNote(context, id) {
            context.commit('doneNote', id);
            context.dispatch('resetDbSnapshot');
        },
        deleteNote(context, id) {
            context.dispatch('setDbSnapshot')
            context.commit('deleteNote', id);
        },
        getNotesFromDb(context) {
            let notes = JSON.parse(localStorage.getItem('notes'));
            context.commit('setNotesData', notes || [])
        },
        setNotesIntoDb(context) {
            let notes = context.getters.notesList;
            localStorage.setItem('notes', JSON.stringify(notes));
        },
    },
}