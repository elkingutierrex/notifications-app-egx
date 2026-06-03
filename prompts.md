# Prompts Realizados

Este archivo guarda el registro histórico de instrucciones principales enviadas al asistente.

## Instrucción 1 (Planificación Inicial)
**Context:** Sistema de notificaciones con WebSocket simulado + directiva estructural + accesibilidad 

* **Servicio NotificationService (10 pts)**: Signal privada `#notifications`, Computeds: `unreadCount` y `unreadNotifications`, WebSocket simulado: `Subject` + `interval` (c/10s), Método `markAsRead(id)` inmutable (`update`), Effect → guardar en localStorage y cargar al inicio (reconstruir fechas).
* **Directiva *appShowForRole (8 pts)**: Muestra/oculta según rol, Acepta string o array de roles, Usa `TemplateRef` + `ViewContainerRef`, Reactivo a cambios de rol.
* **Componente NotificationListComponent (7 pts)**: Lista con botón "Marcar como leída" (`aria-label`, `role=list`, etc.), `aria-live="polite"` para nuevas, Navegación por teclado (tab, espacio, enter), Contador con `role="status"` y `@empty`.
