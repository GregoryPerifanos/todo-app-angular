import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

type Filter = 'all' | 'active' | 'completed';

@Component({
  selector: 'app-root',
   imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  todos: Todo[] = [];
  newTodo: string = '';
  currentFilter: Filter = 'all';

  constructor(public themeService: ThemeService) {}

  // ✅ Add Todo
  addTodo() {
    const title = this.newTodo.trim();
    if (!title) return;

    this.todos.push({
      id: Date.now(),
      title,
      completed: false,
    });

    this.newTodo = '';
  }

  // ✅ Toggle completed state
  toggleTodo(todo: Todo) {
    todo.completed = !todo.completed;
  }

  // ✅ Delete Todo
  deleteTodo(id: number) {
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
