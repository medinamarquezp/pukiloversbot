# 🐶 PuKi 🐱 Lovers Bot

**PukiLovers** es un script que comparte contenido multimedia de perritos y gatitos en Redes Sociales. El flujo de eventos que se producen a la hora de realizar una publicación es el siguiente:


Como se puede observar, todo comienza por generar una instancia de un productor de manera aleatoria. Los productores son fuentes de contenido multimedia open source como Pexels, Unsplash, etc. que nutren de contenido a nuestras publicaciones.

Una vez disponemos de un productor, realizaremos peticiones de contenido multimedia aleatorio de perritos y gatitos. Estos contenidos deben pasar dos validaciones antes de ser publicados: 

- Se revisa que el contenido no haya sido publicado previamente. Para conseguir esto, almacenamos los contenidos previamente publicados en un repositorio de **Cloud Firestore**.

- Si el contenido no ha sido publicado, revisamos que no aparezcan personas (ya que solo nos interesa publicar gatitos y perretes 😉). Para esto, se hace uso de **Clarifai**, una API que ofrece diferentes modelos para el reconocimiento de imágenes.

Si el contenido pasa las validaciones, podemos publicarlo!!! En estos momentos solo se publica en **Twitter**, pero en el futuro me gustaría agregar otras redes como Pinterest o Instagram.

Cuando el contenido ha sido publicado, se almacena el registro para evitar que este sea publicado de nuevo en las próximas ejecuciones.

El despligue de la aplicación ha sido realizado en **Heroku** y la ejecución de los scrips ha sido programada en **cron-job.org**, una web fantástica que te permite configurar cron jobs con bastantes funcionalidades totalmente gratuita.

El objetivo de todo esto era testear algunas APIs con las que me apetecía jugar y montar todo el proyecto utilizando recursos totalmente gratuitos.

Si te gustan los gatitos y perritos, puedes seguirme en Twitter:
**[PukiLovers](https://twitter.com/pu_ki_lovers)**