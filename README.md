# Google Auth Login Component

Este proyecto es una práctica para desarrollar un componente de inicio de sesión con Google Auth utilizando Next.js y la biblioteca `next-auth`. El objetivo es aprender a integrar servicios de autenticación de Google en una aplicación.

## Características
- Autenticación con Google mediante `next-auth`.
- Gestor de sesiones para controlar el estado de autenticación del usuario.
- Interfaz sencilla para probar el inicio y cierre de sesión.

## Capturas de Pantalla
### Pantalla de login
![image](https://github.com/user-attachments/assets/26f93829-2a70-49d8-aa9a-08d276c76fc9)

### Pantalla de signup
![image](https://github.com/user-attachments/assets/e3d443f8-64cd-4736-baf3-b85ed4491ac0)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu_usuario/tu_repositorio.git
   cd tu_repositorio
   ```

2. Instala las dependencias:
   ```bash
   npm install
   # o
   yarn install
   ```

3. Configura las credenciales de Google Auth:
   - Ve a [Google Cloud Console](https://console.cloud.google.com/).
   - Crea un nuevo proyecto o usa uno existente.
   - Habilita la API de OAuth 2.0.
   - Configura las credenciales con un tipo de aplicación "Web Application".
   - Añade `http://localhost:3000` como origen autorizado y `http://localhost:3000/api/auth/callback/google` como URI de redirección.
   - Descarga el archivo JSON de las credenciales y copia el ID de cliente y el secreto.

4. Crea un archivo `.env.local` en la raíz del proyecto con el siguiente contenido:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=tu_google_client_id
   GOOGLE_CLIENT_SECRET=tu_google_client_secret
   ```
   y demas datos de la base de datos

