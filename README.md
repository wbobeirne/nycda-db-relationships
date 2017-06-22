# Database Relations Example

This is a simple news site that's meant to show database relations. It has 3
main entities that are examples of one-to-many and many-to-many relationships.

## Getting Started

1) Run `npm install` to install dependencies
2) Create a new database for this project
3) Create an `.env` file that has the following keys:
```bash
DATABASE_NAME=[db name]
DATABASE_USER=[db user name]
DATABASE_PASSWORD=[db user password]

# Optional
PORT=[web app port]           # Default: 7000
DATABASE_HOST=[db host]       # Default: localhost
DATABASE_PORT=[db port]       # Default: 5432
DATABASE_URL=[postgres://...] # Default: Nothing, uses other DATABASE values
```
4) Run `npm start` to start it up!

## Schema

The models that inform this schema are all defined in `models/*.js`. All tables
have the default Sequelize `createdAt` and `updatedAt` columns, in addition to
what's defined below.

### Articles

| column | type |
| ------ | ---- |
| id | SERIAL PRIMARY KEY |
| title | VARCHAR(200) NOT NULL |
| body | TEXT NOT NULL |

### Comments

| column | type |
| ------ | ---- |
| id | SERIAL PRIMARY KEY |
| name | VARCHAR(64) NOT NULL |
| body | VARCHAR(200) NOT NULL |
| articleId | INTEGER REFERENCES articles |

### Tags

| column | type |
| ------ | ---- |
| id | SERIAL PRIMARY KEY |
| name | VARCHAR(64) NOT NULL |
| body | VARCHAR(200) NOT NULL |

### Article / Tag xref

| column | type |
| ------ | ---- |
| tagId | INTEGER REFERENCES tags |
| articleId | INTEGER REFERENCES articles |
