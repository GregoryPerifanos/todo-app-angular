import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoHeaderComponent } from "./components/todo-header/todo-header.component";
import { TodoFormComponent } from "./components/todo-form/todo-form.component";
import { TodoListComponent } from "./components/todo-list/todo-list.component";
import { TodoFooterComponent } from "./components/todo-footer/todo-footer.component";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

type Filter = 'all' | 'active' | 'completed';

@Component({
  selector: 'app-root',
   imports: [CommonModule, FormsModule, TodoHeaderComponent, TodoFormComponent, TodoListComponent, TodoFooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  [x: string]: any;
  todos: Todo[] = [];
  newTodo: string = '';
  currentFilter: Filter = 'all';

  constructor(public themeService: ThemeService) {}

  // ✅ Add Todo
  addTodo(title: string) {
  if (title.trim()) {
    this.todos.push({
      id: Date.now(), 
      title,
      completed: false
    });
  }
}

  // ✅ Toggle completed state
  toggleTodo(id: number) {
    const todo = this.todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
  }

  // ✅ Delete Todo
  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  // ✅ Clear completed Todos
  clearCompleted() {
    this.todos = this.todos.filter(todo => !todo.completed);
  }

  // ✅ Filter Todos
  setFilter(filter: Filter) {
    this.currentFilter = filter;
  }

  get filteredTodos(): Todo[] {
    switch (this.currentFilter) {
      case 'active':
        return this.todos.filter(todo => !todo.completed);
      case 'completed':
        return this.todos.filter(todo => todo.completed);
      default:
        return this.todos;
    }
  }

  // ✅ Active count
  get activeCount(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  // ✅ Theme methods
  toggleTheme() {
    this.themeService.toggleTheme();
  }

  get isDark(): boolean {
    return this.themeService.currentTheme === 'dark';
  }
}
