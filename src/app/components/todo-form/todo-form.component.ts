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
  @Output() add = new EventEmitter<string>();
  newTodo = '';
  newTodoTitle: string | undefined;

  submitTodo() {
    if (this.newTodo.trim()) {
      this.add.emit(this.newTodo);
      this.newTodo = '';
    }
  }
}
