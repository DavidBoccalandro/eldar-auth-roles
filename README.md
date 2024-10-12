# Aplicación de Gestión de Publicaciones

## Contexto

Este proyecto es una aplicación web desarrollada con `Angular 17` que permite a los usuarios gestionar publicaciones (posts). Los usuarios pueden iniciar sesión, crear, editar y eliminar publicaciones, así como marcarlas como favoritas. La aplicación utiliza `NgRx 17` para la gestión del estado y `PrimeNG 17` para los componentes de la interfaz de usuario.

Cuenta con autenticación, roles, visualización condicional según roles, rutas protegidas, validaciones de formularios, accesibilidad, integración con jsonplaceholder API, NGRX, responsiveness, notificaciones para operaciones exitosas o fallidas, JWT fake, localStorage para persistencia de datos, workflow de logout, entre otras cosas más.

## Estructura

```plain
src/
├─ app/
│  ├─ features/
│  │  ├─ auth/
│  │  │  ├─ guards/
│  │  │  ├─ login/
│  │  │  ├─ services/
│  │  │  ├─ store/
│  │  ├─ posts/
│  │  │  ├─ create + edit + form + list
│  │  │  ├─ enums/
│  │  │  ├─ services/
│  │  │  ├─ store/
│  ├─ shared/
│  │  ├─ models/
│  │  ├─ services/
│  │  ├─ components/
│  │  │  ├─ header/
│  │  │  ├─ modal/
│  │  │  ├─ spinner/
│  ├─ app.component.ts
├─ assets/
├─ environments/
├─ index.html
├─ main.ts
├─ styles.scss
```

- **App**: Aquí estará todo lo referido al desarrollo de la aplicación, nuestros archivos `app` y la raíz (root).
- **Assets**: Por ahora solo tenemos un logo.
- **Styles**: Variables globales.

---

- **Features**: son las características de la aplicación. Por el momento solo están auth (todo lo relacionado a autenticación) y posts (todo lo vinculado a las publicaciones).
- **Shared**: Lo compartido o disponible para compartirse en toda la app.

## Instalación

Para instalar y ejecutar la aplicación, sigue estos pasos:

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/DavidBoccalandro/eldar-auth-roles
   cd eldar-auth-roles
   ```

2. **Verifica tu versión de Node**

Este código fue realizado con Angular 17.3.0, por lo cual se necesita Node 18.13.0 o superior según la [documentación](https://angular.dev/reference/versions).

3. **Package Manager**

El presente fue desarrollado con `yarn` como package manager, por lo cual, lo recomiendo.

4. **Instala las dependencias:**

   Asegúrate de tener [Node.js](https://nodejs.org/) instalado. Luego, ejecuta:

   ```bash
   yarn install
   ```

5. **Ejecuta la aplicación:**

   Para iniciar la aplicación en modo de desarrollo, ejecuta:

   ```bash
   yarn start
   ```

   La aplicación estará disponible en `http://localhost:4200/`.

## Cómo probar:

1. **Ingresar**:

   - Para ingresar como "administrador", utiliza `admin` como nombre de usuario y cualquier contraseña válida.
   - Para ingresar como un usuario "no administrador", puedes usar cualquier nombre de usuario (sin restricciones).

2. **Validaciones al ingresar**:

   - Los labels brindan ayuda sobre los requerimientos al iniciar sesión.
   - A medida que llenas los campos, verás dinámicamente qué falta para completar lo requerido.
   - Cuando la contraseña cumpla con todos los requisitos, el botón de inicio de sesión se habilitará.
   - Puedes ver si tu contraseña cumple los requisitos haciendo clic en el símbolo del "ojo".

3. **Protecciones de rutas**:

   - Si intentas acceder a una URL no válida, serás redirigido a la página de `/login` o `/posts`, dependiendo de tu estado de autenticación.
   - Si intentas acceder a `/posts` sin estar logueado, serás redirigido a `/login`.
   - Si intentas acceder a `/login` estando logueado, serás redirigido a `/posts`.

4. **Ingreso con visualización condicional según usuario**:

   - Si ingresas como "no administrador", verás un listado de "posts" (publicaciones) sin opciones de creación, edición o eliminación.
   - Si ingresas como "administrador", tendrás acceso a los botones de edición, eliminación y creación.
   - Verás un avatar en el header que muestra la letra inicial del usuario logueado, así como el nombre del usuario.
   - Al hacer clic en el nombre del usuario, se desplegará un menú con opciones inhabilitadas que saldrán "próximamente" y la opción para desloguearte.

5. **Funcionalidades**:
   - Al hacer clic en "Agregar" o "Editar", verás un formulario que estará vacío para creación o cargado con la información del post para edición.
   - Si escribes un texto muy largo en el título o descripción, se mostrará un mensaje de advertencia y el botón de guardar se deshabilitará.
   - Contarás con un contador de caracteres para la descripción.
   - En el listado, al intentar eliminar una publicación, se mostrará un modal de confirmación.
   - Recibirás notificaciones que confirmen la realización de cada acción.
