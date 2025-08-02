import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  currentTheme: 'light' | 'dark' = 'light';

  constructor() {
    this.loadInitialTheme();
  }

  private loadInitialTheme() {
    // Check localStorage first
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;

    if (saved) {
      this.currentTheme = saved;
    } else {
      // Use system preference if nothing saved
      this.currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // Apply theme to <body>
    document.body.setAttribute('data-theme', this.currentTheme);
  }

  toggleTheme() {
    // Toggle theme
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';

    // Update <body> attribute
    document.body.setAttribute('data-theme', this.currentTheme);

    // Save to localStorage
    localStorage.setItem('theme', this.currentTheme);
  }
}
