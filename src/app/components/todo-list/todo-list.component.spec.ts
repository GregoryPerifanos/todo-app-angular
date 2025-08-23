import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Todo } from '../../models/todo.model';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  const mockTodos: Todo[] = [
    { id: 1, title: 'Learn Angular', completed: false },
    { id: 2, title: 'Write tests', completed: true },
    { id: 3, title: 'Refactor code', completed: false },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent, TodoItemComponent] // ✅ include child standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;

    // Provide mock todos
    component.todos = [...mockTodos];
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct number of TodoItemComponents', () => {
    const todoItems = fixture.debugElement.queryAll(By.directive(TodoItemComponent));
    expect(todoItems.length).toBe(mockTodos.length);
  });

  it('should pass the correct todo data to each TodoItemComponent', () => {
    const todoItems = fixture.debugElement.queryAll(By.directive(TodoItemComponent));

    todoItems.forEach((item, index) => {
      const childComponent = item.componentInstance as TodoItemComponent;
      expect(childComponent.todo).toEqual(mockTodos[index]);
    });
  });

  it('should emit toggle event when a child component emits toggle', () => {
    spyOn(component.toggle, 'emit');

    const todoItems = fixture.debugElement.queryAll(By.directive(TodoItemComponent));
    const firstItem = todoItems[0].componentInstance as TodoItemComponent;

    // Simulate child emitting toggle
    firstItem.toggle.emit(mockTodos[0].id);

    expect(component.toggle.emit).toHaveBeenCalledWith(mockTodos[0].id);
  });

  it('should emit delete event when a child component emits delete', () => {
    spyOn(component.delete, 'emit');

    const todoItems = fixture.debugElement.queryAll(By.directive(TodoItemComponent));
    const secondItem = todoItems[1].componentInstance as TodoItemComponent;

    // Simulate child emitting delete
    secondItem.delete.emit(mockTodos[1].id);

    expect(component.delete.emit).toHaveBeenCalledWith(mockTodos[1].id);
  });
});
