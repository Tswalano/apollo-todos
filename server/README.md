# Express Prisma Apollo Tasks

This is an Express.js application with Prisma ORM for managing todos, user authentication, and authorization which uses typescript and mysql

## Prerequisites

Before running this application, ensure you have the following dependencies installed:

- Node.js (https://nodejs.org/)
- npm (comes with Node.js)
- MySql

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Tswalano/apollo-todos.git
   ```

2. **Install dependencies:**

   ```bash
   cd ./apollo-todos/server
   npm install
   ```

3. **Database Setup:**

   - REF: https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-mysql
   - Ensure you have a MySQL database running.
   - Configure your database connection in the `.env` file. You can use the example structure:

     ```bash
        npm init -y
        npm install prisma typescript ts-node @types/node --save-dev
     ```

     ```bash
     npx prisma init
     ```

     This command does two things:
     - creates a new directory called prisma that contains a file called schema.prisma, which contains the Prisma schema with your database connection variable and schema models
     - creates the .env file in the root directory of the project, which is used for defining environment variables (such as your database connection)

     Update the `DATABASE_URL` in the `.env` file with your MySQL database connection URL.

   - Run Prisma migrations to create tables in the database:

     ```bash
     npx prisma migrate dev
     ```

4. **Environment Variables:**

   Update the `.env` file in the root of the project with the following content:

   ```env
   SECRET_KEY=your_secret_key
   ```

   Replace `your_secret_key` with a strong and secret key for JWT token encryption.

5. **Start the Application:**

   ```bash
   npm start
   ```

   The application will be accessible at `http://localhost:3000`.

## API Endpoints

- **GET /todos**
  - Fetch all todos for the authenticated user.

- **POST /create-todo**
  - Create a new todo for the authenticated user.

- **POST /update-todo**
  - Update the status of a todo for the authenticated user.

- **POST /delete-todo**
  - Delete a todo for the authenticated user.

- **POST /signup**
  - Create a new user account.

- **POST /login**
  - Authenticate and log in a user.