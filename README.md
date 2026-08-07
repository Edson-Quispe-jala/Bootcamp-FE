# Bootcamp-FE — Duelist Codex

## Cómo ejecutar el proyecto

### Requisitos previos
- Node.js **18 o superior**
- npm **9 o superior**

### Pasos

```bash
# 1. Entrar al directorio del proyecto
cd duelist-codex

# 2. Instalar dependencias
npm install

# 3. Levantar el servidor de desarrollo
npm start
```

La aplicación estará disponible en `http://localhost:4200`.

---

## Endpoint(s) de la API utilizados

Se consume la **YGOPRODeck API**:

| Propósito | Endpoint |
|---|---|
| Listar cartas con paginación y búsqueda por nombre | `GET https://db.ygoprodeck.com/api/v7/cardinfo.php` |
| Obtener detalle de una carta por su ID | `GET https://db.ygoprodeck.com/api/v7/cardinfo.php?id={id}` |

### Query params usados

| Param | Descripción |
|---|---|
| `fname` | Búsqueda parcial por nombre de carta |
| `num` | Cantidad de resultados por página (fijo en `12`) |
| `offset` | Desplazamiento para la paginación |
| `id` | ID exacto de la carta para el detalle |

---

## Páginas de la aplicación

### 1. `/` — Home
Pantalla de bienvenida con el título **"Duelist Codex"** y un botón que navega a la lista de cartas.

### 2. `/cards` — Lista de cartas
Página principal del catálogo. Contiene:
- **Barra de búsqueda**: permite filtrar cartas por nombre usando el param `fname` de la API.
- **Grid de cartas**: muestra hasta 12 cartas por página en un layout responsive.
- **Skeleton loading**: mientras se cargan los datos se muestran 4 placeholders animados con un efecto shimmer.
- **Estado vacío**: si la búsqueda no devuelve resultados, se muestra un mensaje.
- **Paginación**: botones "Anterior" y "Siguiente" que se deshabilitan automáticamente según corresponda.
- Cada carta es clickeable y navega a `/card/{id}`.

### 3. `/card/:id` — Detalle de carta
Vista completa de una carta individual. El layout es de **dos columnas** (imagen a la izquierda, información a la derecha) y la información se organiza en secciones visuales diferenciadas:

| Sección | Contenido |
|---|---|
| **Header** | Nombre de la carta y su tipo (ej.: "Effect Monster") |
| **Efecto** | Descripción del efecto de la carta |
| **Estadísticas** | ATK, DEF y Nivel (solo si la carta los tiene) |
| **Precio TCG Player** | Precio de la carta en TCGPlayer |

---

## Decisiones técnicas relevantes

### Signals como sistema de estado reactivo
En lugar de usar `BehaviorSubject` de RxJS, el servicio `CardService` utiliza **Angular Signals** para manejar el estado global de la aplicación:

```typescript
// src/app/services/card.ts
readonly cardList   = signal<CardData[]>([]);
readonly searchTerm = signal('');
readonly isLoading  = signal(false);
readonly offset     = signal(0);
```

- **`signal()`** crea un valor reactivo. Cuando cambia, Angular solo re-renderiza los componentes que lo leen, sin necesidad de Zone.js ni subscripciones manuales.
- Los componentes acceden al estado directamente via `inject(CardService)` y leen los valores llamando a las señales como funciones: `this.cardList()`.

### `input()` en lugar de `@Input()`
Los componentes `Card` y `PageHeader` usan la nueva API de signals para inputs:

```typescript
// src/app/card/card.ts
readonly card = input<CardData>();

// src/app/page-header/page-header.ts
readonly redirectRoute = input.required<string>();
readonly title = input.required<string>();
```

- `input()` devuelve una señal de solo lectura. Se lee igual que una signal: `card()`.
- `input.required<T>()` hace que el input sea obligatorio en tiempo de compilación.

### Paginación basada en offset
La paginación no usa un concepto de "número de página" sino **offset** (desplazamiento absoluto):
- Cada página muestra exactamente **12 cartas** (`limit = 12`).
- Al avanzar: `offset + 12`.
- Al retroceder: `offset - 12`.
- **Lógica de habilitación de botones**:
  - "Anterior" se habilita si `offset > 0`.
  - "Siguiente" se habilita si `cardList().length === 12` (si llegaron exactamente 12 cartas, probablemente haya más).

```typescript
allowPrevious() { return this.offset() > 0; }
allowNext()     { return this.cardList().length === 12; }
```

### `@defer` para la carga del detalle
El template de `card-detail.html` usa el bloque **`@defer`** de Angular:

```html
@defer (when card()) {
  <!-- contenido de la carta -->
} @placeholder {
  <p>Cargando...</p>
} @error {
  <p>Error al cargar la imagen</p>
}
```

- `@defer (when card())` difiere la renderización del contenido hasta que la señal `card()` sea truthy, es decir, hasta que la petición HTTP resuelva y se llame a `this.card.set(data[0])`.
- Mientras tanto muestra el bloque `@placeholder`.

### Detalle con secciones condicionales
El detalle renderiza la sección de **Estadísticas** solo si la carta tiene ATK o DEF definidos:

```html
@if (card()!.atk !== undefined || card()!.def !== undefined) {
  <section class="card-stats">...</section>
}
```

Esto es clave porque las cartas de tipo **Spell** y **Trap** no tienen estadísticas de combate, solo las de tipo **Monster**.

### Estrellas de nivel para monstruos
Para los monstruos con nivel, el componente genera dinámicamente un array de longitud `level` y renderiza una imagen de estrella por cada elemento:

```typescript
getLevelArray(level: number | undefined): number[] {
  return Array.from({ length: level ?? 0 });
}
```

### Separación de responsabilidades: `api/`
Los tipos TypeScript (`contract.ts`) y la URL base (`endpoints.ts`) están separados en la carpeta `src/app/api/`, dejando el servicio limpio y facilitando futuros cambios de API o versión.

# Duelist Codex 

## Parte 2


### 1. Angular Router con `RouterOutlet` y `routerLink`
Se implementó el sistema de enrutamiento oficial de Angular. Ahora se emplea `<router-outlet>` en el componente raíz para renderizar las vistas dinámicamente según la URL, y se utiliza la directiva `routerLink` para la navegación entre páginas, reemplazando la navegación manual.

Las rutas principales configuradas son:
- `/` — Inicio (`Home`).
- `/cards` — Listado de cartas (`Cards`).
- `/card/:id` — Detalle de una carta específica (`CardDetail`).
- `/cards/:name` — Búsqueda directa de una carta desde la URL.

### 2. Relación de rutas Padre/Hija (Child Routing)
Para la vista de detalle de la carta (`/card/:id`), se configuraron sub-vistas anidadas (_child routes_) para separar y organizar la información:
- `/card/:id/effect` — Efecto y descripción de la carta.
- `/card/:id/price` — Precios de mercado.
- `/card/:id/stats` — Estadísticas (ATK/DEF).

Estas rutas hijas se renderizan dentro de un segundo `<router-outlet>` interno en el componente `CardDetail`.

### 3. Guards Funcionales
Se implementó el guard funcional `canShowStatsFn` para condicionar el acceso a la ruta `/card/:id/stats`. Este guard verifica en la data de la ruta si la carta posee estadísticas (por ejemplo, bloqueando el acceso a cartas mágicas/trampa) y, en caso negativo, redirige automáticamente a la pestaña de efecto.

### 4. Resolvers para preparar datos
Se emplearon _resolvers_ para precargar o sincronizar datos antes de activar las rutas:
- **`cardResolver`** (en `/card/:id`): Realiza la petición a la API para traer los detalles de la carta. Si falla o la carta no existe, cancela la navegación y redirige.
- **`searchCard`** (en `/cards/:name`): Sincroniza directamente el término de búsqueda de la URL con el servicio (`CardService`), evitando el _debounce_ y permitiendo una carga de resultados directa y reactiva.

### 5. Directiva de Atributo Personalizada
Se incorporó la directiva `HighlightCard` para agregar comportamiento y estilos interactivos al listado de cartas, aislando la manipulación del DOM o clases CSS fuera de los componentes.

### 6. Pipe Personalizado
Se implementó el pipe `AddDollarSignPipe` para encargarse del formateo visual de los precios en las tarjetas, asegurando que todos los valores monetarios se muestren consistentemente (añadiendo el símbolo "$").

### 7. Uso de `resource()` vs `rxResource`
Para manejar el _fetching_ reactivo del listado de cartas en el `CardService`, se utilizó la nueva función `resource()`. Se optó por `resource()` en lugar de `rxResource` porque nuestros parámetros reactivos (búsqueda, offset, limit) tienen su origen en **Signals** y la llamada a la API está basada en promesas nativas (`fetch`). `rxResource` está diseñado para integrarse con flujos que provienen o terminan en **Observables** (por ejemplo, si se utilizara `HttpClient` o flujos complejos de RxJS).

# Duelist Codex 

## Parte 3

### 1. Uso de dos pipes personalizados
Se incorporaron dos pipes para transformar y formatear información visualmente en la interfaz:
- **`AddDollarSignPipe`**: agrega el símbolo `$` a los precios mostrados en la vista de detalle.
- **`CardEffectPipe`**: formatea el texto del efecto y los tipos asociados de las cartas.

### 2. Peticiones reactivas con `resource()`
El servicio de cartas usa la API de `resource()` de Angular para manejar la carga de datos de forma reactiva y basada en signals:
- La petición se dispara automáticamente cuando cambian los parámetros de búsqueda, paginación o filtros.
- Se aprovecha el estado de `loading` de `resource()` para mostrar loaders mientras se obtienen los datos.
- También se utiliza el estado de `error` de `resource()` para manejar fallos de la consulta de manera visual.

### 3. Búsqueda con debounce y sin botón
La búsqueda por nombre ahora funciona en tiempo real mientras el usuario escribe, sin depender de un botón de acción:
- Se implementó un flujo con `debounceTime` para evitar peticiones frecuentes.
- La actualización se sincroniza con un signal intermedio y se aplica automáticamente al cargar resultados.

### 4. Filtros combinados
Se agregaron nuevos filtros que funcionan de manera conjunta para refinar los resultados:
- **Tipo** de carta.
- **Atributo** de carta.
- **ATK**.
- **DEF**.

Cada cambio en estos filtros actualiza la consulta y reinicia la paginación para mostrar resultados coherentes desde la primera página.

### 5. Carta en foco
Se incorporó un panel lateral de **carta en foco** en la vista de listado:
- El usuario puede destacar una carta específica desde la grilla.
- La carta seleccionada se muestra en un bloque visual con acceso rápido a su detalle.

### 6. `@defer` en el detalle de carta
La vista de detalle de una carta utiliza el bloque **`@defer`** de Angular para diferir la renderización del contenido hasta que la carta ya esté disponible:
- Mientras carga, se muestra un placeholder.
- Esto mejora la experiencia de carga y evita renderizar contenido incompleto antes de tener los datos.
- Aunque de momento no se usa por que la ruta usa un resolve que no se accede hasta que la carta este lista para mostrar

