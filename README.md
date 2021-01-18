# Capstone-Travel-App
Front-end travel App Nanodegree program
# Udacity 5th Project: 
# Travel app

## What We will be building

 we will build  an app that allow the user to enter a date and a city that he/she wish to travel to in response we will get an information about the weather status and a picture of that city 


# Project Goals

The goal of this project is to give us the practice with:
- Setting up Webpack
- Sass styles
- Webpack Loaders and Plugins
- Creating layouts and page design
- Service workers
- Using 3 APIs and creating requests to external urls

## Build Tools
* HTML
* CSS
* JavaScript
* Node
* Express
* Webpack
* meaningcloud API
* Jest
* Workbox
* supertest

## APIs

the project was based on using multi APIs call, starting by geonames > to get the lat & lon of the entered city
 weatherbit > use the result from previous API lat&lon and get the weather data
  pixabay> get the picture of the city 



## Installation
First YOu need to Make sure that Node and npm are installed from the terminal.
```
>node -v
>npm -v
```
# Installing the package-lock.json & node_modules
to install all the dependencies and devdependencies run the following command:

 >npm install 

## Run project in development & production environment
Below shows how to run in development and production mode.

## run the server 
first run the server in the terminal by:

>npm run start

### run in development mode

>npm run build-dev

### run in production mode

>npm run build-prod

### open browser at :
 Open browser at http://localhost:8091/


## Configs
Here, we have two webpack config files for both development mode(`webpack.dev.js`) and production mode(`webpack.prod.js` )

We also have a `package.json` to manage dependencies

## Testing

Testing is done with Jest. To run test, use the command 

>npm run test 

## Extend project Options 
I chose the delete of the trip option by adding the button inside the DynamicUI() at formHandler.js 
