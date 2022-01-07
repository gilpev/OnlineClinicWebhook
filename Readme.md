To run this repo locally you will need =>

- MySql - version 8.0.0 and up
- nodeJs - version 12.19.0 and up
- postman - to test the route

Start by creating a database and new mysql user for the project :

open cmd

connect to your root user with command =>

`mysql.exe -u[user_name] -p`

`CREATE USER 'new_user' IDENTIFIED WITH mysql_native_password BY 'user_password';`

`GRANT ALL PRIVILEGES ON webhook_assignment.* TO 'new_user'`

`FLUSH PRIVILEGES;`

`CREATE DATABASE webhook_assignment;`

`quit`

connect to mysql from cmd
=>

`mysql.exe -u [new_user] -p`

=> then when asked enter the password you created for this user

Now that the mysql user is ready and we have the database to use
cd into project folder and run following commands =>

- run npm install
- fill the .env file with required environment variables:

  user_name you created

  password you chose

- run npm start

After all is set up check functionality via postman
and post one of the
**mock_data_webhook.json** objects to route =>

http://127.0.0.1:5000/webhook/recording
