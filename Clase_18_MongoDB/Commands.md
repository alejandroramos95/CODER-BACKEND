## Crear el motor de BD en una carpeta específica
`mongod --dbpath "./DBMongo"`

## Acceder al motor de BD
`mongosh`

## Usar una BD
`use ecommerce;`

## Crear una colección mensajes e ingresar varios documentos
`db.mensajes.insertMany([{"message":"nisl venenatis lacinia aenean sit amet justo morbi ut odio cras","email":"dpennycord0@apple.com","dateTime":"5/19/2022","UID":"eede01a7-6f2a-49ed-98cf-ce7102d679c4"},{"message":"odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue","email":"ksouthouse1@rediff.com","dateTime":"3/22/2022","UID":"9a6f861b-93f6-4c32-872b-14daf680fdd7"},{"message":"amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras","email":"lwiggin2@nydailynews.com","dateTime":"10/28/2021","UID":"aced82be-b15d-4371-8693-3efd8bc2b89b"},{"message":"mi in porttitor pede justo eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea","email":"ctuxsell3@tinyurl.com","dateTime":"9/29/2022","UID":"af148338-73f0-4c72-ac9c-e62d35d924b2"},{"message":"vel est donec odio justo sollicitudin ut suscipit a feugiat et","email":"lscherer4@fotki.com","dateTime":"6/16/2022","UID":"a8a3a150-f3a7-495e-9294-1a70c5fc6525"},{"message":"massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia","email":"tgormley5@aboutads.info","dateTime":"1/27/2022","UID":"fe6cc2f9-c23d-4ef3-b9f3-0440641101e9"},{"message":"curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat","email":"pteaz6@columbia.edu","dateTime":"10/16/2022","UID":"a7964bda-cdda-449f-b05f-982d67b06ca7"},{"message":"sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus","email":"jcarlsen7@upenn.edu","dateTime":"3/22/2022","UID":"2cd56574-a8ca-4c62-98ba-aed413436cb9"},{"message":"nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel","email":"npolson8@ycombinator.com","dateTime":"5/23/2022","UID":"db2aded1-3275-41d4-af09-a5440410b8e3"},{"message":"sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend","email":"mcolter9@ameblo.jp","dateTime":"8/12/2022","UID":"4a0ba381-b867-4b50-9671-53057c421d71"}])`

### Mostrar los documentos de la coleción mensajes
`db.mensajes.find();`

## Crear una colección productos e ingresar documentos
`db.productos.insertMany([{"tittle":"Nantucket Cranberry Juice","price":2777,"thumbnail":"http://dummyimage.com/231x100.png/ff4444/ffffff"},{"tittle":"Towel Dispenser","price":4162,"thumbnail":"http://dummyimage.com/166x100.png/dddddd/000000"},{"tittle":"Soup - Campbells Beef Strogonoff","price":3975,"thumbnail":"http://dummyimage.com/237x100.png/ff4444/ffffff"},{"tittle":"Carrots - Purple, Organic","price":3598,"thumbnail":"http://dummyimage.com/130x100.png/5fa2dd/ffffff"},{"tittle":"Chervil - Fresh","price":570,"thumbnail":"http://dummyimage.com/141x100.png/cc0000/ffffff"},{"tittle":"Mushrooms - Honey","price":785,"thumbnail":"http://dummyimage.com/244x100.png/dddddd/000000"},{"tittle":"Venison - Ground","price":937,"thumbnail":"http://dummyimage.com/121x100.png/dddddd/000000"},{"tittle":"Soup - Canadian Pea, Dry Mix","price":4686,"thumbnail":"http://dummyimage.com/227x100.png/cc0000/ffffff"},{"tittle":"Cheese - Woolwich Goat, Log","price":1206,"thumbnail":"http://dummyimage.com/188x100.png/dddddd/000000"},{"tittle":"The Pop Shoppe - Root Beer","price":2809,"thumbnail":"http://dummyimage.com/239x100.png/ff4444/ffffff"}]);`

### Mostrar los documentos de la colección productos
`db.productos.find();`

## Mostrar cantidad de documentos en una colección
### Para mensajes:
`db.mensajes.countDocuments();`
### Para productos:
`db.productos.countDocuments();`

# CRUD sobre la colección productos
## Agregar un producto más a la colección
`db.productos.insertOne({"tittle": "Cookies - Englishbay Oatmeal","price": 2221,"thumbnail": "http://dummyimage.com/165x100.png/cc0000/ffffff"})`
## Consulta por nombre de prodcuto específico:
### Listar los productos con precio menor a 1000
`db.productos.find({ price: { $lt: 1000 } });`
### Listar los productos con precio entre 1000 a 3000
`db.productos.find({price: { $gte: 1000, $lte: 3000 } } );`
### Listar los productos con precio mayor a 3000
`db.productos.find({ price: { $gt: 3000 } });`
### Consulta que traiga solo el nombre del tercer producto más barato
`db.productos.findOne({ price: { $lt: 1000 } }, {"tittle":1,"_id":0});`
## Actualizar todos los productos agregando el campo "stock" con un valor de 100
`db.productos.update({}, { $set: {"stock": 100} }, {upsert:0, multi:1});`
## Cambiar el stock a 0 de los productos con precios mayores a 4000
`db.productos.update({ "price": {$gt: 4000} }, { $set: {"stock":0} }, { upsert: 0, multi: 1});`
## Eliminar los productos con precio menor a 1000
`db.productos.remove({ "price": {$lt: 1000} });`
# Crear un usuario
El usuario solo debe leer la BD llamada _ecommerce_ y no debe tener el privilegio de cambiar la información.<br>
### Credenciales:
- Usuario: pepe
- Contraseña: asd456<br>

<code>
db.createUser({ user: "pepe", pwd: "asd456", roles: [{ role: "read", db: "ecommerce" }] });<br>
db.auth("pepe", "asd456")
</code>
