#!/bin/bash

# Parar o container
docker stop hml-winbot-api

# Remover o container
docker rm hml-winbot-api

# Remover a imagem
docker rmi hml-winbot-api

# Atualizar o repositÃ³rio
git pull origin staging

# Construir a nova imagem
docker build --no-cache -t image/hml-winbot-api .

# Executar o novo container
docker run -d --env-file .env -p 4001:4001 -e PORT=4001 --name hml-winbot-api image/hml-winbot-api