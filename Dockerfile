# Utilisez une image Node.js en tant qu'image de base
FROM mcr.microsoft.com/azure-pipelines/node:12 as build
# Démarrer Nginx en arrière-plan
CMD ["nginx", "start"]
