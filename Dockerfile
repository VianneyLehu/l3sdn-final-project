# Utilisez une image Node.js en tant qu'image de base
FROM node:14-alpine as build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier package.json dans le conteneur
COPY package.json .

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers dans le conteneur
COPY . .

# Construire l'application Vue.js pour la production
RUN npm run build

# Etape de production
FROM nginx:alpine

# Copier les fichiers de build depuis l'étape de construction dans le répertoire approprié de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Démarrer Nginx en arrière-plan
CMD ["nginx", "-g", "daemon off;"]
