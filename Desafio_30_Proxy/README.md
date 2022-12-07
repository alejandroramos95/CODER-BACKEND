# Configuracion de Nginx 1.20.2
1. La carpeta public ubicada dentro de la carpeta llamada **server** debe ser copiada dentro de la carpeta de Nginx.
# Comandos por terminal
Para inciar el servidor debemos tener instalado PM2 ya sea globalmente localmente para la carpeta. A continuación se muestra la diferencia de uso de los comandos entre global y local:
- local:
<code>npm pm2 start ...</code>
- global:
<code>pm2 start ...</code>
## Iniciar el servidor forker
Iniciamos el servidor principal con el siguiente comando:<br>
<code>pm2 start server.js --name="ServerForker" --watch -- -p PORT</code><br>
Después de inciar el servidor Forker iniciaremos los Clusters con los sigueintes comandos:
- Para la ruta info:<br>
<code>pm2 start server.js --name="ServerClusterInfo" -i 1 --watch -- -p 8081</code>
- Para la ruta api/random:<br>
<code>pm2 start server.js --name="ServerClusterRandom" -i 1 --watch -- -p 8082</code>
<code>pm2 start server.js --name="ServerClusterRandom1" -i 1 --watch -- -p 8083</code>
<code>pm2 start server.js --name="ServerClusterRandom2" -i 1 --watch -- -p 8084</code>
<code>pm2 start server.js --name="ServerClusterRandom3" -i 1 --watch -- -p 8085</code>
