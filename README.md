# integra-web

Sitio de **Integra Medical Group** — [integramedicalgroup.uy](https://integramedicalgroup.uy)

HTML estático, sin framework ni paso de build. Vercel sirve el directorio tal cual.

```
index.html            la home de integramedicalgroup.uy
assets/contacto.js    formulario + menú móvil
assets/*.webp         imágenes

personal/             integrapersonal.integramedicalgroup.uy
  index.html          la landing de Integra Personal
  assets/menu.js      sólo el menú móvil (esta página no tiene formulario)
  assets/*.webp       galería del equipo
```

Dos sitios, un repo. Cada uno es un proyecto de Vercel distinto: el de Integra
Personal apunta al subdirectorio `personal/` como raíz.

## Formulario de contacto

Envía a la **Forms API de HubSpot** directo desde el navegador. Sin backend, sin API key.

| | |
|---|---|
| Portal | `51155155` |
| Formulario | `b56f1de2-4a38-4f27-807f-bf9dafa297d6` |

Los IDs están en `assets/contacto.js`. Mapeo de campos:

| Campo | Propiedad HubSpot |
|---|---|
| Nombre | `firstname` + `lastname` (corta en el primer espacio) |
| Email | `email` |
| Celular | `phone` |
| Unidad de interés | `unidad_de_interes` |
| Mensaje | `message` |

Los `value` del desplegable son los nombres internos de HubSpot
(`cobertura_medica_deportiva`, `integra_personal`, `vivam`, `cmd_tech`, `consulta_general`),
no las etiquetas visibles.

> HubSpot devuelve **400** si se manda un campo que el formulario no tiene declarado.
> Antes de agregar un campo acá, agregalo primero al formulario en HubSpot.

## Unidades de negocio

Cada una apunta a su propio dominio:

| Unidad | Destino |
|---|---|
| CMD Cobertura Médica Deportiva | coberturamedicad.com |
| Integra Personal | integrapersonal.integramedicalgroup.uy |
| Vivam | vivam.uy |
| CMD Tech | cmdtech.uy |

## Responsive

El header tiene dos versiones que conmutan por CSS en **1099px**: la de escritorio
(`data-hdr="desktop"`) y la móvil con menú hamburguesa (`data-hdr="mobile"`).
Verificado sin desbordes de 320 a 1920px.

## Favicon

El isotipo recortado del logo vertical. El texto "Integra Medical Group" no entra
legible a 16px, así que el icono usa sólo la marca.

| Archivo | Uso |
|---|---|
| `favicon.ico` (raíz de cada sitio) | 16/32/48 px, con transparencia |
| `assets/favicon-32.png` | navegadores modernos |
| `assets/icon-192.png` | Android / pantalla de inicio |
| `assets/apple-touch-icon.png` | iOS, 180px con fondo blanco |

El de iOS va con fondo blanco a propósito: iOS ignora la transparencia y compone
sobre negro, que dejaría la marca ilegible.

## Pendiente

- **Falta el logo.** `assets/integra-logo.png` no estaba disponible; hay un wordmark
  tipográfico en su lugar, en el header y en el footer.
- Las páginas de cada unidad viven en sus propios sitios.
