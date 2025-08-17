import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { ThemeToggleComponent } from "../theme-toggle/theme-toggle.component"; 

@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.css'],
  imports: [ThemeToggleComponent]
})
export class TodoHeaderComponent {
  constructor(private themeService: ThemeService) {}

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  get isDark(): boolean {
    return this.themeService.currentTheme === 'dark';
  }
}
