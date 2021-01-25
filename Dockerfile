FROM node:alpine


WORKDIR /app

#Bringing package.json of the App
COPY ./package.json ./

RUN npm install --production
#Bringing all files and folders to working directory
COPY . . 
# Uses port which is used by the actual application
EXPOSE 3000

CMD ["npm", "start" ]
