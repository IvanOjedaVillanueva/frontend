# FrontEnd TFG
 FrontEnd del proyecto de final de grado de Iván Ojeda Villanueva
## Funciones
 Esto consume de la APIREST para mostrar los datos que nos proporcionan los endpoints creados en esta
 
## Tecnologías utilizadas
 - Angular Como base del proyecto
 - Bootstrap Para algunos estilos
 - CSS Para estilos más personalizados
 - WebSocket para las conversaciones
 
## Docker
Todo el proyecto esta alojado en una máquina de docker la cuál iniciamos de la siguiente manera

```
docker run -d \
  --name nombre-del-contenedor \
  -p 80:80 \
  eunpiko/eunpiko/proyecto-tfg-web:latest
```
Las variables utilizadas son las siguientes, puede cambiarlas a su gusto con -e NOMBRE_VARIABLE=VALOR

-  JWTKEY key                  (Clave segura encriptada de usuario)
-  KEYSSN a                    (Clave segura de express)
-  PORT 3000                   (Puerto de express)
-  DBHOST localhost            (Nombre del Host de la Base de datos)
-  DBPORT 27017                (Puerto de la base de datos)
-  DBUSER root                 (Usuario de la base de datos)
-  DBPASSWORD root             (Contraseña de la base de datos)

### También podemos iniciarlo con el docker-compose
```
version: '3'
services:
 tfgWEB:
    image: eunpiko/proyecto-tfg-web:latest
    ports:
      - 80:80
```
