# Histórico de Cambios (Changelog)

Todas las modificaciones notables realizadas al proyecto *notifications-app-egx* serán documentadas en este archivo.

El formato se basa en [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]
### Added
- **Modernización visual completa** (2026-06-03):
  - `styles.css`: sistema de design tokens (CSS custom properties), reset global, fondo dark `#080c14` con gradiente aurora animado, scrollbar personalizado oscuro.
  - `index.html`: Google Fonts (Inter 400–700), meta description, theme-color.
  - `app.component.css`: header sticky con glassmorphism (`backdrop-filter: blur`), ícono de campana con gradiente, título con texto degradado, badge animado de no leídas, selector de rol estilizado en dark.
  - `app.component.html`: SVG de campana, badge de `unreadCount` reactivo en header.
  - `app.component.ts`: inyecta `NotificationService` para el badge del header.
  - `notification-list.component.css`: contenedor glass, cards con borde izquierdo acento, animación `slideIn`, punto pulsante para no leídas, botón con gradiente indigo→purple + hover `scale`.
  - `notification-list.component.html`: punto/check de status SVG, ícono de reloj en timestamp, check SVG en botón, empty state con ícono ilustrado.

---

### Added
- Documentación inicial (project_objective, CHANGELOG, prompts).
- Estructura y planificación base de la arquitectura (Arquitectura limpia).
- Entidad `Notification` en la capa de Domain.
- `AuthService` simulado utilizando Signals para reactividad.
- `NotificationService` con simulación WebSocket inmutable (`Subject` + `interval`).
- Directiva estructural `*appShowForRole` con manejo estricto de suscripciones.
- `NotificationListComponent` con soporte a navegación por teclado y WCAG (roles, aria-live, status).

### Changed
- Refactorización de componentes: Separación estricta de lógica (`.ts`), templates (`.html`) y estilos (`.css`).
