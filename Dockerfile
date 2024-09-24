# Etapa 1: Build
FROM node:16 AS build

# Definir o diretório de trabalho no container
WORKDIR /app

# Copiar o package.json e o package-lock.json para o container
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar todo o código do projeto para o diretório de trabalho
COPY . .

# Rodar o build do projeto
RUN npm run build

# Etapa 2: Configuração do servidor
FROM nginx:alpine

# Copiar os arquivos do build para o diretório padrão do nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expor a porta 80 para acessar a aplicação
EXPOSE 80

# Comando para iniciar o nginx
CMD ["nginx", "-g", "daemon off;"]
