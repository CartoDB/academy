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
Since we have interesting data that we would like map viewers to access, we are going to go over how to add interactivity. In the same right-hand pull-out tray where we have been visiting the visualization wizard, click on "infowindow," represented by a comment icon. Here you'll create the pop-ups that will appear whenever a viewer clicks on a county.

Depending on which columns you have in your table, different label options will appear in "infowindow." Each column can have its own label or display, and you can choose which you'd like to show by clicking the toggle buttons to the right of the listed column names. You can also choose from our pre-set designs or create one of your own. For now, we'll toggle on a few fields, and select a design from the dropdown menu.

![Edit polygon stroke.]({{site.baseurl}}/img/course1/lesson2/infowindow.png)


### Mapa de coropletas

If you would like to display your polygon data differently, a frequently-used and very useful type of map is the choropleth map, which takes numerical data in your table and formats your polygons based on this information.

To explore it, return to "wizards" in the right-hand pull-out tray and select "Choropleth" from the available visualizaton wizards. 

![Edit polygon stroke.]({{site.baseurl}}/img/course1/lesson2/choropleth.png)

CartoDB will now automatically choose a table column to display on the map. In our example you can see that it will select the `pop` column to display the populations of U.S. counties. CartoDB will also automatically add a legend that corresponds with what is displayed.

In the column selector you can change the table column that CartoDB maps onto the choropleth map, but remember that only columns with numerical data can be used in such a map. With this particular table data you can go ahead and change the column to show `pop_sqkm`, which maps population data per square kilometer. This information represents population density, unlike the `pop` column, which is just a raw number.

In the "choropleth" visualization you can also change the fill colors, county borders, and color opacity, just like you could in the "simple" visualization. Go ahead and play around with these!

As always, once you click "vizualize" in the upper right to publish your map, you can share it using the "share" button that will appear in this button's place. Remember that you can only share published visualizations, not the "Map view" of a table.
