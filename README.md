# OrgCanvas — Editor Visual de Organigramas

[![CI](https://img.shields.io/github/actions/workflow/status/KaarloosT/OrgCanvas/ci.yml?branch=master)](https://github.com/KaarloosT/OrgCanvas/actions)
[![License](https://img.shields.io/github/license/KaarloosT/OrgCanvas)](LICENSE)
[![Issues](https://img.shields.io/github/issues/KaarloosT/OrgCanvas)](https://github.com/KaarloosT/OrgCanvas/issues)
[![Stars](https://img.shields.io/github/stars/KaarloosT/OrgCanvas?style=social)](https://github.com/KaarloosT/OrgCanvas)
[![Made with vibe-coding](https://img.shields.io/badge/made_with-vibe--coding-brightgreen)]()

OrgCanvas es un editor moderno y ligero para crear organigramas y diagramas jerárquicos con facilidad. Diseñado para flujos de trabajo rápidos y presentaciones profesionales, el proyecto está **Made with vibe-coding**: enfoque moderno, experiencia fluida y diseño limpio.

- **Stack:** React + Vite + TypeScript
- **UI:** Tailwind CSS
- **Editor de grafos:** react-flow (custom nodes & templates)
- **Export:** PNG & SVG (html-to-image)
- **Auth (placeholder):** Supabase (social login)

---

## 🚀 Qué puedes hacer ahora

- Añadir nodos (plantillas predefinidas: `corporate`, `corporate-alt` y `default`)
- Conectar nodos con enlaces y reorganizar mediante drag & drop
- Editar propiedades de nodos con el panel lateral (label, title, avatar, tipo)
- Importar/exportar organigramas en JSON
- Exportar la vista como PNG o SVG para compartir o incluir en presentaciones

## 🧩 Estado del proyecto

- Modo actual: **Single-user** con persistencia en `localStorage`.
- Funcionalidades implementadas: editor visual, plantillas corporativas, export a PNG/SVG, import/export JSON, panel lateral de propiedades y menú contextual.
- Seguridad: consulta `SECURITY.md` para prácticas y recomendaciones.

## 📥 Rápido inicio

1. Copia `.env.example` a `.env` y añade las variables necesarias (por ejemplo, Supabase si vas a usar autenticación).
2. `npm install`
3. `npm run dev`
4. Abre el navegador en `http://localhost:5173/`

## 🧪 Contribuir

- Abre issues para bugs o sugerencias y pull requests para contribuciones.
- Sigue la convención de commits y añade tests si introduces lógica crítica.

## 📜 Licencia

Este proyecto se publica como **MIT** por defecto (añade `LICENSE` si prefieres otra).

---

**Made with vibe-coding** ✨
