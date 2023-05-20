# GitSave

## Prerequisites
To run this application, you must have the following software installed on your system:

- Node.js
- npm (Node Package Manager)
- PostgreSQL

## Installation

1. Clone this repository to your local machine.
2. Navigate to the root directory of the project in your terminal.
3. Install the dependencies, run the following command in root directory:

```bash
  npm install
```
4. Create .env file in root directory and Create following variables :

``` 
DB_USER=(postgreSQL database user)
DB_HOST=(hostname || localhost)
DB_NAME=(Database name)
DB_PASS=(Password for the db)
DB_PORT=(Port || 5432)
```

## Running the Server

1. Navigate to the root directory of the project in your terminal.
2. Run following command to run the Server
```bash
  npm run dev
```

## Routes
1. - Method: POST,
    - Route :-  /github
    - Payload: <br/>{ url: "https://api.github.com/users/{{contributor’s username}}/repos }

<br/>
2. - Method: GET
    - Route:- /github/:id


    