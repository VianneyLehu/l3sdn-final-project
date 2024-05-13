# Utilisez une image Node.js en tant qu'image de base
FROM mcr.microsoft.com/VianneyLehu.l3sdn-final-project/node:12 as build
# Démarrer Nginx en arrière-plan
CMD ["nginx", "start"]
