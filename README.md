<<<<<<< HEAD
# BackRoll

# Proyecto de Gestión de Roles con Node.js y MySQL

Este proyecto es una práctica de desarrollo backend con **Node.js** y **MySQL**, enfocado en la gestión de roles de usuarios, incluyendo **administradores, comerciales y clientes**. Es parte de mi aprendizaje para futuros trabajos como desarrollador backend junior.

## 🚀 Tecnologías utilizadas

- **Node.js (v22.13)**
- **MySQL** con consultas SQL nativas
- **Express.js** para la gestión del servidor
- **Docker** (implementación futura)
- **Manejo de archivos Excel** ( implementación futuras descarga y carga de datos)

## 📌 Funcionalidades

✔️ Creación y gestión de usuarios con distintos roles  
✔️ CRUD para usuarios y otros datos  
✔️ Descarga e importación de archivos Excel  
✔️ Integración con MySQL utilizando SQL directo

## 📂 Estructura del proyecto

```
/proyecto
│── /src
│   ├── /Controllers   # Lógica de negocio
│   ├── /DB  # Configuración de la base de datos
│   ├── /models   # Modelos de base de datos
│   ├── /repository   # separando la lógica de acceso a datos de los controladores.
│   ├── /routes   # Definición de rutas
│   ├── /services # lógica de negocio de la aplicación
│   ├── /validator    # validaciones de datos de entrada
│── .env.example  # Variables de entorno
│── package.json  # Dependencias del proyecto
│── README.md  # Documentación
```

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
```

4️⃣ Inicia el servidor:

```bash
node --watch index.js
```

## 🔧 Próximos pasos

- Registros de usuarios para login
- Implementación de autenticación y seguridad
- Integración con Docker

## 🤝 Contribución

Este es un proyecto en desarrollo como parte de mi aprendizaje. Cualquier sugerencia o mejora es bienvenida.

