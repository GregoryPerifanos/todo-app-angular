import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TodoHeaderComponent } from './components/todo-header/todo-header.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoFooterComponent } from './components/todo-footer/todo-footer.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        TodoHeaderComponent,
        TodoFormComponent,
        TodoListComponent,
        TodoFooterComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render the TodoHeader component', () => {
    const header = fixture.debugElement.query(By.directive(TodoHeaderComponent));
    expect(header).toBeTruthy();
  });

  it('should render the TodoForm component', () => {
    const form = fixture.debugElement.query(By.directive(TodoFormComponent));
    expect(form).toBeTruthy();
  });

  it('should render the TodoList component', () => {
    const list = fixture.debugElement.query(By.directive(TodoListComponent));
    expect(list).toBeTruthy();
  });

  it('should render the TodoFooter component', () => {
    const footer = fixture.debugElement.query(By.directive(TodoFooterComponent));
    expect(footer).toBeTruthy();
  });

  it('should correctly pass activeCount and currentFilter to the footer', () => {
    // ✅ Simulate todos instead of assigning activeCount directly
    component.todos = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: false },
      { id: 3, title: 'Task 3', completed: true }
    ];
    component.currentFilter = 'active';
    fixture.detectChanges();

    const footer = fixture.debugElement.query(By.directive(TodoFooterComponent)).componentInstance as TodoFooterComponent;

    expect(footer.activeCount).toBe(2); // ✅ 2 active todos
    expect(footer.currentFilter).toBe('active');
  });

  it('should call addTodo when TodoForm emits add event', () => {
    spyOn(component, 'addTodo');

    const form = fixture.debugElement.query(By.directive(TodoFormComponent)).componentInstance as TodoFormComponent;
    form.addTodo.emit('New Todo');

    fixture.detectChanges();

    expect(component.addTodo).toHaveBeenCalledWith('New Todo');
  });

  it('should call toggleTodo when TodoList emits toggle event', () => {
    spyOn(component, 'toggleTodo');

    const list = fixture.debugElement.query(By.directive(TodoListComponent)).componentInstance as TodoListComponent;
    list.toggle.emit(1);

    expect(component.toggleTodo).toHaveBeenCalledWith(1);
  });

  it('should call deleteTodo when TodoList emits delete event', () => {
    spyOn(component, 'deleteTodo');

    const list = fixture.debugElement.query(By.directive(TodoListComponent)).componentInstance as TodoListComponent;
    list.delete.emit(1);

    expect(component.deleteTodo).toHaveBeenCalledWith(1);
  });

  it('should call setFilter when TodoFooter emits filterChange event', () => {
    spyOn(component, 'setFilter');

    const footer = fixture.debugElement.query(By.directive(TodoFooterComponent)).componentInstance as TodoFooterComponent;
    footer.filterChange.emit('completed');

    expect(component.setFilter).toHaveBeenCalledWith('completed');
  });

  it('should call clearCompleted when TodoFooter emits clearCompleted event', () => {
    spyOn(component, 'clearCompleted');

    const footer = fixture.debugElement.query(By.directive(TodoFooterComponent)).componentInstance as TodoFooterComponent;
    footer.clearCompleted.emit();

    expect(component.clearCompleted).toHaveBeenCalled();
  });
});
