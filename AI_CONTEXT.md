# AI Context & Rules

## Project Overview
This is a "Mini Cloud Hard Drive" application.
- **Stack**: Node.js, Express.js, Prisma ORM.
- **Frontend**: Server-side rendering (likely EJS/Pug based on `views/`) with Vanilla CSS.

## Coding Standards
1. **Modules**:
   - Use ES Modules (`import`/`export`) syntax for all server-side code.
   - Ensure all route files properly export their router instance.

2. **Database Interaction**:
   - Use the `prisma` client for all database operations.
   - Always await asynchronous Prisma calls.
   - Handle database errors gracefully (e.g., `try/catch` blocks).

3. **Routing & Controllers**:
   - Keep route definitions clean; delegate complex logic to controllers if available.
   - validate all inputs from `req.body` and `req.params` before using them.

4. **Authentication**:
   - Use the `utils.checkAuth` middleware for any protected routes that require a logged-in user.

## Workflow
1. **Context First**: Read relevant files before proposing changes to understand the existing patterns.
2. **Non-Destructive**: Do not remove existing logic without understanding its purpose.
