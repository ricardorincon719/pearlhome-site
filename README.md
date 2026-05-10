# PEARL HOME

Sitio estatico de PEARL HOME powered by Jarvis.

## Accesos

- Sitio publicado en portugues: https://ricardorincon719.github.io/pearlhome-site/
- Demo interactiva en portugues: https://ricardorincon719.github.io/pearlhome-site/demo.html
- Espanol: https://ricardorincon719.github.io/pearlhome-site/es/
- Demo en espanol: https://ricardorincon719.github.io/pearlhome-site/es/demo.html
- Pagina principal: [`index.html`](index.html)
- Fuente de la demo: [`demo.html`](demo.html)

## Estructura multidioma

- `/` mantiene la version principal en portugues brasileno.
- `/es/` conserva la version en espanol.
- `/pt-br/` redirige a `/` para compatibilidad con enlaces previos.
- `css/` y `js/` son compartidos entre idiomas.
- La version espanola vive separada, asi que las mejoras portuguesas no reemplazan el contenido espanol.

## Vista local

Desde la raiz del repo:

```bash
python3 -m http.server 8000
```

Luego abre:

- http://localhost:8000/
- http://localhost:8000/demo.html
