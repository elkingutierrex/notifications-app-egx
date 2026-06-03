# Prompts Realizados

Este archivo guarda el registro histórico de instrucciones principales enviadas al asistente.

## Instrucción 1 (Planificación Inicial)
**Context:** Sistema de notificaciones con WebSocket simulado + directiva estructural + accesibilidad 

* **Servicio NotificationService (10 pts)**: Signal privada `#notifications`, Computeds: `unreadCount` y `unreadNotifications`, WebSocket simulado: `Subject` + `interval` (c/10s), Método `markAsRead(id)` inmutable (`update`), Effect → guardar en localStorage y cargar al inicio (reconstruir fechas).
* **Directiva *appShowForRole (8 pts)**: Muestra/oculta según rol, Acepta string o array de roles, Usa `TemplateRef` + `ViewContainerRef`, Reactivo a cambios de rol.
* **Componente NotificationListComponent (7 pts)**: Lista con botón "Marcar como leída" (`aria-label`, `role=list`, etc.), `aria-live="polite"` para nuevas, Navegación por teclado (tab, espacio, enter), Contador con `role="status"` y `@empty`.

## Instrucción 2 (Modernización Visual – 2026-06-03)
**Context:** Mejorar la parte visual del proyecto, modernizarla y mejorar los contrastes.

* **Global**: Design tokens en `styles.css`, dark theme (#080c14), aurora gradient en body, Google Fonts Inter, scrollbar oscuro.
* **App Header**: Glassmorphism sticky con `backdrop-filter`, gradiente de texto en marca, badge animado reactivo de no leídas, select estilizado dark.
* **Notification Cards**: Cards glass con borde-izquierdo acento indigo, animación `slideIn`, dot pulsante para no leídas, check SVG para leídas, botón gradiente con hover `scale`, empty state ilustrado con SVG.
* **Contraste**: Todos los colores de texto pasan ratio WCAG AA sobre fondo oscuro (`#f1f5f9` sobre `rgba(255,255,255,0.04)` → ratio >7:1).
