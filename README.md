# Estudio de la Librería inputmask

Repositorio creado para el estudio y consulta de la [libreria inputmask](https://github.com/RobinHerbots/Inputmask#via-inputmask-class)

# Instalación:

> NOTA: Para este proyecto es necesario tener instalado [node.js](https://nodejs.org/es/) en su equipo local, se recomienda la version 14 o superior.

1. Clonar este repositorio en su equipo local:
    ~~~
    git clone https://github.com/LeonardoMercado/estudio_inputmask.git
    ~~~
2. Digirirse a la carpeta ```estudio_inputmask``` y descargar las dependencias necesarias para el proyecto con los comandos:
    ~~~ 
    cd estudio_inputmask
    npm install
    ~~~
3. Correr el proyecto con el comando: 
   ~~~
   npx http-server
   ~~~
4. Abrir en su explorador preferido la direccion: [localhost:8080](http://127.0.0.1:8080)

# Notas:


#### Definiciones de enmascaramiento predeterminadas:
Use algunas de estas definiciones para elaborar la mascara deseada:
- ```9``` : Para cualquier valor numerico.
- ```a``` : Para cualquier valor alfabético.
- ```*``` : Para cualquier valor alfanumerico.

Nota: Si necesita usar alguno de estos caracteres como valor estatico dentro de su mascara, escapelo con ```\\```.

#### Tipos de Enmascaramiento:
##### Mascaras Estaticas:
La máscara está definida y no cambiará durante la entrada. Por ejemplo:
~~~
$(document).ready(function(){
  $(selector).inputmask("aa-9999");
  $(selector).inputmask({mask: "aa-9999"});
});
~~~
La mascara ```aa-9999``` declara que solo admita dos valores alfabeticos, seguido por un guion y 4 numeros. Si declara la mascara de la siguiente manera: ```AA-9999```, el formato del valor alfabetico se pondra en mayusculas automaticamente. 

##### Mascaras Opcionales:
Es posible definir algunas partes en la máscara como opcionales. Esto se hace usando ```[ ]```.

~~~
$('#test').inputmask('(99) 9999[9]-9999');
~~~

Esta máscara permitirá entradas como (99) 12345-9999 o (99) 1234-9999. Note que el segundo conjunto de numeros pueden ser entre 4 y 5 numeros.

otros ejemplos:
- Input => 12123451234 con mascara => (12) 12345-1234 (completo)
- Input => 121234-1234 con mascara => (12) 1234-1234 (completo)
- Input => 1212341234 con mascara => (12) 12341-234_ (incompleto)

###### Mascaras Opcionales, opcion greedy:

Al definir una máscara opcional junto con la opción ```greedy: false```, la máscara de entrada mostrará primero la máscara más pequeña posible como entrada.

Por ejemplo, La mascara definica de la siguiente manera:
~~~
Inputmask({
    mask: "9[-9999]", 
    greedy: false,
  }).mask("#basicoPruebas");
~~~

mostrará:
![input sin greedy](https://i.imgur.com/OZ6d9Ra.png)

Pero al definir la opcion de ```greedy: true``` 
~~~
Inputmask({
    mask: "9[-9999]", 
    greedy: true,
  }).mask("#basicoPruebas");
~~~

mostrará:
![input sin greedy](https://i.imgur.com/Od86niN.png)

Por defecto la opcion de ```greedy``` esta en false.

#### Máscaras dinámicas:

Las máscaras dinámicas pueden cambiar durante la entrada. Para definir una parte dinámica use ```{ }```.

{n} => n repeticiones {n|j} => n repeticiones, con j [jitmasking](#jitMasking) {n,m} => de n a m repeticiones {n,m|j} => de n a m repeticiones, con j [jitmasking](#jitMasking)

También se permiten {+} y {*}. + empezar desde 1 y * empezar desde 0.

Por ejemplo, la mascara definida como:
~~~
Inputmask({
    mask: "aa-9{4}",
  }).mask("#basicoPruebas");
~~~

Se debera ingresar dos caracteres alfabeticos seguidos de un guion y 4 numeros.

- Input => ab3232 con mascara => ab-3232 (completo)
- Input => cd-1234 con mascara => cd-1234 (completo)
- Input => ef234 con mascara => ef-234_ (incompleto)

Otra forma de ver esta mascara es: ```aa-9999```, este es el equivalente de esta mascara dinamica en mascara estatica.

Otro ejemplo:
~~~
Inputmask({
    mask: "aa-9{1,4}",
  }).mask("#basicoPruebas");
~~~

Se debera ingresar dos caracteres alfabeticos seguidos de un guion y entre 1 hasta 4 numeros.

- Input => ab3232 con mascara => ab-3232 (completo)
- Input => cd-12 con mascara => cd-12 (completo)
- Input => ef con mascara => ef-_ (incompleto)

Otra forma de ver esta mascara es: ```aa-9[9][9][9]```, este es el equivalente de esta mascara dinamica en mascara opcional.

#### Máscaras de alternador:

La sintaxis del alternador es como una declaración OR. La máscara puede ser una de las opciones especificadas en el alternador.

Para definir un alternador use el ```|```. Por ejemplo: 
- ```"a|9"``` => a o 9 
- ```"(aaa)|(999)"``` => aaa o 999 
- ```"(aaa|999|9AA)"``` => aaa o 999 o 9AA
- ```"aaaa|9999"``` => aaa a o 9 999

Ejemplo:
~~~
Inputmask({
    mask:"(99.9)|(X)",
    definitions: {
      "X": {
        validator: "[xX]",
        casing: "upper"
      }
    }
  }).mask("#alternadorEjemplo");
~~~

Se debe ingresar dos numeros seguidos de un punto y otro numero, **O** ingresar una X. La definicion dentro de la declaracion, valida que si se ingresa una x o X se tome como entrada y se convierte a MAYUSCULAS.

Otra forma de declara esta mascara es:
~~~
Inputmask({
    mask: ["99.9", "X"],
    definitions: {
      "X": {
        validator: "[xX]",
        casing: "upper"
      }
    }
  }).mask("#basicoPruebas");
~~~

#### Máscaras de Preprocesamiento:

Puede definir la máscara como una función que le permite preprocesar la máscara resultante. Ejemplo de clasificación de varias máscaras o recuperación de definiciones de máscaras dinámicamente a través de ajax. El preprocesamiento de la función debe devolver una definición de máscara válida. Es decir, podemos ejecutar una funcion dentro de la definicion del objeto tipo mascara el cual debe devolver una mascara valida para el input.

Ejemplo:
~~~
const MAX_VALUE_CO = 3;
const MAX_VALUE_OTHERS = 6;
const PAIS = 'CO';
Inputmask({
  mask: function () { 
    let mascara = '';
    let paisActual = $('#mascaraFuncion').attr('data');
    if(PAIS === paisActual){
      mascara = `AAA-9{${MAX_VALUE_CO}}`;
    } else {
      mascara = `AAA-9{${MAX_VALUE_OTHERS}}`;
    }
    return [mascara]; 
  }
}).mask("#mascaraFuncion");
~~~

Si la data del input ```mascaraFuncion``` es CO se mostrará:
![mascaraCO](https://i.imgur.com/0tdg3jP.png)

Caso contrario mostrará:
![mascaraCO](https://i.imgur.com/K692HTb.png)

<a name="jitMasking"></a>
#### Enmascaramiento JIT:

Enmascaramiento justo a tiempo (JIT => Just In Time). Con la opción ```jitMasking```, puede habilitar el enmascaramiento jit. La máscara solo será visible para los caracteres ingresados por el usuario. de manera predeterminada ```jitMasking``` es falso. El valor puede ser ```true```, ```false```, o un número de umbral, por ejemplo ```5```.

Es decir, el atributo ```jitMasking``` controla si la mascara se muestra por defecto o no, tambien se puede mostrar hasta una cantidad de caracteres definidos por el umbral pasado como parámetro.

Por ejemplo:
~~~
Inputmask({
  mask: "999-999-9999",
  jitMasking: false,
}).mask("#mascaraJIT");
~~~

mostrará:
![jitMaskingFalse](https://i.imgur.com/6VYbsv3.png)

Pero si activamos el actributo jitMasking:
~~~
Inputmask({
  mask: "999-999-9999",
  jitMasking: true,
}).mask("#mascaraJIT");
~~~

mostrará:
![jitMaskingTrue](https://i.imgur.com/uAaJa4z.png)

y al ingresar valores en el input se aplicara la mascara al momento de ingresar cada valor, de forma que se verá así:
![jitMaskingFull](https://i.imgur.com/MoWFNLy.png)


Tambien podemos definir un umbral para que la mascara se renderize, y despues de dicho umbras sera just in time:

Por ejemplo:

~~~
Inputmask({
  mask: "999-999-9999",
  jitMasking: 5,
}).mask("#mascaraJITUmbral");
~~~

mostrará:
![jitmaskingUmbral](https://i.imgur.com/3ZpEecX.png)





---
Revisar alias de la libreria:
| Alias        | Descripción                                                                                                                                                                                                                                                                                            |
|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| decimal      | Permite ingresar números decimales con un punto decimal.                                                                                                                                                                                                                                            |
| integer      | Permite ingresar solo números enteros.                                                                                                                                                                                                                                                              |
| alphanumeric | Permite ingresar caracteres alfanuméricos (letras y números).                                                                                                                                                                                                                                   |
| currency     | Permite ingresar números con formato moneda, con un símbolo de moneda opcional y separador de miles opcional.                                                                                                                                                                                  |
| email        | Valida que el input sea un email válido                                                                                                                                                                                                                                                         |
| ip           | Permite ingresar una dirección IP v4.                                                                                                                                                                                                                                                             |
| mac          | Permite ingresar una dirección MAC.                                                                                                                                                                                                                                                              |
| url          | Permite ingresar una url válida.                                                                                                                                                                                                                                                                 |
| date         | Permite ingresar una fecha con un formato específico.                                                                                                                                                                                                                                             |
| phone        | Permite ingresar un número de teléfono con un formato específico.                                                                                                                                                                                                                             |
| time         | Permite ingresar una hora con un formato específico.                                                                                                                                      



# Conclusiones:

Existen tres caracteres especiales para definir las mascaras, los cuales son:
- ```9```:Permite ingresar cualquier valor numerico.
- ```a``` | ```A```:Permite ingresar cualquier valor alfabetico. | permite ingresar cualquier valor alfabetico y lo convierte a MAYUSCULAs.
- ```*```:Permite ingresar cualquier valor alfanumerico.

Si se necesitan estos caracteres para una mascara en particular, se deben escapar con ```\\```

# Autor
[**Ing. Leonardo Fabio Mercado Benítez**](https://www.linkedin.com/in/leonardofabiomercadobenitez/)
