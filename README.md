# post-server

To run this locally, clone the repository:
```
git clone git@github.com:sfsu-csc-668-spring-2019/post-server.git
```

You must have `node` and `npm` installed! Change into the directory and install dependencies
```sh
cd post-server
npm install
```

This project requires a database, and tables can be created with the following SQL:
```sql
-- DDL generated by Postico 1.4.2
-- Not all database features are supported. Do not use for backup.

-- Table Definition ----------------------------------------------

CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    sale_data json,
    created_at timestamp without time zone,
    team_id character varying(255)
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX sales_pkey ON sales(id int4_ops);

```
Note that the product information is served from a static json file (in the routes directory).

A `.env` file is required to add a `DATABASE_URL` into the process' environment (the following example expects a database named `post-server` to be running as a postgres database on localhost at port 5432):
```
DATABASE_URL=postgres://jrob@localhost:5432/post-server
```

The server starts on port 3000 with the following command:
```sh
npm start
```