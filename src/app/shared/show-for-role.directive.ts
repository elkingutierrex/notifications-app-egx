import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Subscription } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[appShowForRole]',
  standalone: true
})
export class ShowForRoleDirective implements OnInit, OnDestroy {
  private allowedRoles: string[] = [];
  private hasView = false;
  private roleSubscription?: Subscription;

  // Acepta un rol particular o un listado de roles
  @Input() set appShowForRole(roles: string | string[]) {
    this.allowedRoles = Array.isArray(roles) ? roles : [roles];
    
    // Si la entrada se actualiza durante la ejecución, revalidamos la vista
    this.updateView(this.authService.userRole());
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // 1. Suscripción reactiva a cambios de rol (usando toObservable por compatibilidad signal-rxjs)
    this.roleSubscription = toObservable(this.authService.userRole).subscribe(role => {
      this.updateView(role);
    });
  }

  ngOnDestroy(): void {
    // 2. Limpieza estricta de suscripciones al destruir el componente
    if (this.roleSubscription) {
      this.roleSubscription.unsubscribe();
    }
  }

  private updateView(currentRole: string): void {
    // Validar si entre los roles permitidos esta el actual
    const isRoleValid = this.allowedRoles.includes(currentRole);

    // Evitar renders innecesarios (solo crea o destruye si cambió de estado boolean)
    if (isRoleValid && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!isRoleValid && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
