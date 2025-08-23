import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoFooterComponent } from './todo-footer.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('TodoFooterComponent', () => {
  let component: TodoFooterComponent;
  let fixture: ComponentFixture<TodoFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoFooterComponent] // because it's a standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(TodoFooterComponent);
    component = fixture.componentInstance;

    // Default values for testing
    component.activeCount = 3;
    component.currentFilter = 'all';

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the active todo count', () => {
    const spanEl: HTMLElement = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(spanEl.textContent).toContain('3 items left');
  });

  it('should emit filterChange when a filter button is clicked', () => {
    spyOn(component.filterChange, 'emit');

    // Click "Active" button
    const filterButtons = fixture.debugElement.queryAll(By.css('.filters button'));
    filterButtons[1].nativeElement.click(); // "Active"

    expect(component.filterChange.emit).toHaveBeenCalledWith('active');
  });

  it('should apply "active" class to the current filter button', () => {
    const activeBtn: HTMLElement = fixture.debugElement.query(By.css('.filters .active')).nativeElement;
    expect(activeBtn.textContent!.trim().toLowerCase()).toBe('all');
  });

  it('should emit clearCompleted when Clear Completed button is clicked', () => {
    spyOn(component.clearCompleted, 'emit');

    const clearBtn: DebugElement = fixture.debugElement.query(By.css('.clear-completed'));
    clearBtn.nativeElement.click();

    expect(component.clearCompleted.emit).toHaveBeenCalled();
  });
});
