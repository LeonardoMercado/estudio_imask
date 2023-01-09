# Estudio de la Librería inputmask

Repositorio creado para el estudio y consulta de la [libreria inputmask](https://github.com/RobinHerbots/Inputmask#via-inputmask-class)

# Instalación

> NOTA: Para este proyecto es necesario tener instalado [node.js](https://nodejs.org/es/) en su equipo local, se recomienda la version 14 o superior.

1. Clonar este repositorio en su equipo local:
     - ```git clone https://github.com/LeonardoMercado/estudio_inputmask.git```
2. Digirirse a la carpeta ```estudio_inputmask``` y descargar las dependencias necesarias para el proyecto con los comandos:
      - ~~~ 
        $ cd estudio_inputmask
        $ npm install
        ~~~
3. Correr el proyecto con el comando: ```npx http-server```
4. Abrir en su explorador preferido la direccion: [localhost:8080](http://127.0.0.1:8080)

# Notas


#### Definiciones de enmascaramiento predeterminadas:
Use algunas de estas definiciones para elaborar la mascara deseada:
- ```9``` : Para cualquier valor numerico.
- ```a``` : Para cualquier valor alfabético.
- ```*``` : Para cualquier valor alfanumerico.

Por ejemplo, para declarar una mascara que solo admita dos valores alfabeticos, seguido por un guion y 4 numeros use: ```aa-9999```.
Si declara la mascara de la siguiente manera: ```AA-9999```, el formato del valor alfabetico se pondra en mayusculas automaticamente. Esta mascara se puede resumir en: ```A{1,2}-9{4}``` y tendra el mismo comportamiento. La parte ```A{1,2}``` indica que se admite entre 1 a 2 valores alfabeticos, y ```9{4}``` indica que se admite 4 numeros.

Tambien es posible declarar valores como opcionales, para esto utilize ```[]```, por ejemplo: la mascara ```a[a]-9999``` solo admitira uno o dos valores alfabeticos, seguido por un guion y 4 numeros, es decir, el segundo caracter al inicio tiene que ser alfabetico pero es opcional.

Nota: Si necesita usar alguno de estos caracteres como valor estatico dentro de su mascara, escapelo con ```\\```.

#### Adicionales para las mascaras con opcionales: 
- ```clearMaskOnLostFocus: true```: Evita que la parte opcional de la mascara se muestre en el placeholder. Una vez se llena algun valor opcional se muestra la mascara entera.
- ```greedy: false```: igual que clearMaskOnLostFocus.

# Autor
[**Ing. Leonardo Fabio Mercado Benítez**](https://www.linkedin.com/in/leonardofabiomercadobenitez/)
