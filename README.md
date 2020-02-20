# Point Of Sale App

Point of Sale App is an Application that allows users to access cashier systems such as product items, product categories, and product quantities. The Point of Sale App also allows users to create, update and delete products to or from the database.

There are several features included in the API that allow users to search data by name, order or sorting by product name, category and date update.

## NodeJS
<img src="https://static.cdn-cdpl.com/source/23438/nodejs_logo_2016-image%28700x350-crop%29.png" width="400">

Node.js is software designed to develop web-based applications and is written in the syntax of the JavaScript programming language. If all this time we know JavaScript as a programming language that runs on the client / browser side only, then Node.js exists to complete the role of JavaScript so that it can also act as a programming language that runs on the server side, such as PHP, Ruby, Perl, and so on.

## ExpressJS
<img src="https://i.cloudup.com/zfY6lL7eFa-3000x3000.png" width="400">

Express.js, or simply Express, is a web application framework for Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs.

## REST API
<img src="https://miro.medium.com/max/1032/1*R99tA3ehTPO9BKvjYaTCuA.png" width="400">

Representational state transfer (REST) is a software architectural style that defines a set of constraints to be used for creating Web services. Web services that conform to the REST architectural style, called RESTful Web services, provide interoperability between computer systems on the Internet.

## Built With
[![Express.js](https://img.shields.io/badge/express-4.18.1-yellow?style=rounded-square)](https://expressjs.com/en/starter/installing.html) 
[![Node.js](https://img.shields.io/badge/npm-6.13.6-greenstyle?rounded-square)](https://nodejs.org/) 
[![MySQL](https://img.shields.io/badge/mysql-2.18.1-blue?rounded-square)](https://www.npmjs.com/search?q=mysql) 
[![MySQL](https://img.shields.io/badge/body--parser-1.19.0-red?rounded-square)](https://www.npmjs.com/package/body-parser) 
[![Morgan](https://img.shields.io/badge/morgan-1.9.1-brightgreen?style=rounded-square)](https://www.npmjs.com/package/morgan) 
[![CORS](https://img.shields.io/badge/cors-2.8.5-lightgrey?style=rounded-square)](https://www.npmjs.com/package/cors) 
[![CORS](https://img.shields.io/badge/jsonwebtoken-8.5.1-yellowgreen?style=rounded-square)](https://www.npmjs.com/package/jsonwebtoken)
[![Dotenv](https://img.shields.io/badge/dotenv-2.8.5-brightgreen?style=rounded-square)](https://www.npmjs.com/package/dotenv)
[![Standard](https://img.shields.io/badge/standard-14.3.1-brightred?style=rounded-square)](https://www.npmjs.com/package/standard)
[![Multer](https://img.shields.io/badge/multer-1.4.5-lightgreen?style=rounded-square)](https://www.npmjs.com/package/multer)

## Requirements
1. [Node JS](https://nodejs.org/en/download/)
2. [Express JS](https://expressjs.com/en/starter/installing.html)
3. [Postman](https://www.getpostman.com/)
4. [XAMPP](https://www.apachefriends.org/index.html)

Before starting to clone repository, it's better to read and know **Node JS**, **REST API** and **Read the Documentation** about the requirements above

## Getting Started
-  Clone this repository
-   `npm install`  to install node.js in CMD / Terminal
-   `npm install express body-parser mysql` to install dependencies
-   `npm install dotenv` [![dotenv](https://img.shields.io/badge/dotenv-8.1.0-orange?style=rounded-square)](https://www.npmjs.com/package/dotenv)
-  If you don't understand about .env read [dotenv](https://www.npmjs.com/package/dotenv)
- Make a new file **.env**
- Turn on Web Server and MySQL with third-party tools XAMPP.
- Setup the database.
- Open **Postman** desktop application or Chrome web extension (Install **Postman** if you haven't yet)
- Choose HTTP Method and enter the request URL.(i.e. localhost:500/product)
- Check all **Endpoints**

## Setup .env file
Open **.env** file on code editor and copy the code below :
```
DB_HOST = 'localhost'
DB_USER = 'root'
DB_PASSWORD = ''
DB_DATABASE = 'pos_app'

PORT = 5000
SECRET_KEY = 'Bootcamp Bogor'
```

## Setup Database
Create Database named  **pos_app**  :
```
CREATE DATABASE pos_app;
```
Create Table named **category** :
```
CREATE TABLE 'category' (
    id INT(55) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    date_add TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    date_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```
Create Table named **product** :
```
CREATE TABLE 'product' (
    id INT(55) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255),
    quantity INT(11),
    image VARCHAR(255),
    price INT(55),
    category_id INT(55),
    date_add TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    date_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```
Create Table named **user** :
```
CREATE TABLE 'user' (
    id INT(55) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email TEXT,
    salt TEXT,
    password TEXT,
    date_add TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    date_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```
### HTTP Requests

All API requests are made by sending a secure HTTPS request using one of the following methods, depending on the action being taken:

-   `GET`  Get a resource or list of resources
-   `POST`  Create a resource
-   `PUT`  Update a resource
-   `DELETE`  Delete a resource

### A. CRUD Category Endpoint
**1. Read All Category**
 -   **Request**  :  **`GET /category`**
 -   **Response**  :
```
{
    "status": 200,
    "result": [
        {
            "id": 1,
            "name": "Indonesian Food",
            "date_created": "2020-02-18T00:04:24.000Z",
            "date_updated": "2020-02-18T10:40:28.000Z"
        },
        {
            "id": 2,
            "name": "Indonesian Drink",
            "date_created": "2020-02-18T03:47:37.000Z",
            "date_updated": "2020-02-18T12:16:49.000Z"
        },
        {
            "id": 3,
            "name": "Western",
            "date_created": "2020-02-18T11:02:59.000Z",
            "date_updated": "2020-02-18T11:02:59.000Z"
        }
    ]
}
```

**2. Read a category**
 -   **Request**  :  **`GET /category/:categoryId`**
 -   **Response**  :

```
{
    "status": 200,
    "result": [
        {
            "id": 1,
            "name": "Indonesian Food",
            "date_created": "2020-02-18T00:04:24.000Z",
            "date_updated": "2020-02-18T10:40:28.000Z"
        }
    ]
}
```
**3. Create a category**
 -   **Request**  :  **`POST /category`**
 -   **Response**  :
```
{
    "status": 200,
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 4,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}
```
**4. Update a category** (Need Verification)

 -   **Request**  :  **`PATCH /category/:categoryId`**
 -   **Response**  :
```
{
	{
    "status": 200,
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "(Rows matched: 1  Changed: 1  Warnings: 0",
        "protocol41": true,
        "changedRows": 1
    }
}
}
```
**5. Delete a category**
 -   **Request**  :  **`DELETE /category/:categoryId`**
 -   **Response**  :
```
{
    "status": 200,
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}
```
### B. CRUD Product Endpoint
**1. Read all product**
 -   **Request**  :  **`GET /product/`**
 -   **Response**  :
```
{
    "status": 200,
    "result": [
        {
            "id": 8,
            "name": "Es Doger",
            "description": "Minuman Khas Betawi",
            "image": "http://localhost:5000/pictures/EE_2842_copy.jpg",
            "price": 8000,
            "quantity": 0,
            "category": "Indonesian Drink",
            "date_created": "2020-02-18T15:28:25.000Z",
            "date_updated": "2020-02-18T15:28:25.000Z"
        },
        {
            "id": 9,
            "name": "Es Cendol",
            "description": "Minuman Khas Banjarnegara",
            "image": "http://localhost:5000/pictures/es-cendol.jpg",
            "price": 7500,
            "quantity": 0,
            "category": "Indonesian Drink",
            "date_created": "2020-02-18T15:37:09.000Z",
            "date_updated": "2020-02-18T15:37:09.000Z"
        },
        {
            "id": 10,
            "name": "Es Cendol",
            "description": "Minuman Khas Banjarnegara",
            "image": "http://localhost:5000/pictures/es-cendol.jpg",
            "price": 7500,
            "quantity": 0,
            "category": "Indonesian Drink",
            "date_created": "2020-02-18T15:48:17.000Z",
            "date_updated": "2020-02-18T15:48:17.000Z"
        },
        {
            "id": 17,
            "name": "Es Teller",
            "description": "Makanan terenak didunia",
            "image": "http://localhost:5000/pictures/bola.jpg",
            "price": 10000,
            "quantity": 0,
            "category": "Indonesian Drink",
            "date_created": "2020-02-19T10:26:26.000Z",
            "date_updated": "2020-02-19T10:26:26.000Z"
        }
    ]
}
```
**2. Read a product**
 -   **Request**  :  **`GET /product/:productId`**
 -   **Response**  :
```
{
    "status": 200,
    "result": [
        {
            "id": 10,
            "name": "Es Cendol",
            "description": "Minuman Khas Banjarnegara",
            "image": "http://localhost:5000/pictures/es-cendol.jpg",
            "price": 7500,
            "quantity": 0,
            "category": "Indonesian Drink",
            "date_created": "2020-02-18T15:48:17.000Z",
            "date_updated": "2020-02-18T15:48:17.000Z"
        }
    ]
}
```
**3. Create a product**
 -   **Request**  :  **`POST /product`**
 -   **Response**  :
```
{
    "status": 200,
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 24,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}
```
**4. Update product**
 -   **Request**  :  **`PATCH /product/:productId`**
 -   **Response**  :
```
{
    "status": 200,
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 5,
        "message": "(Rows matched: 1  Changed: 1  Warnings: 5",
        "protocol41": true,
        "changedRows": 1
    }
}
```
**5. Delete product**
 -   **Request**  :  **`DELETE /product/:productId`**
 -   **Response**  :
```
{
    "status": 200,
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}
```
###  C. Search, Pagination, Sort in Product

 - **Search by name** `` Request : GET /product/?name=Es ``
 - **Pagination in product** `` Request : GET product/?page=2&limit=5 ``
 - **Sort name** `` Request : GET product/?sortBy=name&orderBy=DESC ``
 - **Sort category** `` Request : GET product/?sortBy=category&orderBy=ASC``
 - **Sort date update** `` Request : GET product/?sorBy=date_updated&orderBy=DESC ``
