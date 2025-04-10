## Features

This project is a minimalistic e-commerce website built with modern web technologies including Next.js, Tailwind CSS, and Shadcn UI for a sleek, responsive design. It features a dynamic shopping cart and real-time A/B testing capabilities.

Additional technologies utilized in this project:
- **Next.js:** For both SSR and SSG, ensuring fast, SEO-friendly rendering.
- **Tailwind CSS:** For custom, utility-first styling that accelerates design implementation.
- **Shadcn UI:** For pre-built, accessible UI components.
- **TypeScript:** Providing static typing for improved code quality and developer experience.
- **Prisma & PostgreSQL:** Implementing a robust backend with a persistent data store.
- **ESLint & Prettier:** To enforce code quality and maintain consistency across the codebase.
- **Lefthook & Husky** To run hook linting before devs push code to the main branch (failed fast)
- **Performance Optimizations:** Utilizing image optimization, bundling.
- **Zod** to validate `.env` variables and forms
- **Local Storage** for cart item manipulation (demo purpose)

## Development guide

- Clone this project
- Copy `.env.example` to `.env` then update it
- Install deps: `yarn`
- Run dev mode: `yarn dev`

### Database

Ref: https://www.prisma.io/docs/orm/prisma-migrate/getting-started

To reset the database schema and content, then run `migrate` and `generate`:

```sh
yarn prisma migrate reset --skip-seed
```
Then

```sh
# yarn prisma generate
# yarn prisma migrate dev --name init
# yarn prisma db push --force-reset
yarn prisma db seed
```

### LLM Services

Currently I use free Copilot Cloud API

We could use OpenAI API as well by following the guide: https://docs.copilotkit.ai/guides/self-hosting
