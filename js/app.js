import { videojuegos } from './datos.js';
import {
  mostrarCatalogoHTML, ordenarPorPuntuacion, ordenarPorPrecio,
  existeCategoria, todosCumplenPrecioMinimo, filtrarPorCategoria,
  filtrarPorPuntuacionMinima, buscarPorId, buscarPorNombre,
  obtenerIndicePorId, calcularPrecioPromedio, calcularPuntuacionPromedio,
  obtenerPropiedades, objetoAEntradas, crearObjetoDesdeEntradas
} from './funciones.js';

/** Crea un elemento con texto, sin interpretar HTML. */
function crearElemento(etiqueta, texto, clase = '') {
  const elemento = document.createElement(etiqueta);
  elemento.textContent = texto;
  if (clase) elemento.className = clase;
  return elemento;
}

/** Dibuja un ranking utilizando un catálogo ya ordenado. */
function mostrarRanking(id, juegos, campo, conMedallas = false) {
  const lista = document.getElementById(id);
  lista.replaceChildren();
  const medallas = ['🥇', '🥈', '🥉'];
  juegos.slice(0, 5).forEach((juego, indice) => {
    const fila = document.createElement('li');
    const icono = conMedallas ? `${medallas[indice] || '🎮'} ` : '';
    fila.appendChild(crearElemento('span', `${icono}${juego.nombre} · ${juego.plataforma}`, 'rank-name'));
    const valor = campo === 'precio' ? `${juego.precio.toFixed(2)} €` : `${juego.puntuacion.toFixed(1)} / 10`;
    fila.appendChild(crearElemento('span', valor, 'rank-value'));
    lista.appendChild(fila);
  });
}

/** Conecta los datos y todas las operaciones del catálogo con la interfaz. */
function inicializarAplicacion() {
  document.getElementById('catalogo-lista').innerHTML = mostrarCatalogoHTML(videojuegos);
  const estadisticas = [
    ['Juegos catalogados', String(videojuegos.length)],
    ['Precio promedio', `${calcularPrecioPromedio(videojuegos).toFixed(2)} €`],
    ['Puntuación promedio', `${calcularPuntuacionPromedio(videojuegos).toFixed(1)} / 10`]
  ];
  estadisticas.forEach(([etiqueta, valor]) => {
    const tarjeta = crearElemento('article', '', 'stat-card');
    tarjeta.append(crearElemento('span', etiqueta), crearElemento('p', valor, 'stat-value'));
    document.getElementById('estadisticas-lista').appendChild(tarjeta);
  });

  mostrarRanking('ranking-puntuacion', ordenarPorPuntuacion(videojuegos), 'puntuacion', true);
  mostrarRanking('ranking-precio', ordenarPorPrecio(videojuegos), 'precio');

  const comprobaciones = [
    ['¿Existe la categoría Conducción?', existeCategoria(videojuegos, 'Conducción')],
    ['¿Existe la categoría Puzles?', existeCategoria(videojuegos, 'Puzles')],
    ['¿Todos los juegos cuestan más de 5 €?', todosCumplenPrecioMinimo(videojuegos, 5)],
    ['¿Todos los juegos cuestan más de 10 €?', todosCumplenPrecioMinimo(videojuegos, 10)]
  ];
  comprobaciones.forEach(([pregunta, resultado]) => {
    document.getElementById('verificaciones-lista').appendChild(crearElemento('li', `${pregunta} ${resultado ? 'Sí' : 'No'}.`));
  });

  const selector = document.getElementById('categoria');
  const categorias = [...new Set(videojuegos.map(juego => juego.categoria))];
  categorias.forEach(categoria => {
    const opcion = crearElemento('option', categoria);
    opcion.value = categoria;
    selector.appendChild(opcion);
  });
  function actualizarCategoria() {
    const resultados = filtrarPorCategoria(videojuegos, selector.value);
    document.getElementById('filtro-contador').textContent = `${resultados.length} juegos en ${selector.value}.`;
    document.getElementById('filtro-lista').innerHTML = mostrarCatalogoHTML(resultados);
  }
  selector.addEventListener('change', actualizarCategoria);
  actualizarCategoria();
  document.getElementById('premium-lista').innerHTML = mostrarCatalogoHTML(filtrarPorPuntuacionMinima(videojuegos, 9));

  function mostrarResultado(juego) {
    const contenedor = document.getElementById('busqueda-resultado');
    const mensaje = document.getElementById('busqueda-mensaje');
    contenedor.replaceChildren();
    if (!juego) {
      mensaje.textContent = 'No se ha encontrado ningún juego con esa consulta.';
      return;
    }
    const indice = obtenerIndicePorId(videojuegos, juego.id);
    mensaje.textContent = `${juego.nombre}: posición ${indice + 1} de ${videojuegos.length} en el catálogo original (índice ${indice}).`;
    contenedor.innerHTML = mostrarCatalogoHTML([juego]);
  }
  document.getElementById('buscar-id').addEventListener('submit', evento => {
    evento.preventDefault();
    mostrarResultado(buscarPorId(videojuegos, document.getElementById('consulta-id').value));
  });
  document.getElementById('buscar-nombre').addEventListener('submit', evento => {
    evento.preventDefault();
    mostrarResultado(buscarPorNombre(videojuegos, document.getElementById('consulta-nombre').value));
  });

  const primero = videojuegos[0];
  if (primero) {
    obtenerPropiedades(primero).forEach(propiedad => {
      document.getElementById('propiedades').appendChild(crearElemento('li', propiedad));
    });
    const entradas = objetoAEntradas(primero);
    entradas.forEach(([clave, valor]) => {
      const fila = document.createElement('tr');
      fila.append(crearElemento('td', clave), crearElemento('td', String(valor)));
      document.getElementById('entradas').appendChild(fila);
    });
    const reconstruido = crearObjetoDesdeEntradas(entradas);
    document.getElementById('objeto-reconstruido').textContent = JSON.stringify(reconstruido, null, 2);
  }
  document.getElementById('anio-actual').textContent = String(new Date().getFullYear());
}

document.addEventListener('DOMContentLoaded', inicializarAplicacion);
