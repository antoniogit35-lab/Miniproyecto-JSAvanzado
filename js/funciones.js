/** Escapa texto para insertarlo en HTML. @param {unknown} valor @returns {string} */
function escaparHTML(valor) {
  const entidades = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(valor).replace(/[&<>"']/g, caracter => entidades[caracter]);
}

/** Genera tarjetas sin modificar el DOM ni el catálogo. @param {Object[]} array @returns {string} */
export function mostrarCatalogoHTML(array) {
  return array.map(juego => `
    <article class="card">
      <img class="cover" src="assets/img/frontpages/${encodeURIComponent(juego.portada)}" alt="Portada de ${escaparHTML(juego.nombre)}" loading="lazy" width="300" height="400">
      <h3>${escaparHTML(juego.nombre)}</h3>
      <p class="subtitle">${escaparHTML(juego.plataforma)} · ${escaparHTML(juego.anio)}</p>
      <dl class="meta">
        <div><dt>ID</dt><dd>${escaparHTML(juego.id)}</dd></div>
        <div><dt>Categoría</dt><dd>${escaparHTML(juego.categoria)}</dd></div>
        <div><dt>Precio</dt><dd>${juego.precio.toFixed(2)} €</dd></div>
        <div><dt>Puntuación</dt><dd>${juego.puntuacion.toFixed(1)} / 10</dd></div>
      </dl>
    </article>
  `).join('');
}

/** Ordena una copia por puntuación descendente. @param {Object[]} array @returns {Object[]} */
export function ordenarPorPuntuacion(array) {
  return [...array].sort((a, b) => b.puntuacion - a.puntuacion);
}

/** Ordena una copia por precio ascendente. @param {Object[]} array @returns {Object[]} */
export function ordenarPorPrecio(array) {
  return [...array].sort((a, b) => a.precio - b.precio);
}

/** Comprueba una categoría ignorando espacios exteriores y mayúsculas. @param {Object[]} array @param {string} categoria @returns {boolean} */
export function existeCategoria(array, categoria) {
  return array.some(juego => juego.categoria.trim().toLowerCase() === categoria.trim().toLowerCase());
}

/** Comprueba que todos los precios superan estrictamente el umbral; en un array vacío devuelve true. @param {Object[]} array @param {number} precio @returns {boolean} */
export function todosCumplenPrecioMinimo(array, precio) {
  return array.every(juego => juego.precio > precio);
}

/** Filtra por categoría ignorando espacios exteriores y mayúsculas. @param {Object[]} array @param {string} categoria @returns {Object[]} */
export function filtrarPorCategoria(array, categoria) {
  return array.filter(juego => juego.categoria.trim().toLowerCase() === categoria.trim().toLowerCase());
}

/** Incluye los juegos que alcanzan la puntuación mínima. @param {Object[]} array @param {number} puntuacion @returns {Object[]} */
export function filtrarPorPuntuacionMinima(array, puntuacion) {
  return array.filter(juego => juego.puntuacion >= puntuacion);
}

/** Busca un ID exacto; devuelve undefined si no existe. @param {Object[]} array @param {string} id @returns {Object|undefined} */
export function buscarPorId(array, id) {
  return array.find(juego => juego.id === id.trim());
}

/** Busca la primera coincidencia parcial por nombre, sin distinguir mayúsculas. Una consulta vacía devuelve undefined. @param {Object[]} array @param {string} nombre @returns {Object|undefined} */
export function buscarPorNombre(array, nombre) {
  const termino = nombre.trim().toLowerCase();
  if (!termino) return undefined;
  return array.find(juego => juego.nombre.toLowerCase().includes(termino));
}

/** Obtiene el índice desde cero; devuelve -1 si el ID no existe. @param {Object[]} array @param {string} id @returns {number} */
export function obtenerIndicePorId(array, id) {
  return array.findIndex(juego => juego.id === id.trim());
}

/** Calcula el precio promedio sin redondearlo; devuelve 0 para un array vacío. @param {Object[]} array @returns {number} */
export function calcularPrecioPromedio(array) {
  if (array.length === 0) return 0;
  let total = 0;
  array.forEach(juego => { total += juego.precio; });
  return total / array.length;
}

/** Calcula la puntuación promedio sin redondearla; devuelve 0 para un array vacío. @param {Object[]} array @returns {number} */
export function calcularPuntuacionPromedio(array) {
  if (array.length === 0) return 0;
  let total = 0;
  array.forEach(juego => { total += juego.puntuacion; });
  return total / array.length;
}

/** Obtiene las claves propias enumerables del objeto. @param {Object} objeto @returns {string[]} */
export function obtenerPropiedades(objeto) {
  return Object.keys(objeto);
}

/** Convierte el objeto en pares de clave y valor. @param {Object} objeto @returns {Array<[string, *]>} */
export function objetoAEntradas(objeto) {
  return Object.entries(objeto);
}

/** Construye un objeto nuevo desde pares de clave y valor. @param {Array<[string, *]>} entradas @returns {Object} */
export function crearObjetoDesdeEntradas(entradas) {
  return Object.fromEntries(entradas);
}
