import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeToggleComponent } from './theme-toggle.component';
import { ThemeService } from '../../services/theme.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

class MockThemeService {
  currentTheme = 'light';
  toggleTheme = jasmine.createSpy('toggleTheme');
}

describe('ThemeToggleComponent', () => {
  let component: ThemeToggleComponent;
  let fixture: ComponentFixture<ThemeToggleComponent>;
  let themeService: MockThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeToggleComponent],
      providers: [{ provide: ThemeService, useClass: MockThemeService }]
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeToggleComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the moon icon when theme is light', () => {
    component['themeService'].currentTheme = 'light';
    fixture.detectChanges();

    const imgEl: HTMLImageElement = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(imgEl.src).toContain('icon-moon.svg');
  });

  it('should render the sun icon when theme is dark', () => {
    component['themeService'].currentTheme = 'dark';
    fixture.detectChanges();

    const imgEl: HTMLImageElement = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(imgEl.src).toContain('icon-sun.svg');
  });

  it('should call toggleTheme when button is clicked', () => {
    const button: DebugElement = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);

    expect(themeService.toggleTheme).toHaveBeenCalled();
  });
});
