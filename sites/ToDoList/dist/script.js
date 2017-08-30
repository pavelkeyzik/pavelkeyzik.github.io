let form = document.getElementById('todos-form');
let newTodo = document.getElementById('newTodo');
let todosList = document.getElementById('todos-list');

let allTasks = document.getElementById('all-tasks');
let activeTasks = document.getElementById('active-tasks');
let completedTasks = document.getElementById('completed-tasks');

let done, deleteItems, edit;

let filteredTodos;
let filterBool;
let editing = false;

let todos$ = new Rx.Subject().subscribe(() => {
	todosList.innerHTML = "";
	filteredTodos = todos;

	for (let key in todos) {
		let template = `
				<span>
					<i class="material-icons done" id="done-${key}">done</i>
					<span class="todos-task" >${todos[key].text}</span>
				</span>
				<span>
					<i class="material-icons edit">mode_edit</i>
					<i class="material-icons delete" id="delete-${key}">delete</i>
				</span>
		`;

		if (filterBool === undefined) {
			if (todos[key].completed) todosList.insertAdjacentHTML('beforeend', `<li class="todos-item todos-item__completed" id="task-${key}">` + template + `</li>`);else todosList.insertAdjacentHTML('beforeend', `<li class="todos-item" id="task-${key}">` + template + `</li>`);
		} else if (filterBool) {
			if (todos[key].completed == true) todosList.insertAdjacentHTML('beforeend', `<li class="todos-item todos-item__completed" id="task-${key}">` + template + `</li>`);
		} else {
			if (todos[key].completed == false) todosList.insertAdjacentHTML('beforeend', `<li class="todos-item" id="task-${key}">` + template + `</li>`);
		}
	}

	done = document.getElementsByClassName('done');
	deleteItems = document.getElementsByClassName('delete');
	edit = document.getElementsByClassName('edit');

	for (let i = 0; i < done.length; i++) {
		Rx.Observable.fromEvent(done[i], 'click').subscribe(e => {
			let id = e.target.id.split('-')[1];
			filteredTodos[id].completed = !filteredTodos[id].completed;
			todos$.next();
		});
	}

	for (let i = 0; i < deleteItems.length; i++) {
		Rx.Observable.fromEvent(deleteItems[i], 'click').subscribe(e => {
			let id = e.target.id.split('-')[1];
			filteredTodos.splice(id, 1);
			// KOCRK
			todos$.next();
		});
	}

	for (let i = 0; i < edit.length; i++) {
		Rx.Observable.fromEvent(edit[i], 'click').subscribe(e => {
			if (editing === false) {
				let id = e.target.parentElement.parentElement.id;
				let _id = e.target.parentElement.parentElement.id.split('-')[1];
				let task = document.getElementById(id);
				task.className += " editing";
				editing = true;
				let text = task.firstElementChild.children[1].innerText;

				task.innerHTML = `
					<form id="editForm">
						<input type="text" value="${text}" id="editTask-${_id}">
						<i class="material-icons" id="editClose">close</i>
					</form>
				`;

				let input = document.getElementById(`editTask-${_id}`);
				input.select();
				let editForm = document.getElementById("editForm");
				let editClose = document.getElementById('editClose');

				Rx.Observable.fromEvent(editForm, 'submit').subscribe(event => {
					event.preventDefault();
					todos[_id].text = text;
					todos[_id].text = input.value;
					todos$.next();
					editing = false;
				});

				Rx.Observable.fromEvent(editClose, 'click').subscribe(event => {
					todos$.next();
					editing = false;
				});
			}
		});
	}

	localStorage.setItem('todoList', JSON.stringify(todos));
	return false;
});

// localStorage.clear();
let localStorageArray = JSON.parse(localStorage.getItem("todoList"));

let todos = [];
todos = localStorageArray ? localStorageArray : [];
todos$.next();

Rx.Observable.fromEvent(form, 'submit').subscribe(data => {
	data.preventDefault();
	if (newTodo.value) {
		todos.push({
			"text": newTodo.value,
			"completed": false
		});
		newTodo.value = '';
		todos$.next();
	}
});

Rx.Observable.fromEvent(allTasks, 'click').subscribe(() => {
	filterBool = undefined;
	allTasks.classList.add("tab--item__active");
	let array = getSiblings(allTasks);
	for (let key in array) {
		array[key].classList.remove("tab--item__active");
	}
	todos$.next();
});

Rx.Observable.fromEvent(activeTasks, 'click').subscribe(() => {
	filterBool = false;
	activeTasks.classList.add("tab--item__active");
	let array = getSiblings(activeTasks);
	for (let key in array) {
		array[key].classList.remove("tab--item__active");
	}
	todos$.next();
});

Rx.Observable.fromEvent(completedTasks, 'click').subscribe(() => {
	filterBool = true;
	completedTasks.classList.add("tab--item__active");
	let array = getSiblings(completedTasks);
	for (let key in array) {
		array[key].classList.remove("tab--item__active");
	}
	todos$.next();
});

// Спизжено
var getSiblings = function (elem) {
	var siblings = [];
	var sibling = elem.parentNode.firstChild;
	var skipMe = elem;
	for (; sibling; sibling = sibling.nextSibling) if (sibling.nodeType == 1 && sibling != elem) siblings.push(sibling);
	return siblings;
};