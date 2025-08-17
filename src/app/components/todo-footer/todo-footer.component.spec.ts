import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoFooterComponent } from './todo-footer.component';
import { By } from '@angular/platform-browser';

describe('TodoFooterComponent', () => {
  let component: TodoFooterComponent;
  let fixture: ComponentFixture<TodoFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoFooterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoFooterComponent);
    component = fixture.componentInstance;
    component.activeCount = 3;
    component.currentFilter = 'all';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the active todo count', () => {
    const counter = fixture.debugElement.query(By.css('.todo-count')).nativeElement;
    expect(counter.textContent).toContain('3 items left');
  });

  it('should emit filter change on filter button click', () => {
    spyOn(component.filterChange, 'emit');

    const buttons = fixture.debugElement.queryAll(By.css('.filters button'));
    buttons[1].nativeElement.click(); // e.g., "Active"

    expect(component.filterChange.emit).toHaveBeenCalledWith('active');
  });

  it('should highlight the active filter', () => {
    const activeBtn = fixture.debugElement.query(By.css('.filters .active')).nativeElement;
    expect(activeBtn.textContent.toLowerCase()).toContain('all');
  });

  it('should emit clearCompleted on button click', () => {
    spyOn(component.clearCompleted, 'emit');

    const clearBtn = fixture.debugElement.query(By.css('#clear-completed')).nativeElement;
    clearBtn.click();

    expect(component.clearCompleted.emit).toHaveBeenCalled();
  });
});
