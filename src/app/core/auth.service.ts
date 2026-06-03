import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Simulating an active user role using a Signal for reactivity
  readonly userRole = signal<string>('admin');

  /**
   * Cambia el rol del usuario actual (solo para simular logica de prueba)
   */
  setRole(role: string): void {
    this.userRole.set(role);
  }
}
