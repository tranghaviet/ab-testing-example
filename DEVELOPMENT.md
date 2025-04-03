## Initialization

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
