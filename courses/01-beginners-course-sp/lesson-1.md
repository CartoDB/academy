---
id: 1
layout: lesson
title:  "Lección 1"
subtitle: "Creando tu primer mapa"
course: "Curso para principiantes"
course_slug: "01-beginners-course-sp"
continue_link: "lesson-2-sp"
tweet_text: "Step by step is the way to go. I've finished the first lesson of the map academy. Check it out"
vizjson: "http://documentation.cartodb.com/api/v2/viz/af43c3ea-bf46-11e3-8153-0edbca4b5057/viz.json"
---

## Creando tu primer mapa

¡Bienvenido a CartoDB Academy! En esta primera lección del Curso 1, te guiaremos a través de los pasos necesarios que te ayudarán a crear tu primer mapa. Este curso está destinado a ofrecerte una visión global y familiarizarte con algunos conceptos básicos de CartoDB. Durante el transcurso de las lecciones profundizaremos en conceptos más específicos.

Puedes seguir las lecciones de CartoDB Academy junto a los vídeos que incluímos, o seguir tu propio ritmo guiándote por las instrucciones descritas. ¡Tú eliges cómo aprender!

<p><iframe src="//player.vimeo.com/video/81019067?byline=0" width="700" height="438" frameborder="0"> </iframe></p>

### Registrando una nueva cuenta
Crear una cuenta con CartoDB es rápido y fácil; puedes dirigirte a [nuestra web,](https://cartodb.com/) y crear una nueva cuenta gratuita en cuestión de un par de minutos.

Si estás interesado en uno de nuestros planes que ofrecen más almacenamiento, u otras características, puedes consultar una lista completa de [todos los planes de CartoDB](http://cartodb.com/pricing/).

### Creando una tabla
Una vez que hayas iniciado sesión y accedas a tu dashboard, haz click en el link "common data" de la barra de menú superior. Aquí encontratás una tabla llamada "Populated places", y un signo "+" a su derecha. Haz click en alguno de los dos para copiar este dataset a tus tablas.

![Add Common Data]({{site.baseurl}}/img/course1/lesson1/commondata.png)

Una vez que el archivo se procese e importe, automáticamente serás redirigido a la vista de la tabla. Aquí puedes ver 
los datos completos que contiene la tabla. Explórala, fíjate en qué columnas hay disponibles y qué tipos de datos contiene la tabla.

Cuando explores la tabla, fíjate en la segunda columna de la izquierda llamada "`the_geom`." Contiene la información necesaria para mostrar los datos en un mapa. Sin valores en esta columna - como las coordenadas que hay en este dataset - no podrás visualizar tus datos en el mapa.

![the_geom column]({{site.baseurl}}/img/course1/lesson1/the_geom.png)

A la derecha de "Table", arriba a la izquierda de la tabla, selecciona "Map view" para empezar a diseñar tu visualización.

![Table and Map View]({{site.baseurl}}/img/course1/lesson1/table_map_view.png)

### Empezando con una visualización

En la vista de mapa ("Map view") puedes ver los mismos datos que se encuentran en la tabla, pero aquí han sido trasladados al mapa. Puedes cambiar el diseño del mapa y los iconos que representan tus datos según tus necesidades.

![Table and Map View]({{site.baseurl}}/img/course1/lesson1/mapview.png)

Para empezar, puedes echarle un vistazo a los mapas base disponibles haciendo click en el icono de mapas base que aparece debajo de "Map view". Te ofrecemos muchos para elegir, incluyendo mapas base de Google Maps y otros creados por nosotros. En futuros cursos, descubriremos cómo añadir tus propios mapas personalizados a esta lista.

![Selecting a basemap.]({{site.baseurl}}/img/course1/lesson1/basemaps.png)

Una vez que hayas seleccionado tu map avase - en este caso, hemos elegido el mapa base por defecto, "Nokia Day" - haz click en el icono del pincel de la barra de herramientas de la derecha para abrir el editor. Aquí, selecciona y configura "Category" para visualizar la columna "`adm0cap`," que contiene datos sobre qué ciudades son capitales (representadas por "1" en el mapa) y cuáles no (representadas por "NULL").

![Selecting markers.]({{site.baseurl}}/img/course1/lesson1/selectimg.png)

También puedes elegir tus propias imágenes para usarlas como marcador. Para ello, dentro del editor, localiza los iconos "IMG" que aparecen junto al "0" (ciudades no capitales) y el "1" (ciudades capitales). Haz click en cualquiera
de estos iconos "IMG" para cambiar los marcadores. Puedes usar los marcadores que te ofrecemos, o subir los tuyos propios.

![Selecting markers.]({{site.baseurl}}/img/course1/lesson1/markeroptions.png)

En este punto, todavía estamos viendo nuestros datos en la vista de mapa - todavía no tenemos una visualización que se pueda compartir. Para crear una, haz click en "Visualize" (Visualizar) en la esquina superior derecha de la página, ponle un nombre y haz click en "Create visualization" (Crear una visualización). Ahora estás preparado para compartirla a través de la opción "Share" (Compartir) que aparece en la esquina superior derecha de la página.
