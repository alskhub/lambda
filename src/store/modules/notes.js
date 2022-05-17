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
            // let notesTmp = [...state.notes].filter((note) => !note.done);

            // notesTmp.forEach((item, index) => {
            //     notesTmp[index].todos = item.todos.filter((todo) => !todo.done)
            // })
            return state.notes;
        },
        notesListLength(state, getters) {
            return getters.notesList.length;
        },
        notesItem: (state, getters) => (noteId) => {
            return getters.notesList.filter((note) => note.id === noteId);
        },
        notesBlankItem(state) {
            return {...state.noteObject};
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
                    let status = !state.notes[index].done;
                    state.notes[index].done = status;

                    state.notes[index].todos.forEach((todo) => {
                        todo.done = status;
                    })
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
            context.dispatch('resetDbSnapshot');
            context.commit('editNote', {
                noteId: payload.noteId,
                text: payload.text
            });
        },
        doneNote(context, id) {
            context.dispatch('setDbSnapshot');
            context.commit('doneNote', id);
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
        clearNotesDb(context) {
            localStorage.clear();
            context.commit('clearNotesDataSnapshot');
            context.dispatch('getNotesFromDb');
        },
    },
}