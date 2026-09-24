# Digital Bookshelf API

A RESTful API built with Node.js, Express, and Mongoose for managing a digital library's book inventory. The API supports creating, viewing, updating, and deleting book records stored in MongoDB Atlas.

## Features

- Create new books
- Retrieve all books
- Retrieve a single book by ID
- Update existing books
- Delete books
- Mongoose schema validation
- Unique ISBN validation
- MongoDB Atlas database connection
- Modular Express routes
- Environment variables for sensitive configuration

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv
- Postman

## Installation

1. Clone the repository:

```bash
git clone <your-repository-url>
```

2. Navigate into the project directory:

```bash
cd digital-bookshelf-api
```

3. Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root of the project:

```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

Do not commit the `.env` file to GitHub.

## Running the Application

Start the server with:

```bash
node server.js
```

The API will run at:

```text
http://localhost:3000
```

## Project Structure

```text
digital-bookshelf-api/
│
├── db/
│   └── connection.js
│
├── models/
│   └── Book.js
│
├── routes/
│   └── bookRoutes.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

## Book Schema

Each book contains the following fields:

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | String | Yes | Title of the book |
| `author` | String | Yes | Author of the book |
| `isbn` | String | No | Unique ISBN number |
| `publishedDate` | Date | No | Date the book was published |
| `inStock` | Boolean | No | Whether the book is currently in stock |

The `inStock` field defaults to `true`.

## API Endpoints

### Create a Book

```text
POST /api/books
```

Example request body:

```json
{
    "title": "1984",
    "author": "George Orwell",
    "isbn": "9780451524935",
    "publishedDate": "1949-06-08",
    "inStock": true
}
```

Returns the newly created book with a `201 Created` status.

### Get All Books

```text
GET /api/books
```

Returns an array containing all books.

### Get One Book

```text
GET /api/books/:id
```

Returns a single book using its MongoDB `_id`.

### Update a Book

```text
PUT /api/books/:id
```

Example request body:

```json
{
    "title": "1984 Updated",
    "author": "George Orwell",
    "isbn": "9780451524935",
    "publishedDate": "1949-06-08",
    "inStock": false
}
```

Returns the updated book with a `200 OK` status.

### Delete a Book

```text
DELETE /api/books/:id
```

Returns a confirmation message and the deleted book.

## Testing

The API can be tested using Postman or another API client.

Test the endpoints in the following order:

1. `POST /api/books`
2. `GET /api/books`
3. `GET /api/books/:id`
4. `PUT /api/books/:id`
5. `DELETE /api/books/:id`

When testing endpoints that require an ID, use the `_id` returned from the POST request.

## Reflection Questions

### 1. Why is it beneficial to separate your routes, models, and database connection into different directories?

Separating routes, models, and database connections keeps the application organized and makes the code easier to maintain. Each part of the application has a specific responsibility. The database connection handles communication with MongoDB, the models define the structure and validation of data, and the routes handle HTTP requests and responses. This separation also makes the application easier to debug, modify, and expand.

### 2. What is the difference between PUT and PATCH HTTP methods, and which one does your PUT /:id endpoint more closely resemble?

`PUT` is generally used to replace an entire resource, while `PATCH` is normally used to make a partial update to an existing resource.

The `PUT /:id` endpoint in this project more closely resembles `PATCH` because it updates the fields provided in `req.body` rather than requiring every field of the book to be replaced.

### 3. In the DELETE route, what is a good practice for the response you send back to the client after a successful deletion? Should you send the deleted object, a simple success message, or something else? Why?

A clear success message is a good practice because it confirms that the deletion was successful. Returning the deleted object can also be useful because it tells the client exactly which resource was removed. In this project, the DELETE route returns both a confirmation message and the deleted book, providing useful information to the client.

## Author

Truong Pham
