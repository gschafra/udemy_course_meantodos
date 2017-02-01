import { ConfirmComponent } from '../confirm/confirm.component';
import { Component, ViewChild, OnInit } from '@angular/core';
import { Todo } from '../../models/todo';
import { DialogService } from 'ng2-bootstrap-modal';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[];

  constructor(private dialogService: DialogService) { }

  ngOnInit() {
    this.todos = [];
    Todo.all().then((todos: Todo[]) => {
      this.todos =  todos;
    });
  }

  showConfirmDelete(todo) {
    let disposable = this.dialogService.addDialog(ConfirmComponent, {
      title: 'Confirmation',
      message: 'Bla bla comfirm action?'})
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.deleteTodo(todo);
        }
      });
  }

  addTodo(event, todoText){
    const todo = new Todo();
    todo.title = todoText.value;
    todo.isCompleted = false;
    todo.save().then((_todo: Todo) => {
        this.todos.push(_todo);
        todoText.value = '';
    });
  }

  updateStatus(todo) {
    todo.isCompleted = !todo.isCompleted;
    todo.save();
  }

  cancelEdit(todo) {
    todo.isEditMode = false;
  }

  updateTodoTitle(todo, event) {
    const keyCode = event.which || event.keyCode;
    if(keyCode === 13) {
      this.toggleEditMode(todo);
    } else if (keyCode === 27) {
      this.cancelEdit(todo);
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

  setEditState(todo, state) {
    if (state) {
      todo.isEditMode = state;
    } else {
      delete todo.isEditMode;
    }
  }

  deleteTodo(todo) {
    var todos = this.todos;
    todo.destroy().then((_todo: any) => {
          for (var i = 0; i < todos.length; i++) {
            if (todos[i].key() === _todo.data._id) {
              todos.splice(i, 1);
            }
          }
      });
  }

}