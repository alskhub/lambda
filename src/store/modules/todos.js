export default {
	state: {
		todoObject: {
			'id': null,
			'done': false,
			'text': '',
		},
	},
	getters: {
		todoBlankItem(state) {
			return {
				...state.todoObject
			};
		},
		todosList: (state, getters) => (noteId) => {
			return getters.notesList[noteId].todos;
		},
		todosListLength: (state, getters) => (noteId) => {
			return getters.notesList[noteId].todos.length;
		},
	},
	mutations: {
		addTodo(rootState, todoObj) {
			let notes = this.state.notesModule.notes;
			let currentList = [...notes];

			currentList.forEach((item, index) => {
				if (item.id === todoObj.noteId) {
					notes[index].done = false;
					notes[index].todos = [...notes[index].todos, todoObj.blank];
				}
			})
		},
		editTodo(state, payload) {
			let notes = this.state.notesModule.notes;
			let currentList = [...notes];

			currentList.forEach((item, index) => {
				if (item.id === payload.noteId) {
					item.todos.forEach((todo, tindex) => {
						if (todo.id === payload.todoId) {
							notes[index].todos[tindex].text = payload.text;
						}
					})
				}
			})
		},
		doneTodo(state, payload) {
			let notes = this.state.notesModule.notes.filter((note) => note.todos.length > 0);
			let currentList = [...notes];


			currentList.forEach((item, index) => {
				if (item.id === payload.noteId) {
					notes[index].todos.forEach((todo, tindex) => {
						if (todo.id === payload.todoId) {
							notes[index].todos[tindex].done = !todo.done;

							let doneCount = notes[index].todos.reduce((sum, todo) => sum + (todo.done ? 1 : 0), 0);
							notes[index].done = doneCount === notes[index].todos.length;
						}
					})
				}
			})
		},
		deleteTodo(state, payload) {
			let notes = this.state.notesModule.notes;
			let currentList = [...notes];

			currentList.forEach((item, index) => {
				if (item.id === payload.noteId) {
					item.todos.forEach((todo, tindex) => {
						if (todo.id === payload.todoId) {
							notes[index].todos.splice(tindex, 1);
						}
					})
				}
			})
		},
	},
	actions: {
		addTodo(context, payload) {
			let uniqueId = Math.random().toString(36).substr(2, 9);
			let blank = {
				...context.getters.todoBlankItem,
				id: uniqueId
			};

			context.dispatch('setDbSnapshot');
			context.commit('addTodo', {
				noteId: payload,
				blank: blank
			});
		},
		editTodo(context, payload) {
			context.dispatch('resetDbSnapshot');
			context.commit('editTodo', {
				noteId: payload.noteId,
				todoId: payload.todoId,
				text: payload.text
			});
		},
		doneTodo(context, payload) {
			context.dispatch('setDbSnapshot');
			context.commit('doneTodo', {
				noteId: payload.noteId,
				todoId: payload.todoId
			});
		},
		deleteTodo(context, payload) {
			context.dispatch('setDbSnapshot');
			context.commit('deleteTodo', {
				noteId: payload.noteId,
				todoId: payload.todoId
			});
		},
	},
}