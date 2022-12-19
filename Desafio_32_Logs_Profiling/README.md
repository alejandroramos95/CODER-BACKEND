# Comandos por terminal
Para inciar el servidor debemos tener instalado PM2 ya sea globalmente localmente para la carpeta. A continuación se muestra la diferencia de uso de los comandos entre global y local:
- local:
<code>npm pm2 start ...</code>
- global:
<code>pm2 start ...</code>
## Iniciar el servidor forker
Iniciamos el servidor principal con el siguiente comando:<br>
1. <code>pm2 start server.js --name="ServerForker"</code>
1. En otra consola: <code>npm artillery quick -c 50 -n 20 "http:/localhost:8080/info" > artillery.txt</code>
1. Detenemos el servidor con <code>pm2 kill</code>.
1. En el archivo <code>package.json</code>, en scripts, luego start, cambiamos node por <code>0x</code>
1. <code>npm start</code>
1. En otra consola: <code>npm run test</code>
