# Workshop API
This is a project for my Symmetrics Lab interview, this are the steps to run this API

## Perparate the enviorment
Install **nodejs** version 12.11.0

Install **npm** version 6.11.3

Run the command **npm install** for install the dependencies

## Configure the project

### DataBase

The project uses a MySQL DataBase

Create an empty DataBase and a user and give permission to the user over the DataBase

In the **/config/config.json** file update the values in development option (DataBase name, host, user name, user password and dialect). The dialect can be one of this: MariaDB, MySQL or PostgreSQL.

Then run the commands:
**npx sequelize-cli db:migrate**
**npx sequelize-cli db:seed:all**

## Run the project

Use the command **PORT=8080 npm start** if port is changed you will need to changed the URL in the front end project too