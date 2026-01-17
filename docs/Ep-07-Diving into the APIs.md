# Notes

Diving into the APIs
======================
* The data sent by the client is available in the body of the request
* It is in JSON Format
* The server will have to convert the JSON data to JS object
* For this express provides a built in middleware express.json. 
* We can place it on top of all routes
        app.use(express.json());
