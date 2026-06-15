# HTML5

HTML es la quinta y ultima version del lenguaje de Etiquetas HTML que supuso una revolución tecnológica.

## Obsolescencia de Flash
Adobe Flash fue una plataforma de software multimedia utilizada para añadir animaciones, videos, aplicaciones interactivas y videojuegos a las páginas web. 

Durante mucho tiempo fue el estándar de la industria. Sin embargo, los navegadores web no podían usarlo de forma nativa y esto forzaba al usuario a instalar `Adobe Flash Player`.

Por ello HTML5 introdujo etiquetas como `<video>`, `<audio>` y `<canvas>`, permitiendo hacer todo lo que hacía Flash directamente desde el navegador  sin instalar complementos, consumiendo menos recursos y de forma abierta.

## Nuevos tipos de Input

### 1. Control de Color
* `<input type="color">`: Ingresar color mediante una paleta.

### 2. Gestión de Fechas y Tiempo
* `<input type="date">`: Ingresar un año, mes y día (no incluye hora).
* `<input type="datetime">`: Ingresar fecha, hora y zona horaria.
* `<input type="datetime-local">`: Ingresar fecha y hora local del usuario
* `<input type="month">`: Ingresar mes y año.
* `<input type="week">`: Ingresar semana.
* `<input type="time">`: Ingresar horas y minutos.

### 3. Validación de Cadenas Especializadas
* `<input type="email">`: Ingresar correos electrónicos.
* `<input type="url">`:  Ingresar URLs.
* `<input type="tel">`: Ingresar números telefónicos.

### 4. Controles Numéricos
* `<input type="number">`: Ingresar únicamente valores numéricos. 
* `<input type="range">`: Ingresar valor con un slider.

### 5. Búsqueda Integrada
* `<input type="search">`: Ingresar un valor de busqueda.

## New Audio and Video Types

### 1. Audio
* `<audio src="Audio url">`
#### Atributes
* autoplay: Booleano que especifica si el audio comenzará a reproducirse automáticamente.
* autobuffer: Booleano que especifica si el audio comenzará automáticamente a almacenarse en el búfer.
* loop: Booleano que especifica si el reproductor de audio volverá automáticamente al inicio al llegar al final del audio.
* controls: Con esto el navegador ofrecerá controles que permitirán al usuario controlar la reproducción de audio, el volumen y la pausa/reanudación de la reproducción.
* src: La URL del audio que se va a insertar.

### 1. Video
* `<video src="video url">`
* autoplay: Booleano que especifica si el video comenzará a reproducirse automáticamente.
* autobuffer: Booleano que especifica si el video comenzará automáticamente a almacenarse en el búfer.
* loop: Booleano que especifica si el reproductor de video volverá automáticamente al inicio al llegar al final del video.
* controls: Con esto el navegador ofrecerá controles que permitirán al usuario controlar la reproducción de video, el volumen y la pausa/reanudación de la reproducción.
* src: La URL del video que se va a insertar.

Fuentes: 
* https://www.tutorialspoint.com/article/explain-new-input-types-provided-by-html5-for-forms
* https://es.wikipedia.org/wiki/HTML5
* https://www.w3schools.com/html/html5_video.asp
