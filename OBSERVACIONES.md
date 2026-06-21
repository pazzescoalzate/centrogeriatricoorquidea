# Observaciones sobre el contenido

Revisión del contenido del sitio. **No cambié nada del diseño ni del texto**; solo dejo aquí lo que noté para que tú decidas.

## 1. Datos de contacto que parecen de marcador de posición (placeholder)
- **Teléfono / WhatsApp:** aparece siempre `310 000 0000` (y el enlace `+573100000000`). Es claramente un número de relleno; hay que reemplazarlo por el número real antes de publicar.
- **Dirección:** `Cra 18 #23-45, Pereira` también tiene pinta de dirección de ejemplo. Verifica que sea la real.
- **Mapa:** el iframe de Google Maps apunta a `Pereira, Risaralda, Colombia` en general (centro de la ciudad), **no** a la dirección Cra 18 #23-45. El pin no coincide con la dirección que se muestra en el texto. Conviene usar la dirección exacta en el `src` del mapa.

## 2. Inconsistencia en el menú de navegación
- El menú superior (header) y el menú móvil **no incluyen** el enlace a "Modalidades", pero el footer **sí** lo incluye. La sección `#modalidades` existe. Decisión: o se añade "Modalidades" al header/móvil, o se quita del footer, para que sean consistentes.

## 3. Botón de teléfono en el header con texto oculto
- En el header, el enlace de teléfono móvil tiene `<span class="hidden">310 000 0000</span>` — el número está oculto con la clase `hidden`, así que solo se ve el ícono. Puede ser intencional (solo ícono), pero el texto queda inerte. Lo conservé tal cual.

## 4. Imágenes repetidas en varias secciones
No es un error, pero algunas fotos de Unsplash se reutilizan en distintas secciones:
- La foto de **enfermería** (`photo-1576091160550`) aparece en "Servicios" (Servicio 1) y también en la galería de "Instalaciones".
- La de **fisioterapia** (`photo-1582213782179`) aparece en Servicio 2 y en la galería.
- La de **actividades recreativas** (`photo-1593529467220`) aparece en Servicio 4 y en la galería.
- La de **entrenamiento físico/cognitivo** (`photo-1571019613454`) aparece en Servicio 3 y en la modalidad "Cuidado por Día".

Todas son imágenes genéricas de stock (Unsplash). Lo ideal sería sustituirlas por fotos reales del centro antes de publicar.

## 5. Texto vago por falta de datos reales
- "**Años de experiencia**" (sección Por qué elegirnos) no da un número concreto. Si tienes el dato real (p. ej. "más de 10 años"), daría más confianza.

## 6. Coherencia de horarios (menor)
- En varios lugares se dice "**24 horas · 7 días**" / "Lunes a domingo, 24 horas". Pero la modalidad "Cuidado por Día" dice "Lunes a sábado" y "Estancia Temporal"/"Internado" implican atención continua. Es coherente (el centro abre siempre; la modalidad por día es L-S), pero vale la pena revisarlo para que no genere dudas.

## Resumen
No hay información "rota" ni contradicciones graves de contenido. Lo más importante antes de publicar:
1. Reemplazar teléfono, dirección y coordenadas del mapa por los reales.
2. Decidir si "Modalidades" va en el menú principal (hoy solo está en el footer).
3. Cambiar las fotos de stock por fotos reales del centro.
