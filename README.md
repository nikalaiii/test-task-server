# NestJS MongoDB JWT Server

## Overview

This project is a RESTful API server built with [NestJS](https://nestjs.com/), MongoDB (via Mongoose), and JWT authentication. It provides user registration, login, JWT validation, and a paginated items resource, suitable as a starter for secure, scalable Node.js backends.

---

## Tech Stack
- **Node.js** & **TypeScript**
- **NestJS** framework
- **MongoDB** with **Mongoose** (ODM)
- **JWT** authentication
- **Passport.js** for auth strategies
- **Prisma** (dependency, not used in current code)
- **Jest** for testing

---

## Project Structure

- `src/auth/` – Authentication logic (register, login, JWT validation)
- `src/users/` – User schema/model
- `src/items/` – Item schema/model, item endpoints
- `src/seed.ts` – Script to seed mock data
- `postman_collection.json` – Example API requests for Postman

---

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm
- MongoDB Atlas or local MongoDB instance

### Installation
```bash
npm install
```

### Environment Variables
Create a `.env` file in the root directory with the following variables:
```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
```

### Running the Server
- **Development:**
  ```bash
  npm run start:dev
  ```
- **Production:**
  ```bash
  npm run build
  npm run start:prod
  ```
- **Tests:**
  ```bash
  npm run test
  npm run test:e2e
  npm run test:cov
  ```

### Seeding Mock Data
To create mock users and items:
```bash
npm run build
node dist/seed.js
```
This seeds two users (`alice`, `bob`) and three items.

---

## API Documentation

### Authentication

#### Register
- **POST** `/auth/register`
- **Body:**
  ```json
  { "login": "alice", "password": "password1" }
  ```
- **Response:**
  - User object (without password)

#### Login
- **POST** `/auth/login`
- **Body:**
  ```json
  { "login": "alice", "password": "password1" }
  ```
- **Response:**
  - `{ "access_token": "<JWT>" }`

#### Validate JWT
- **GET** `/auth/validate`
- **Headers:**
  - `Authorization: Bearer <JWT>`
- **Response:**
  - User object if token is valid

### Items (Protected)

#### Get Paginated Items
- **GET** `/items?page=1&limit=2`
- **Headers:**
  - `Authorization: Bearer <JWT>`
- **Response:**
  - Paginated list of items, each with `title`, `description`, and `owner`

---

## Models

### User
- `login` (string, unique, required)
- `password` (string, required)

### Item
- `title` (string, required)
- `description` (string, optional)
- `owner` (User reference, required)

---

## JWT Usage
After login, use the returned JWT in the `Authorization` header for protected endpoints:
```
Authorization: Bearer <your_token>
```

---

## Postman Collection
A ready-to-use Postman collection is provided as `postman_collection.json` for all endpoints. Import it into Postman to test registration, login, JWT validation, and item retrieval.

---

## Deployment
For production deployment, build the project and use `npm run start:prod`. For advanced deployment (Docker, cloud, etc.), refer to [NestJS deployment docs](https://docs.nestjs.com/deployment).

---

## Resources
- [NestJS Documentation](https://docs.nestjs.com)
- [NestJS Discord](https://discord.gg/G7Qnnhy)
- [NestJS Courses](https://courses.nestjs.com/)

---

## License
This project is UNLICENSED. See `package.json` for details.
