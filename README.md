# Bodega Online - Backend
API REST (Node.js + Express) que se conecta a PostgreSQL.

Endpoints: GET /productos, POST /pedidos

## Variables de entorno
DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT (5432), DB_SSL (true en la nube)

## Ejecutar con Docker
    docker build -t bodega-backend .
    docker run -p 3000:3000 -e DB_HOST=... -e DB_USER=... -e DB_PASSWORD=... -e DB_NAME=bodega bodega-backend
