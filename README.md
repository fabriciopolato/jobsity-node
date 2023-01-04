# Stocks - Node.js Challenge

## 1. Description

The goal of this exercise is to create an API with Node.js to allow users to query stock quotes.

The project consists of two separate services:

- A user-facing API that will receive requests from registered users asking for quote information.
- An internal stock service that queries external APIs to retrieve the requested quote information.

## 2. Technologies, Frameworks and Libraries

- Node
- MongoDB
- Eslint
- Docker
- Swagger
- Jest
- Morgan
- Axios
- Express

## 3. How to run the project
1. Ensure that you have docker installed first!
[Docker Website](https://www.docker.com/)

2. Clone this repo at your local machine and install the dependencies from both API's root folder (api-service and stock-service)

```bash
npm i
```

3. Each API folder has an `.env.example` file with the environment variables. Rename both to `.env`

4. Go to the root path of the project and run the following command in your terminal to mount the docker image in your machine:

```bash
sudo docker compose up
```

Obs: ensure that all the ports used by the project are not being used by your system. You can change ports used by the project inside the `docker-compose.yml` file and inside the `.env` files

#### PORTS:
- 8080 - api-service
- 8081 - stock-service
- 27017 - MongoDB
- 587 - Nodemailer

## 4. Swagger and Postman Documentations

After your API's are up and running, you can find the Swagger Documentation in the following links:
- api-service: [http://localhost:8080/documentation/](http://localhost:8080/documentation/)
- stock-service: [http://localhost:8081/documentation/](http://localhost:8081/documentation/)


You can also use the Postman documentation importing the `stock.jobsity.postman.json` collection file from this project inside Postman

## 5. How to test the project
1. Firstly, you should create an admin user through the `/register` route of the api-service

You will receive a fake email with a random password created by the application through the ethereal email service. To log in their emailbox, go to https://ethereal.email/, click in LOGIN and use the following fake credentials:

```
ETHEREAL CREDENTIALS

email: hellen.schaefer@ethereal.email
password: PeksSnGj8xWWRpTUd7
```

Once you are logged in the website, go the `Messages` tab in the navabar and there you will have access to all the emails sent by the application

2. If the registration was succesfull, the api will return a token. Use the token inside your bearer authentication header requests to be allowed to use all the routes of the application

## 6. Author

Made by [Fabrício Polato](https://www.github.com/fabriciopolato). For questions, you can reach out to me at my [LinkedIn](https://www.linkedin.com/in/fabriciopolato/)