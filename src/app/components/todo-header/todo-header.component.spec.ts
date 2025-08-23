import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoHeaderComponent } from './todo-header.component';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { By } from '@angular/platform-browser';

describe('TodoHeaderComponent', () => {
  let component: TodoHeaderComponent;
  let fixture: ComponentFixture<TodoHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TodoHeaderComponent,
        ThemeToggleComponent // Include standalone child component
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title "TODO"', () => {
    const titleEl: HTMLElement = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(titleEl.textContent?.trim()).toBe('TODO');
  });

  it('should include the ThemeToggleComponent', () => {
    const toggleComponent = fixture.debugElement.query(By.directive(ThemeToggleComponent));
    expect(toggleComponent).toBeTruthy();
  });
});
