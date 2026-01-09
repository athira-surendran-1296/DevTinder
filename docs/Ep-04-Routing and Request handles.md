# Notes

Routing and Request handles
===========================
* The order in which we write the request handlers matters.
* Always keep the general routes to the bottom of the rounting file.

* By default browsers make a GET call when we enter a URL 
* Its not possible to POST call by entering URL in the browser
* Postman - test APIs, share with team

* app.use() --> will match both GET and POST calls
