# proyect-iot
Ejemplo de comunicacion para un proyecto de iot con docker y NodeJS

Se utiliza un contenedor para cada componente del proyecto
* measure-service: componente encargado de la lectura de un sensor (en este caso temperatura)
* broker-service: componente encargado de la comunicacion mediante el protocolo MQTT
* storage-service: componente encargado del storage de las mediciones (se utilizo Influxdb)
* se agrega un componente encargado de visualizar los datos (Grafana)

