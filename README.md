# PEARL HOME

Sitio estatico de PEARL HOME powered by Jarvis.

## Accesos

- Sitio publicado: https://ricardorincon719.github.io/pearlhome-site/
- Demo interactiva: https://ricardorincon719.github.io/pearlhome-site/demo.html
- Portugues: https://ricardorincon719.github.io/pearlhome-site/pt-br/
- Demo en portugues: https://ricardorincon719.github.io/pearlhome-site/pt-br/demo.html
- Pagina principal: [`index.html`](index.html)
- Fuente de la demo: [`demo.html`](demo.html)

## Estructura multidioma

- `/` mantiene la version en espanol.
- `/pt-br/` queda reservado para portugues brasileno.
- `css/` y `js/` son compartidos entre idiomas.
- La traduccion portuguesa se agregara sobre los archivos de `pt-br/` sin reemplazar el contenido espanol.

## Vista local

Desde la raiz del repo:

```bash
python3 -m http.server 8000
```

Luego abre:

- http://localhost:8000/
- http://localhost:8000/demo.html
