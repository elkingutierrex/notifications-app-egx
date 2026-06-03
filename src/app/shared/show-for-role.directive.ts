import { Directive, Input, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Directive({
  selector: '[appShowForRole]',
  standalone: true
})
export class ShowForRoleDirective {
  private allowedRoles: string[] = [];
  private hasView = false;

  private templateRef   = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);
  private authService   = inject(AuthService);

  // Acepta un rol particular o un listado de roles
  @Input() set appShowForRole(roles: string | string[]) {
    this.allowedRoles = Array.isArray(roles) ? roles : [roles];
    // Revalidamos de forma inmediata al recibir nuevos roles
    this.updateView(this.authService.userRole());
  }

  constructor() {
    // effect() se ejecuta dentro del contexto de inyección → sin NG0203.
    // Se re-ejecuta automáticamente cada vez que userRole Signal cambia.
    effect(() => {
      const role = this.authService.userRole();
      this.updateView(role);
    });
  }

  private updateView(currentRole: string): void {
    const isRoleValid = this.allowedRoles.includes(currentRole);

    if (isRoleValid && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!isRoleValid && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
