# integra-web

Sitio de **Integra Medical Group** — [integramedicalgroup.uy](https://integramedicalgroup.uy)

HTML estático, sin framework ni paso de build. Vercel sirve el directorio tal cual.

```
index.html            la home completa
assets/contacto.js    formulario + menú móvil
assets/*.webp         imágenes
```

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

## Pendiente

- **Falta el logo.** `assets/integra-logo.png` no estaba disponible; hay un wordmark
  tipográfico en su lugar, en el header y en el footer.
- Las páginas de cada unidad viven en sus propios sitios.
