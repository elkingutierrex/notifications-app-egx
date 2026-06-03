import { Component, inject } from '@angular/core';
import { NotificationListComponent } from './features/notification-list/notification-list.component';
import { AuthService } from './core/auth.service';
import { NotificationService } from './infrastructure/notification.service';

@Component({
  selector: 'app-root',
  imports: [NotificationListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  authService  = inject(AuthService);
  notifService = inject(NotificationService);

  changeRole(event: Event): void {
    const selector = event.target as HTMLSelectElement;
    this.authService.setRole(selector.value);
  }
}
