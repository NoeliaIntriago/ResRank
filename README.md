# 📍 ResRank

Este proyecto es una plataforma web que permite a los estudiantes universitarios descubrir, calificar y comentar restaurantes disponibles en su campus. Los dueños de restaurantes pueden registrar y administrar su información, mientras que los administradores tienen acceso a herramientas de gestión del sistema.

## 🚀 Tecnologías Utilizadas

- **Frontend:** React.js, Bootstrap, React-Router, Axios
- **Backend:** Express.js, Node.js
- **Base de Datos:** MySQL
- **Mapas:** Leaflet
- **Autenticación:** JSON Web Token (JWT)

## 🎯 Funcionalidades Principales

### 👤 Estudiantes
- Registro e inicio de sesión
- Visualización de restaurantes disponibles
- Búsqueda por nombre, calificación y comentarios
- Visualización de restaurantes en el mapa del campus
- Envío de calificaciones y comentarios

### 🍽️ Dueños de Restaurante
- Registro e inicio de sesión
- Creación y edición de su restaurante
- Gestión de menús, horarios y ubicación

### 🛠️ Administradores
- Gestión de usuarios registrados
- Administración de facultades y puntos de ubicación

## ⚙️ Configuración del Entorno

1. Clona el repositorio:

```bash
git clone https://github.com/tu_usuario/ResRank.git
cd ResRank
````

2. Configura variables de entorno
Crear `.env` en `frontend`
```
VITE_APP_URL=tu_ip
```

Crear `.env` en `backend`

```
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=nombre_bd
SECRET_KEY=clave_secreta
```

3. Instala dependencias

```bash
cd server && npm install
cd ../client && npm install
```

4. Inicia servidor y cliente

```bash
cd server && npm run dev
cd ../client && npm start
```

## 🧑‍💻 Autor

Desarrollado por Noelia Intriago como parte de un proyecto académico.
Licencia: MIT

