import { Injectable, signal, computed, effect } from '@angular/core';
import { Subject, interval, Subscription } from 'rxjs';
import { Notification } from '../domain/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // Estado provado, estrictamente manejado con inmutabilidad
  readonly #notifications = signal<Notification[]>([]);
  
  // Estado derivado público (Read-only)
  readonly notifications = this.#notifications.asReadonly();
  
  readonly unreadNotifications = computed(() => {
    return this.#notifications().filter(n => !n.isRead);
  });
  
  readonly unreadCount = computed(() => {
    return this.unreadNotifications().length;
  });

  // Simulación WebSocket
  private mockWebSocket$ = new Subject<Notification>();
  private wsSubscription?: Subscription;

  constructor() {
    this.loadFromLocalStorage();
    
    // El effect de Angular captura las dependencias que lee
    // Al ejecutar effect() en el constructor ya tenemos contexto de inyección
    effect(() => {
      const currentNotifications = this.#notifications();
      localStorage.setItem('notifications', JSON.stringify(currentNotifications));
    });

    this.startMockWebSocket();
  }

  /**
   * Carga inicial desde localStorage y reconstrucción de Dates
   */
  private loadFromLocalStorage(): void {
    const stored = localStorage.getItem('notifications');
    if (stored) {
      try {
        const parsed: Notification[] = JSON.parse(stored);
        
        // Reconstruimos la Date que se guarda como string en JSON.stringify
        const reconstructed = parsed.map(n => ({
          ...n,
          createdAt: new Date(n.createdAt)
        }));
        
        this.#notifications.set(reconstructed);
      } catch (e) {
        console.error('Error al parsear el localStorage:', e);
        this.#notifications.set([]);
      }
    }
  }

  /**
   * Simulación de WebSocket cada 10 segundos
   */
  private startMockWebSocket(): void {
    // interval cada 10 segundos (10000 ms)
    this.wsSubscription = interval(10000).subscribe((val) => {
      const newNotification: Notification = {
        id: crypto.randomUUID(),
        message: `Nueva notificación en tiempo real (#${val + 1})`,
        isRead: false,
        createdAt: new Date(),
        targetRoles: val % 2 === 0 ? ['admin'] : ['user', 'admin']
      };
      // Emitimos por el Subject comportandose como un Stream real
      this.mockWebSocket$.next(newNotification);
    });

    // Suscripción al stream para actualizar las señales inmutablemente
    this.mockWebSocket$.subscribe((notification) => {
      this.#notifications.update((current) => [notification, ...current]);
    });
  }

  /**
   * Marca una notificación como leída de manera Inmutable
   */
  markAsRead(id: string): void {
    this.#notifications.update(current =>
      current.map(notification =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  }
}
