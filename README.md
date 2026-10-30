# Biblioteca de videojuegos

## Descripción

Aplicación web desarrollada para el miniproyecto de la unidad 3 de
Desarrollo Web en Entorno Cliente.

Permite consultar un catálogo de 12 videojuegos, filtrar por categoría,
buscar por identificador o nombre, consultar estadísticas y mostrar
rankings por precio y puntuación.

La temática está basada en mi proyecto personal de biblioteca de
preservación de videojuegos, adaptado a los requisitos de esta práctica.

Los precios y las puntuaciones son ficticios y se utilizan únicamente
como datos de demostración.

## Tecnologías utilizadas

- HTML5.
- CSS3 con diseño responsive.
- JavaScript con módulos ES6, utilizando import y export.

## Instalación y ejecución

La aplicación no requiere instalar dependencias, configurar una base de
datos ni realizar un proceso de compilación.

Para ejecutarla con Visual Studio Code y Live Server:

1. Descomprimir el archivo ZIP.
2. Abrir la carpeta del proyecto en Visual Studio Code.
3. Instalar la extensión Live Server si no está instalada.
4. Hacer clic derecho sobre index.html y seleccionar
   «Open with Live Server».
5. La aplicación se abrirá en el navegador.

Es necesario utilizar un servidor local porque la aplicación utiliza
módulos JavaScript. No debe ejecutarse abriendo index.html directamente
mediante doble clic.

También puede utilizarse otro servidor HTTP local que sirva la carpeta
del proyecto.

## Estructura del proyecto

- index.html: estructura de la página y secciones de la aplicación.
- styles/styles.css: estilos y adaptación a dispositivos móviles.
- js/datos.js: array exportado con los datos de los videojuegos.
- js/funciones.js: funciones de consulta, ordenación, filtrado y análisis.
- js/app.js: eventos e interacción con el DOM.
- assets/img/: logo, favicon y portadas.
- README.md: descripción e instrucciones de ejecución.

## Funcionalidades

- Visualización del catálogo completo.
- Cálculo del precio y la puntuación promedio.
- Top 5 de videojuegos mejor valorados.
- Verificaciones de categorías y precios.
- Filtro por categoría con contador de resultados.
- Selección de juegos con puntuación igual o superior a 9.
- Búsqueda por ID exacto o primera coincidencia parcial por nombre.
- Visualización de la posición del resultado en el catálogo.
- Análisis de propiedades y reconstrucción de objetos.
- Top 5 de videojuegos más económicos.
