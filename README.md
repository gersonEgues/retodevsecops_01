# Manual Completo para el Reto DevSecOps 01 con GitHub Actions

Este manual te guiará paso a paso para crear un pipeline CI/CD con GitHub Actions para una aplicación Node.js simple, construida y subida a Docker Hub automáticamente.

---

## 1. Crear el repositorio en GitHub

1. Ingresa a [GitHub](https://github.com) y crea un nuevo repositorio con el nombre `retodevsecops_01`.
2. Puedes elegir que sea público o privado.
3. Clona el repositorio a tu máquina local:

```bash
git clone https://github.com/tuusuario/retodevsecops_01.git
cd retodevsecops_01
```

## 2. Crear la aplicación Node.js simple

1. Dentro del directorio clonado, crea el archivo `app.js` con este contenido:

```bash
const http = require('http');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hola DevSecOps 01, ¡funcionando!\\n');
});

server.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});

```

2. Crea el archivo `package.json` con:

```bash
{
  "name": "retodevsecops_01",
  "version": "1.0.0",
  "description": "Aplicación simple Node.js para reto DevSecOps 01",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "test": "echo \\"No hay tests aún\\" && exit 0"
  },
  "author": "Tu Nombre",
  "license": "MIT",
  "dependencies": {}
}
```

## 3. Crear el Dockerfile

1. Crea un archivo llamado Dockerfile con este contenido:

```bash
FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

```

## 4. Inicializar git y subir el proyecto

1. En la raíz del proyecto ejecuta:

```bash
git init
git add .
git commit -m "App simple Node.js con Dockerfile para retodevsecops_01"
git branch -M main
git remote add origin https://github.com/tuusuario/retodevsecops_01.git
git push -u origin main
```


## 5. Crear el pipeline GitHub Actions

1. Crea la carpeta `.github/workflows/` en la raíz del proyecto.

2. Dentro crea el archivo `ci-cd.yml` con este contenido:

```bash
name: CI/CD Pipeline retodevsecops_01

on:
  push:
    branches:
      - main

jobs:
  build-and-push:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repo
      uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Install dependencies
      run: npm install

    - name: Run tests
      run: npm test

    - name: Log in to Docker Hub
      uses: docker/login-action@v2
      with:
        username: ${{ secrets.DOCKERHUB_USERNAME }}
        password: ${{ secrets.DOCKERHUB_TOKEN }}

    - name: Build and push Docker image
      uses: docker/build-push-action@v4
      with:
        context: .
        push: true
        tags: ${{ secrets.DOCKERHUB_USERNAME }}/retodevsecops_01:latest
```

3. Guarda, confirma y sube los cambios:

```bash
git add .github/workflows/ci-cd.yml
git commit -m "Agregar pipeline GitHub Actions para retodevsecops_01"
git push
```

## 6. Configurar secretos en GitHub

1. En tu repositorio en GitHub, ve a:

```bash
Settings > Secrets and variables > Actions
```

2. Haz clic en New repository secret y crea los siguientes secretos:

```bash
| Nombre              | Valor                                       |
| ------------------- | ------------------------------------------- |
| DOCKERHUB\_USERNAME | tu\_usuario\_de\_docker\_hub                |
| DOCKERHUB\_TOKEN    | tu\_token\_de\_acceso\_generado\_en\_docker |
```

3. Guarda ambos secretos.

## 7. Probar el pipeline

1. Cada vez que hagas push a la rama main, el pipeline correrá automáticamente.

2. Ve a la pestaña Actions en GitHub para ver el progreso.

3. Si todo va bien, la imagen Docker será construida y enviada a Docker Hub.

4. Verifica en Docker Hub que la imagen `${DOCKERHUB_USERNAME}/retodevsecops_01:latest` esté subida.
