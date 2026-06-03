import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationListComponent } from './features/notification-list/notification-list.component';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NotificationListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  authService = inject(AuthService);

  changeRole(event: Event): void {
    const selector = event.target as HTMLSelectElement;
    this.authService.setRole(selector.value);
  }
}
