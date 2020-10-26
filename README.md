# Project 3 - IT2810 Group 32

HOW-TO: client

1. Navigate to the "project-3-it2810-group-32/client" folder
2. npm install
3. npm start

HOW-TO: server

1. Navigate to the "project-3-it2810-group-32/server" folder
2. Enter "npm install" 
3. Enter "npm start"

This will start the database server on localhost:5000

If an error saying "[nodemon] app crashed - waiting for file changes before starting", try:

MAC: (In server folder)

1. npm install typescript
2. Type in "npm start"


Windows: (In server folder)

1. tsc -w
2. Enter "npm start"

If you get an error (on Windows) saying: 

*"src/server.ts(6,18): error TS7016: Could not find a declaration file for module 'cors'.":*

Just CTRL-C to cancel the command and type: **npm install @types/cors.**  After this it should work


