# Fundación Centro Geriátrico Orquídea — Versión React

Migración a React (Vite) del sitio original. El diseño se conserva idéntico: mismos colores, tipografía (Inter), Tailwind, iconos Font Awesome, animaciones y contenido.

## Requisitos
- Node.js 18+

## Uso

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm run build    # genera la versión de producción en /dist
npm run preview  # previsualiza el build de producción
```

## Estructura

```
├── index.html              # HTML raíz: config Tailwind, fuentes, Font Awesome (idéntico al original)
├── public/assets/          # logos (svg + png)
├── src/
│   ├── main.jsx            # punto de entrada
│   ├── App.jsx             # componente único con todas las secciones
│   └── data.js            # imágenes de galería y preguntas frecuentes
└── vite.config.js
```

## Notas técnicas de la migración

- El formato propietario original (`DCLogic`, plantillas `{{ }}`, `<sc-if>`) se reemplazó por estado React (`useState`/`useEffect`).
- Lightbox de galería: navegación con flechas y tecla Escape, igual que el original.
- Menú móvil, acordeón de FAQ (el primero abierto por defecto) y badges flotantes: comportamiento idéntico.
- Tailwind se mantiene vía CDN con la misma configuración inline para preservar exactamente el look original. Para un despliegue de producción más optimizado se podría migrar a Tailwind como dependencia, pero eso cambiaría el flujo de build (no el diseño).

## Observaciones sobre el contenido (revisión solicitada)

Ver el archivo `OBSERVACIONES.md`.
