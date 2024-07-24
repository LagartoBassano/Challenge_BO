# Challenge_BO
Challenge para Build Online, Germán Bassano.

Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas:
- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [PostgreSQL](https://www.postgresql.org/) (para la base de datos)
- [Postman](https://www.postman.com/) (para probar los endpoints de la API)

## Instalación y Configuración

Sigue estos pasos para configurar y ejecutar el proyecto:

1. **Clonar el Repositorio**

Abre tu terminal y clona el repositorio con git clone.

2. **Instalar node

Navegar hasta la carpeta Backend del proyecto y ejecutar npm install

3. **Configurar DB

Habiendo ejecutado el egine de postgre, craer una conexión en un cliente como DBeaver, por ejemplo, y conseguir el URL de la db (ej:  "postgresql://germanbassano:@localhost:5432/contact_management_db?schema=public").

4. **Configurar el archivo .env

En el archivo .env generado, agregar las dos variables de entorno:
DATABASE_URL=tu_db_url
JWT_SECRET_KEY=tu_clave_secreta

6. **Ejecutar migraciones

npx prisma migrate dev --name nombre-migracion
npx prisma db seed
npx prisma generate

6. **Iniciar servidor

npm run build
npm start

## Para usar la api con cliente Postman:

De momento solo el backend está implementado, así que se puede usar postman como cliente para probar los endpoints.
Una vez ejecutado start, la consola mostrará si se está ejecutando correctamente, y en que puerto. Tomemos como ejemplo el 3000

1. POST /api/login

URL: http://localhost:3000/api/login

Método: POST

Body (JSON): 
{
  "userId": 1
}

2. GET /api/contacts

URL: http://localhost:3000/api/contacts

Método: GET

Headers: Authorization: Bearer <token-generado-con-login>

3. GET /api/contacts/{contactId}

URL: http://localhost:3000/api/contacts/{contactId}

Método: GET

Headers: Authorization: Bearer <token-generado-con-login>

4. POST /api/contacts

URL: http://localhost:3000/api/contacts

Método: POST

Headers: Authorization: Bearer <token-generado-con-login>

Body (JSON): 
{
  "name": "John Doe",
  "address": "123 Main St",
  "email": "john.doe@example.com",
  "cellphone": "123-456-7890",
  "profilePicture": ""
}

5. PUT /api/contacts/{contactId}

URL: http://localhost:3000/api/contacts/{contactId}

Método: PUT

Headers: Authorization: Bearer <token-generado-con-login>

Body (JSON): 
{
  "name": "John Doe",
  "address": "123 Main St",
  "email": "john.doe@example.com",
  "cellphone": "123-456-7890",
  "profilePicture": ""
}

6. POST /api/contacts/{contactId}/notes

URL: http://localhost:3000/api/contacts/{contactId}/notes

Método: POST

Headers: Authorization: Bearer <token-generado-con-login>

Body (JSON): 
{
  "text": "This is a new note for the contact."
}

7. GET /api/notes

URL: http://localhost:3000/api/notes

Método: GET

Headers: Authorization: Bearer <token-generado-con-login>
