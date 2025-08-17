import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Filter } from '../../models/filter.model';

@Component({
  selector: 'app-todo-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent {
  @Input() activeCount: number = 0;
  @Input() currentFilter: string = 'all';

  @Output() filterChange = new EventEmitter<Filter>();
  @Output() clearCompleted = new EventEmitter<void>();

  setFilter(filter: string): void {
    this.filterChange.emit(filter as Filter);
  }

  onClearCompleted(): void {
    this.clearCompleted.emit();
  }
}
