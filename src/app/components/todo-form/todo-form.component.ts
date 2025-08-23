import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'; // ✅ Add this

@Component({
  selector: 'app-todo-form',
  standalone: true, // ✅ Standalone component
  imports: [FormsModule], // ✅ Register FormsModule here
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent {
  @Output() addTodo = new EventEmitter<string>();
  newTodo = '';
  newTodoTitle: string | undefined;

  submitTodo() {
     const trimmed = this.newTodo.trim();
    if (!trimmed) return;

    this.addTodo.emit(trimmed);

    // Reset input after successful submission
    this.newTodo = '';
  }
}
