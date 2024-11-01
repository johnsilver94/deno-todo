# Deno Todo API

This project is a RESTful API for managing todos, built with Deno and MongoDB.

## Features

- Get all todos
- Add a new todo
- Get a specific todo by ID
- Update a todo
- Delete a todo
- Get count of incomplete todos

## Prerequisites

- [Deno](https://deno.land/) installed on your machine
- MongoDB database

## Installation

1. Clone this repository:

```bash
git clone https://github.com/yourusername/deno-todo.git
cd deno-todo
```

2. Set up your environment variables (create a `.env` file in the root directory):

```bash
MONGO_URI=your_mongodb_connection_string
```

## Running the Application

To start the server, run:

```bash
deno run --allow-net --allow-read --allow-env server.ts
```

## API Endpoints

- `GET /todos`: Get all todos
- `POST /todos`: Add a new todo
- `GET /todos/:id`: Get a specific todo
- `PUT /todos/:id`: Update a todo
- `DELETE /todos/:id`: Delete a todo
- `GET /todos/incomplete`: Get count of incomplete todos

## Project Structure

- `server.ts`: Main application file
- `controllers/todoController.ts`: Contains all the todo-related controller functions
- `db.ts`: Database connection and configuration

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
