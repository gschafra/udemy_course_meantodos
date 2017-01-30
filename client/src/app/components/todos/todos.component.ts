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
    console.log(todo);
    Todo.find(todo._id).then((_todo: Todo) => {
      console.log(_todo);
      _todo.isCompleted = true;
      _todo.save().then((__todo: Todo) => {
        console.log(__todo);
      })
    });
  }

  setEditState(todo, state){
    if (state) {
      todo.isEditMode = state;
    } else {
      delete todo.isEditMode;
    }
  }

}