# Skeleton template for Node.js API server

## Instruction
This skeleton will provides a basic environment to run a Node API server which can be easily extended to microservice-architected API's,
and a development server for SPA front-end applications.

## Structures
```
index.html // The main document to be rendered at the root URL.
server.js // The main file to initiate the node API server.
app/ // A root directory for the front-end SPA application
└── app.module.js // a main entry module file (being watched by webpack).
dist/ // A directory to serve static assets such as images, files, and javascript files.
├── info.js // A script to display this project information on index.html (You can disable it by deleting the script on index.html).
└── app.js // A main script file that is a compiled version of app/app.module.js through webpack. 
```

## Commands
For develolopment purpose, a minimal express development server comes with the project. Below are the possible npm commands that a user can execute.
```
# npm install // Install all related javascript packages (Ex. nodemon, express, webpack, etc)
# npm start // Run an express server calling server.js in the project.
# npm run build // Run webpack to complie bundle file out of app/app.module.js
# npm run watch // Run webpack in watch mode to keep updating the changes to angular.js app.
# npm run nodemon // Run nodemon to keep updating the changes to express.js development server.
# npm run dev // Run "npm run watch" and "npm run nodemon" concurrently.
```
