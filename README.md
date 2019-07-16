# MySQL Registration with JWT & Passport Authentication

## About This App

This application is a full-stack MERN app (MySQL, Express, React and Node.js). It is a user registration application that allows a user to register in the database, log in, view their profile, update it and delete it.

It uses a `docker-compose` file to spin up a local MySQL database, the API module and the client module all with one command: `docker-compose up`.

Passport local handles user authencation for the unprotected routes, which are the user registration and login routes.

Once the user has logged in a JWT token is created and sent to the client and storeed in local storage along with user data, Passport JWT takes over at this point and handles all further user authentication for protected routes.

Each request from the client to the server must include the JWT as one of its authorization headers before the route can be accessed. If the JWT is missing, corrupted or expired (it has a 1 hour expiration date from the time it's created on login), the authentication will fail and the route cannot be accessed.

If a user logs out or deletes their user profile, the JWT is removed from local storage and the user is dropped back at the home screen again.

There's also a password reset email that can be sent if a user forgets their password. Nodemailer is the package that enables sending, and the email contains a link with a 1 hour expiration date that users can use to reset their password. They can also update their password once logged in to the app as well from a separate update password screen.

I've added Swagger documentation to the API side of the application for easer, in browser API testing. The Swagger UI can be accessed by running the application then going to `http://localhost:3003/api-docs/`. From there all of the server-side routes can be accessed and tested, just as if you were using the client side interface. Required properties and params are specified and secured routes requiring a JWT token are noted with the little lock at the top right hand corner of the route.

To add a correctly formatted JWT token into the input box, generate the token with the `/loginUser` route, copy the `token` property's value, and paste it into the input with `JWT <token string>`; the "JWT " is required to format the header authorization correctly.

## Running This App

From the home folder, run the following commands:

For the very first build:

- `$ docker-compose build`

Every time after that:

- `$ docker-compose up`

Your API server should be running at `http://localhost:3003`, your client server will be running at `http://localhost:3031` and your MySQL database will be running at: `127.0.0.1:3307`

To stop the services:

- `$ docker compose-stop`

To kill the services:

- `CTRL + C` and then `$ docker compose-down`

## Troubleshooting:

You may have an error when trying to install all the node modules for the first time from the `bcrypt` package. The error will look something like: `npm ERR! path /app/node_modules/bcrypt/node_modules/abbrev` when the api app attempts to start up.

If you encounter this, open a new terminal and type `docker ps` to get the api's container ID.

Access the container: `docker exec -t -i <containerId> /bin/bash`

Then run `npm install bcrypt`. It's not a nice way to do it, but it should work. I don't know why Mac bcrypt and Docker Linux bcrypt can't work together nicely sometimes, but they can't.
