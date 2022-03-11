# Deployment Exercise

## Part 1: Get up and running locally

### Getting Started

1. Fork and clone this repository
1. `$ cd` into the project, and run `$ npm install`

### Getting the database up and running

- Tell `psql` to run the code in **db/migration.sql**, this will create the `example_db` database and the tables for us:

```sh
$ psql -f db/migration.sql
```

- Tell `psql` to run the code in `db/seed.sql`:

  ```sh
  $ psql -f db/seed.sql example_db
  ```

  > The above command will "seed" the database for us, in other words add some sample data for us to work with.

- Go in to your `psql` repl, connect to the `example_db` and confirm everything is there:

  ```sh
  $ psql example_db
  example_db=# SELECT * FROM student;
  ```

## Part 2: Rework so our application works in a deployed environment

Simply put, we're going to run our application on a remote computer that is hosted by an organization called Heroku. It makes our life a lot easier, they handle some of the network security, and ensure the computer is maintainted and running. **All we have to do is make our application flexible enough to run on different machines, which may use different port numbers, database names, passwords, etc.** And then we can push our code up to our Heroku computer and viola! It's live, in production, accessible by the public, or your future employers!

### Step 1: Install dotenv

To prepare our application for deployment we'll need to do the following in our project directory:

```sh
$ npm install dotenv
```

`dotenv` is a node package that allows us to store enviroment variables in a file we'll create that will be named `.env`.

**Enviroment variables** are just placeholders for variables that might be different accross machines, here are some examples:

- **Port Number** - Which port to listen on - your application might be hard-coded to use port "3000" or some other number, e.g. `app.listen(3000,...)`, but what if someone is runnning your application and they are using that port number for something else? Let them choose by placing an enviroment variable as placeholder instead.
- **Database Name / URL** - Similar reason as port number, someone might want a different database name. Also, as with port number, when you are deploying using a free service level, like we're doing with Heroku, you get whatever the hosted machine gives you.
- **Passwords / Keys** - The most immediate example you'll run in to is your database password. Your program needs that information to connect to the database, but it will be different for other machines that are running your code. The solution is once again to use an enviroment variable.

### Step 2: Create an `.env` file

Create a `.env` file:

```sh
$ touch .env
```

Add your enviroment variables as key/value pairs:

```sh
# .env

PORT=3000
DATABASE_URL=postgres://user:password@host:5432/database
```

### Step 3: Update code to use environment variables

Replace values in our code with the placeholder variables. (**See comments in the code below for what to do.**)

```js
// server.js

require("dotenv").config(); // TODO: ADD THIS LINE
const express = require("express");
const app = express();
const db = require("./db/db_configuration");

app.get("api/students", (req, res) => {
  db.query("SELECT * FROM student", (err, data) => {
    res.json(data.rows);
  });
});

// TODO: Replace 3000 with process.env.PORT
app.listen(3000, () => {
  console.log("listening on Port 3000");
});
```

```js
// db/conn.js

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "postgres://localhost/example_db", // TODO: Replace with process.env.DATABASE_URL
});

module.exports = pool;
```

We only need to RUN `require(‘dotenv’).config() ` in one place, the **entry point** of our code, where everything else is brought it and nothing is exported -- In our case, `server.js`. Once we do that, the `dotenv` node package lets us reference the enviroment variables we specified in `.env` with the `process.env` object (see the examples above).

### Step 4: Add `.env` to `.gitignore`

Add `.env` to `.gitignore`. This tells git that we don't want to share this `.env` file with others.

```
# .gitignore

node_modules
.env
```

### Step 5: Create `.env.template`

Create a `.env.template` file for other developers to copy and fill in with their own information, then rename to `.env` so they have their own copy:

```sh
$ touch .env.template
```

```sh
# .env.template

PORT=
DATABASE_URL=
```

The template above is not used by your app, it's just there for other developers who want to run your application on their machine. It makes it easy for them to create their own `.env` file.

Finally don't forget to add and commit your code!

## Part 3: Deploying to Heroku

- Download Heroku CLI and work through the Heroku [Tutorial](https://devcenter.heroku.com/articles/getting-started-with-nodejs?singlepage=true).
- Come back and take the lessons learned from the tutorial above to deploy the app in this repository.
