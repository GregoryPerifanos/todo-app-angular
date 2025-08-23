import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeToggleComponent } from './theme-toggle.component';
import { ThemeService } from '../../services/theme.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

// ✅ MockThemeService simulates ThemeService behavior for testing
class MockThemeService {
  currentTheme: 'light' | 'dark' = 'light';
  toggleTheme = jasmine.createSpy('toggleTheme'); // spy to track if it was called
}

describe('ThemeToggleComponent', () => {
  let component: ThemeToggleComponent;
  let fixture: ComponentFixture<ThemeToggleComponent>;
  let themeService: MockThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeToggleComponent], //  because it's a standalone component
      providers: [
        { provide: ThemeService, useClass: MockThemeService } // use mock service
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeToggleComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService) as any; // typecast for mock access
    fixture.detectChanges(); // trigger initial binding/render
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // basic sanity test
  });

  it('should render the moon icon when theme is light', () => {
    // Simulate light mode
    themeService.currentTheme = 'light';
    fixture.detectChanges();

    // Get <img> element and check src
    const imgEl: HTMLImageElement = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(imgEl.src).toContain('icon-moon.svg');
  });

  it('should render the sun icon when theme is dark', () => {
    // Simulate dark mode
    themeService.currentTheme = 'dark';
    fixture.detectChanges();

    // Get <img> element and check src
    const imgEl: HTMLImageElement = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(imgEl.src).toContain('icon-sun.svg');
  });

  it('should call toggleTheme when button is clicked', () => {
    const button: DebugElement = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);

    // ✅ Check that the service's method was triggered
    expect(themeService.toggleTheme).toHaveBeenCalled();
  });
});
