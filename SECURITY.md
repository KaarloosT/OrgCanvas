# Seguridad — Checklist y recomendaciones (Producción)

Esta guía resume prácticas recomendadas para poner en producción la app de Organigramas de forma segura.

1. Autenticación y autorización

   - Usa proveedores de Auth social confiables (Supabase/Firebase/Okta). Habilita verificación de callback domains y restricción de redirecciones.
   - Implementa RBAC y scopes mínimos.
   - Protege endpoints con tokens firmados (JWT) y expira tokens de sesión.

2. Transportes y políticas de red

   - Fuerza HTTPS en todas partes; HSTS estricto.
   - Configura CORS con origenes permitidos y preflight controlado.

3. Gestión de secretos

   - No guardar secretos en repositorios; usa servicios como Vault, Parameter Store, o secretos de Vercel/Netlify.
   - Rotación periódica de claves y registros de acceso.

4. Notas sobre opciones avanzadas (opcional)

   - Si en el futuro decides añadir colaboración en tiempo real, documenta y asegura el servidor apropiadamente (TLS, autenticación, rate-limiting y auditoría).
   - Asegúrate de evaluar riesgos, pruebas DAST/SAST y controles de acceso antes de habilitarlo en producción.

5. Harden de la app

   - Content Security Policy (CSP) estricta para bloquear inyección de scripts.
   - Validación de entradas y saneamiento en servidor y cliente.
   - Protección CSRF donde aplique.

6. Dependencias y CI

   - Habilita dependabot/renovate y escaneo SCA (Snyk, GitHub code scanning).
   - Ejecuta lint, tests y build en CI; bloquear merge si fallan.

7. Observabilidad y respuesta a incidentes

   - Logging centralizado y alerta (error rates, autenticaciones fallidas).
   - Plan de respuesta: rotación de credenciales, revocación de sesiones, auditoría.

8. Auditoría y pruebas
   - Pruebas de seguridad (DAST/SAST), fuzzing y pentests antes de la release mayor.

> Consejo: Documenta claramente todos los puntos en `SECURITY.md` y liga a la política de seguridad de la organización si existe.
