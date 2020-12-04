# Node_Jwt
Register and Login Page using Json Web token

initialize a new project with npm init -y

//For the register page

Sending the username and password values to the server, and then storing them in a local mongodb database
Used bcyrpt to hash the password on save.

//For Login
Making a POST request to the server with the username and passowrd values

On the server, we recieve the values and then find the user using the username in the mongodb database
if the user was not found an error message is returned.

If the user was found, we use the brcypt.compare function to compare the password submitted with the hashed password of the user that was found,

After that, we initilaize a jwt for that particular user and send the token back to the client

The JWT_SECRET was stored in an environmnet variable so it is not accessible to anyone who can see the source code.



