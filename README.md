# NestJS Notes App with Prisma & SQLite

This is a simple Articles app built with **NestJS**, **Prisma ORM**, and **SQLite**.  
Everything (setup, env, API examples,tests) is included in this one file.

## Features
- Create, read, update, and delete articles.
- Prisma ORM with SQLite database.
- Unit & e2e testing with Jest.
- Uses `ulid()` for IDs.

## Tech Stack
- NestJS — Framework
- Prisma — ORM
- SQLite — Database
- Jest — Testing framework

##. Installation
- Clone repository
   `git clone https://github.com/mdmuche/kodecamp5_stage7.git`

- Change directory
   `cd kodecamp5_stage7`

- Install dependency
   `npm install`

- Install dev-dependency
  `npm install --save-dev nodemon`

- Setup .env config files

  ```
  PORT=your_port_here
  NODE_ENV=your_development_here
  ```

- Push schema and generate client
npx prisma db push
npx prisma generate

- Running the App
npm run start:dev       # Development
npm run build
npm run start:prod      # Production

# API Endpoints:
# POST /api/articles
---

## Create, GetAllArticles, GetArticle, UpdateArticle, DeleteArticle

### Create Article

### POST /api/articles  
Creates a new article.

Request body

```

Content-Type: application/json

{
  "title": "My First Article",
  "content": "This is the content of my first article."
}

```
# GET /api/articles
Retrieves all articles.

# GET /api/articles/:id
Retrieves a single article by its id

# PATCH /api/articles/:id
Updates an existing article by id.

Request body

```

Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content for the article."
}

```

# DELETE /api/articles/:id
Deletes an article by id.

# Run tests
npm run test:e2e
