# NBSZ Donor Certificate System

Next.js App Router application for searching verified donors and issuing A4 NBSZ recognition certificates.

## Local setup

1. Copy `.env.example` to `.env` and provide a PostgreSQL connection plus `NEXTAUTH_SECRET`.
2. Run `npm install`, then `npm run prisma:generate`.
3. Apply the schema with `npm run prisma:migrate`.
4. Start the app with `npm run dev`.

The database seed should create users with bcrypt password hashes and assign either `ADMIN` or `CLERK`. The certificate API enforces both roles and records each generated certificate in `CertificateLog`.

## Deployment on Vercel

1. Create a Vercel project from this repository.
2. Add a hosted PostgreSQL database (for example, Neon) and set `DATABASE_URL` in the Vercel project settings.
3. Set `NEXTAUTH_SECRET` to a long random value. Set `NEXTAUTH_URL` to the deployed site URL, including `https://`.
4. Run the Prisma schema against the production database from a trusted shell with the production `DATABASE_URL`:

	```bash
	npx prisma db push
	```

5. Create at least one `User` record with a bcrypt password hash and the required `ADMIN` or `CLERK` role before signing in.

The app is stateless and stores donor records, users, and certificate audit history in PostgreSQL. Vercel handles the web and API deployment; the certificate PDF is generated in the browser so it also works on mobile browsers without server-side file storage.

For local development, copy `.env.example` to `.env`, run `npm install`, `npm run prisma:generate`, and `npm run dev`.