import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[];

  constructor() { }

  ngOnInit() {
    this.todos = [];
    Todo.all().then((todos: Todo[]) => {
      this.todos =  todos;
    })
  }

  addTodo(event, todoText){
    let todo = new Todo();
    todo.title = todoText.value;
    todo.isCompleted = false;
    todo.save().then((todo: Todo) => {
        this.todos.push(todo);
        todoText.value = '';
    });
  }

  updateStatus(todo) {
    todo.isCompleted = !todo.isCompleted;
    todo.save();
  }
  
  keyDownEdit(todo, event) {
    if(event.keyCode == 13) {
      this.toggleEditMode(todo);
    }
  }
  toggleEditMode(todo) {
    if (todo.isEditMode) {
      todo.save().then((_todo: Todo) => {
          todo.isEditMode = !todo.isEditMode;
      });
    } else {
      todo.isEditMode = !todo.isEditMode;
    }
  }

  setEditState(todo, state){
    if (state) {
      todo.isEditMode = state;
    } else {
      delete todo.isEditMode;
    }
  }

}