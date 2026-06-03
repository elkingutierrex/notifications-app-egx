import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NotificationService } from '../../infrastructure/notification.service';
import { ShowForRoleDirective } from '../../shared/show-for-role.directive';

@Component({
  selector: 'app-notification-list',
  standalone: true,
  imports: [ShowForRoleDirective, DatePipe],
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.css'
})
export class NotificationListComponent {
  notificationService = inject(NotificationService);

  markAsRead(id: string): void {
    this.notificationService.markAsRead(id);
  }

  // Soporte manual para teclas obligatorias en requerimiento Accesibilidad.
  handleKeydown(event: KeyboardEvent, id: string): void {
    if (event.key === 'Enter' || event.key === ' ' || event.code === 'Space') {
      event.preventDefault(); // prevenir comportamientos indeseados (scroll por espacio)
      this.markAsRead(id);
    }
  }
}
