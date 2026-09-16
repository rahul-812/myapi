# myapp — Node + Express Starter

A minimal, well-structured Express.js server ready for development.

## Project Structure

```
myapp/
├── src/
│   ├── index.js          # Entry point — app setup & server start
│   └── routes/
│       └── api.js        # /api/* route handlers
├── .env                  # Environment variables (gitignored)
├── .gitignore
└── package.json
```

## Getting Started

```bash
# Install dependencies
npm install

# Development (auto-reload with nodemon)
npm run dev

# Production
npm start
```

## Available Endpoints

| Method | URL           | Description          |
|--------|---------------|----------------------|
| GET    | `/`           | Server health check  |
| GET    | `/api/health` | API health + uptime  |
| GET    | `/api/users`  | List all users       |
| POST   | `/api/users`  | Create a user        |
