# Utilisez une image Node.js en tant qu'image de base
FROM node:latest as build
# Démarrer Nginx en arrière-plan
CMD ["nginx", "start"]
