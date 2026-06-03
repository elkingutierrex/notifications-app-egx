# Histórico de Cambios (Changelog)

Todas las modificaciones notables realizadas al proyecto *notifications-app-egx* serán documentadas en este archivo.

El formato se basa en [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]
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
