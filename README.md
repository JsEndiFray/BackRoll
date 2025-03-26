# BackRoll

# Proyecto de Gestión de Roles con Node.js y MySQL

Este proyecto es una práctica de desarrollo backend con **Node.js** y **MySQL**, enfocado en la gestión de roles de usuarios, incluyendo **administradores, comerciales y clientes**. Es parte de mi aprendizaje para futuros trabajos como desarrollador backend junior.

## 🚀 Tecnologías utilizadas

- **Node.js (v22.13)**
- **MySQL** con consultas SQL nativas
- **Express.js** para la gestión del servidor
- **JWT** para autenticación basada en token
- **bcryptjs** para encriptar contraseñas
- **express-validator** para validación de inputs
- **Docker** (implementación futura)

## 📌 Funcionalidades

✔️ Creación y gestión de usuarios con distintos roles  
✔️ CRUD para usuarios y otros datos  
✔️ Descarga e importación de archivos Excel  
✔️ Integración con MySQL utilizando SQL directo

## 📂 Estructura del proyecto

```
/proyecto
/src
├── controllers/         # Lógica de controladores HTTP
├── services/            # Lógica de negocio (servicios)
├── repository/          # Acceso directo a la base de datos con SQL
├── routes/              # Rutas de la API
├── middlewares/         # Middlewares como verificación de JWT
├── /models              # Modelos de base de datos
├── validator/           # Validaciones con express-validator
├── DB/                  # Configuración de base de datos
│── .env.example         # Variables de entorno
│── package.json         # Dependencias del proyecto
│── README.md            # Documentación
```

## 📌 Funcionalidades

✔️ CRUD de usuarios con roles  
✔️ Autenticación con JWT  
✔️ Protección de rutas con middleware  
✔️ SQL puro con separación por capas  
✔️ Validaciones de entrada  
✔️ Listo para escalar con Docker o integración con Excel

---

## 🧠 Patrones aplicados

- **Controller Layer** → controladores Express
- **Service Layer** → lógica de negocio desacoplada
- **Repository Pattern** → acceso directo a SQL
- **Middleware Pattern** → JWT y validaciones centralizadas
- **Separation of Concerns** en toda la estructura

---

## 🛠 Instalación y configuración

1️⃣ Clona el repositorio:

```bash
git clone <URL_DEL_REPO>
cd proyecto
```

2️⃣ Instala las dependencias:

```bash
npm install
```

3️⃣ Configura las variables de entorno en el archivo `.env`:

```
PORT
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_PORT=3306
DB_NAME=nombre_de_la_bd
JWT_SECRET=tu_clave_secreta
```

4️⃣ Inicia el servidor:

```bash
node --watch index.js
```

## 🔧 Próximos pasos

- [ ] Integración con Docker

## 🤝 Contribución

Este es un proyecto en desarrollo como parte de mi aprendizaje. Cualquier sugerencia o mejora es bienvenida.

## 👨‍💻 Autor

Proyecto realizado por un backend junior en práctica intensiva.


