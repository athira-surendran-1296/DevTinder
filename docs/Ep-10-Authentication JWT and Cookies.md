# Notes

Authentication, JWT and Cookies
===============================
* JWT --> JSON Web Token

* Authentication process
    - The client / browser calls the login API with email and password
    - Server validates the credentials
    - If credentials are wrong the login API fails
    - If credentials are valid the server generates a JWT token
    - The JWT token is wrapped with a cookie and is sent back to the client with success response
    - Now, the client / browser sends the cookie back to the server for any other API calls made further
    - This is the inbuilt behaviour of the browser 
    - Server validates the token befor sending back the response to any other API
    - When the token expires the API fails, in the client the user is asked to relogin

* Express recommends the npm package cookie parser to parse the cookie
  https://www.npmjs.com/package/cookie-parser

# JWT TOKEN
============
* Refer - https://www.jwt.io/
* JWT Token = headers + payload (hidden secret data) + signature
* JSONWEBTOKEN NPM Package - https://www.npmjs.com/package/jsonwebtoken

# Schema methods
================
* The methods closely related to a model can be off loaded as schema methods
* For eg, Validating the user password or creating JWT token for a user
* For schema methods, always use normal functions and avoid using arrow functions to get the reference of this
