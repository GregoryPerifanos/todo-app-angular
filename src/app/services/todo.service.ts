import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private todosKey = 'todos';
  private todosSubject = new BehaviorSubject<Todo[]>(this.loadTodos());
  todos$ = this.todosSubject.asObservable();

  private loadTodos(): Todo[] {
    const stored = localStorage.getItem(this.todosKey);
    return stored ? JSON.parse(stored) : [];
  }

  private saveTodos(todos: Todo[]) {
    localStorage.setItem(this.todosKey, JSON.stringify(todos));
    this.todosSubject.next(todos);
  }

  addTodo(title: string) {
    const todos = this.loadTodos();
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.saveTodos([...todos, newTodo]);
  }

  toggleTodo(id: number) {
    const todos = this.loadTodos().map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.saveTodos(todos);
  }

  deleteTodo(id: number) {
    const todos = this.loadTodos().filter(todo => todo.id !== id);
    this.saveTodos(todos);
  }

  clearCompleted() {
    const todos = this.loadTodos().filter(todo => !todo.completed);
    this.saveTodos(todos);
  }
}
