import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoItemComponent } from './todo-item.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Todo } from '../../models/todo.model';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  const mockTodo: Todo = {
    id: 1,
    title: 'Learn Angular Testing',
    completed: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoItemComponent] // standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;

    // Set default todo input
    component.todo = { ...mockTodo };

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct todo title', () => {
    const titleEl: HTMLElement = fixture.debugElement.query(By.css('.title')).nativeElement;
    expect(titleEl.textContent?.trim()).toBe('Learn Angular Testing');
  });

  it('should NOT have "completed" class when todo is not completed', () => {
    const liEl: HTMLElement = fixture.debugElement.query(By.css('.todo-item')).nativeElement;
    expect(liEl.classList).not.toContain('completed');
  });

  it('should HAVE "completed" class when todo is completed', () => {
    component.todo.completed = true;
    fixture.detectChanges();

    const liEl: HTMLElement = fixture.debugElement.query(By.css('.todo-item')).nativeElement;
    expect(liEl.classList).toContain('completed');
  });

  it('should emit toggle event when checkbox is clicked', () => {
    spyOn(component.toggle, 'emit');

    const checkbox: DebugElement = fixture.debugElement.query(By.css('input[type="checkbox"]'));
    checkbox.triggerEventHandler('change', {}); // simulate checkbox toggle

    expect(component.toggle.emit).toHaveBeenCalled();
  });

  it('should emit delete event when delete button is clicked', () => {
    spyOn(component.delete, 'emit');

    const deleteBtn: DebugElement = fixture.debugElement.query(By.css('.delete-btn'));
    deleteBtn.triggerEventHandler('click', null); // simulate delete button click

    expect(component.delete.emit).toHaveBeenCalled();
  });
});
