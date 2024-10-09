> **Disclaimer**: debido a las limitaciones tecnicas en nodejs 14 y chai, es imposible ejecutar pruebas escritas con sintaxis de moduloes ES6 en chai debido a la forma en como chai utiliza los modulos dentro de su paquete, entonces estuve utilizando flags experimentales y el modulo ESM de node con lo cual no fue efectivo pues entonces tuve que utilizar babel para transpilar el modulo ES6 de los tests (solo uso babel para los tests)

# 📺 ToolboxTV Challenge - Backend API

¡Bienvenidos al **Challenge Fullstack** para el puesto Fullstack (MERN Stack)! 🎉 Aquí veras un backend en Node.js que interactúa con una API externa, procesa archivos y maneja rutas con Express.js.

## 📚 Tabla de Contenidos
- [Descripción del Proyecto](#descripción-del-proyecto)
- [Tecnologías](#tecnologías)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Ejecutar el Proyecto](#ejecutar-el-proyecto)
- [Ejecutar Pruebas](#ejecutar-pruebas)
- [Endpoints Disponibles](#endpoints-disponibles)
- [Configuración con Docker](#configuración-con-docker)

## 🚀 Descripción del Proyecto

Este proyecto es un backend en Node.js que se comunica con una API externa para procesar datos de archivos y devolverlos de una forma bonita. 🗃️ Además, tiene soporte para consultas de archivos específicos y está listo para correr en Docker. ¡Es súper fácil de configurar y correr!

## 🛠️ Tecnologías

El proyecto utiliza estas herramientas y bibliotecas 👇:

- **Node.js (v14.x)**: Nuestro entorno para ejecutar el backend.
- **Express (v4.17.1)**: Framework para manejar las rutas de la API.
- **Axios (v1.7.7)**: Para hacer solicitudes HTTP a la API externa.
- **dotenv (v8.2.0)**: Para gestionar variables de entorno.
- **Babel (v7.x)**: Utilizado para transpilar el código de los tests.
- **Mocha (v7.1.1)**: Framework de pruebas para asegurarnos de que todo funcione correctamente.
- **Chai (v4.2.0)**: Biblioteca para aserciones en las pruebas.
- **Sinon (v19.0.2)**: Para mocks y stubs en las pruebas.
- **StandardJS**: Linter para asegurar consistencia en el código.
- **Docker**: Para ejecutar la app en un contenedor.

## 📋 Requisitos

Antes de comenzar, asegúrate de tener lo siguiente instalado en tu máquina:

- Node.js (v14.x)
- Docker (opcional, pero recomendado para contenedores) 🐳
- NPM (Node Package Manager)

## 💻 Instalación

1. Clona este repositorio con el siguiente comando:

   ```bash
   git clone https://github.com/alblandino/toolbox-backend.git
   cd toolbox-backend
   ```

2. Instala las dependencias del proyecto:

   ```bash
   npm install
   ```

## 🏃‍♂️ Ejecutar el Proyecto

Para correr el proyecto localmente, solo sigue estos pasos:

1. Levanta el servidor con este comando:

   ```bash
   npm start
   ```

2. El servidor estará disponible en:

   ```bash
   http://localhost:3000
   ```

   Si necesitas cambiar el puerto o alguna otra configuración, puedes hacerlo actualizando el archivo `.env` que ya está en el repo. ✏️

3. Puedes acceder a los endpoints de la API en `/v1/files/list` o `/v1/files/data`.

## 🧪 Ejecutar Pruebas

Este proyecto usa **Mocha**, **Chai**, y **Sinon** para hacer pruebas. Puedes correrlas así:

1. Asegúrate de tener las dependencias instaladas (si no lo has hecho aún):

   ```bash
   npm install
   ```

2. Ejecuta las pruebas con:

   ```bash
   npm test
   ```

   Esto ejecutará todas las pruebas que están en la carpeta `test/`. 💥

## 🌐 Endpoints Disponibles

Aquí tienes los endpoints de la API que puedes usar:

### 1. Obtener lista de archivos disponibles

- **Ruta**: `/v1/files/list`
- **Método**: `GET`
- **Descripción**: Te devuelve una lista con todos los archivos disponibles en el sistema, sin procesar.
- **Ejemplo de Respuesta**:
  ```json
  {
    "files": [
      "file1.csv",
      "file2.csv",
      "file3.csv"
    ]
  }
  ```

### 2. Obtener datos formateados de uno o más archivos

- **Ruta**: `/v1/files/data?fileName={nombre_del_archivo}`
- **Método**: `GET`
- **Parámetro Query (opcional)**: `fileName` - El nombre del archivo que quieres obtener. Si no lo envías, te devolverá todos los archivos.
- **Descripción**: Devuelve los datos formateados de un archivo específico o de todos los archivos si no envías `fileName`.
- **Ejemplo de Solicitud**:
  ```bash
  GET /v1/files/data?fileName=file1.csv
  ```
- **Ejemplo de Respuesta**:
  Si envías el `fileName`:
  ```json
  {
    "file": "file1.csv",
    "lines": [
      { "text": "text1", "number": 123, "hex": "hex1" },
      { "text": "text2", "number": 456, "hex": "hex2" }
    ]
  }
  ```

  Si no envías `fileName` (te devolverá todos los archivos):
  ```json
  [
    {
      "file": "file1.csv",
      "lines": [
        { "text": "text1", "number": 123, "hex": "hex1" },
        { "text": "text2", "number": 456, "hex": "hex2" }
      ]
    },
    {
      "file": "file2.csv",
      "lines": [
        { "text": "textA", "number": 789, "hex": "hexA" }
      ]
    }
  ]
  ```

## 🐳 Configuración con Docker

Si quieres usar **Docker**, aquí tienes cómo levantar todo en un contenedor. 🎉

1. Construye la imagen de Docker:

   ```bash
   docker build -t toolboxtv-app .
   ```

2. Corre el contenedor:

   ```bash
   docker run -p 3000:3000 --env-file .env toolboxtv-app
   ```

   Esto va a mapear el puerto `3000` del contenedor a `3000` en tu máquina local. Si necesitas cambiar algo, actualiza el archivo `.env`.

3. Ahora la aplicación debería estar corriendo en:

   ```bash
   http://localhost:3000
   ```