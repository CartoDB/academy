---
id: 2
layout: lesson
title:  "Lección 2"
subtitle: "Tu primer mapa de coropletas"
course: "Curso para principiantes"
course_slug: "01-beginners-course-sp"
continue_link: "lesson-3"
tweet_text: "Step by step is the way to go. I've finished the second lesson of the map academy. Check it out"
vizjson: "http://documentation.cartodb.com/api/v2/viz/af43c3ea-bf46-11e3-8153-0edbca4b5057/viz.json"
---

## Tu primer mapa de coropletas

<p><iframe src="//player.vimeo.com/video/81042811?byline=0" width="700" height="438" frameborder="0"> </iframe></p>

Para crear tu primer mapa de coropletas, usarás los datos de la población de los estados de EEUU. Para empezar, copia el siguiente link:

~~~javascript
http://acdmy.org/d/counties.zip
~~~

Ahora, ve a tu dashboard de CartoDB.  

Si te saltaste la lección 1 del Curso para principiantes, y por lo tanto no has creado todavía ninguna visualización o tabla, estarás automáticamente en la sección "tablas" de tu dashboard, como podrás comprobar en la barra de menú superior. Haz scroll hacia abajo y haz click en el botón verde que aparece debajo del vídeo: "Create your first table" (Crea tu primera tabla).

Si ya has creado alguna visualización o tabla y no estás ya en la sección "tablas" de tu dashboard, entra a través del link "tables" de la barra de menú superior. Después, haz click en "New table" o el símbolo "+" que aparece a la derecha de tus tablas ya existentes.

En el cuadro de diálogo que aparece, pega el link que copiaste anteriormente en el cuadro de texto, y haz click en "Create table". 

![Add data from a link]({{site.baseurl}}/img/course1/lesson2/newtableURL.png)

Tus datos se mostrarán en la vista de tabla. Aquí, como te recomendamos en la lección 1 del Curso para principiantes, puedes echar un vistazo a las diferentes columnas. Fíjate en que esta vez la columna `the_geom` indica valores "Polygon" (Polígono). Esto significa que la geometría que CartoDB usará en el mapa será un polígono.

### Creando una visualización simple

En la lección 1 hicimos una breve introducción a cómo crear una visualización. Volveremos a revisar este concepto y después avanzaremos hacia la creación de visualizaciones más complejas.

Navega a través de la vista de mapa "Map view" para empezar a darle formato a tu mapa. El primer parámetro que puedes editar es el mapa base; como en la lección 1, usaremos el mapa base por defecto "Nokia Day", pero puedes seleccionar cualquiera que te guste.

Ahora, en la barra de edición de la derecha, haz click en "wizards", representado por el icono en forma de pincel. Aquí puedes cambiar el relleno del polígono y el trazo exterior.

![Edit polygon fill.]({{site.baseurl}}/img/course1/lesson2/polygonfill.png)

El menú de configuración también te permite elegir entre diferentes tipos de visualizaciones, los cuales exploraremos a lo largo de esta lección.

### Añadiendo interactividad
Como tenemos datos interesantes y nos gustaría que quienes vean el mapa puedan acceder a ellos, vamos a aprender cómo añadir interactividad al mapa. En la misma barra de edición en la que hemos configurado nuestra visualización, haz click en "infowindow", representado por un icono de un comentario. Aquí crearás los pop-ups (diálogos emergentes) que aparecerán cuando alguien haga click en un estado.

Dependiendo de las columnas que haya en tu tabla, diferentes opciones de etiquetado aparecerán en "infowindow". Cada columna puede tener su propio título o etiqueta, y puedes elegir cuáles te gustaría mostrar activando los botones que aparecen a la derecha de los nombres de las columnas. Puedes también elegir nuestros diseños predeterminados o crear el tuyo propio. Por ahora, seleccionaremos algunos campos a mostrar y un diseño en el menú desplegable.

![Edit polygon stroke.]({{site.baseurl}}/img/course1/lesson2/infowindow.png)


### Mapa de coropletas

Si quieres mostrar tus polígonos de otra manera, una opción muy usada y un tipo muy útil de mapa es el mapa de coropletas (Choropleth map), el cual usa datos numéricos de tu tabla y da formato a los polígonos basándose en esa información.

Para explorar esta opción, vuelve a "wizards" en la barra de herramientas, y selecciona "Choropleth" de entre las opciones de visualización disponibles.

![Edit polygon stroke.]({{site.baseurl}}/img/course1/lesson2/choropleth.png)

CartoDB elegirá automáticamente una columna de la tabla para mostrar el mapa. En nuestro ejemplo puedes comprobar que se ha seleccionado la columna `pop` para mostrar la población de los estados de EEUU. CartoDB añadirá también automáticamente una leyenda que se corresponderá con los datos que se muestran en el mapa.

En el selector de columna puedes cambiar la columna de la tabla que CartoDB utiliza para crear el mapa de coropletas, pero recuerda que sólo puedes usar columnas con datos numéricos en este tipo de mapa. Si estás usando esta tabla en particular, puedes cambiar la columna para mostrar `pop_sqkm`, que representa los datos de población por metro cuadrado. Esta información representa la densidad de población, al contrario que la columna `pop`, que simplemente muestra los valores totales.

En la visualización de coropletas también puedes cambiar los colores de relleno de los polígonos, los bordes de los estados, y la opacidad de los colores, al igual que vimos previamente con el mapa simple. ¡Modifica la visualización a tu gusto!

Como siempre, una vez que hagas click en "Visualize" en la esquina superior derecha para publicar el mapa, puedes compartirlo usando la opción "Share" que aparecerá en su lugar. Recuerda que sólo puedes compartir visualizaciones ya publicadas, no la vista de mapa ("Map view") de una tabla.