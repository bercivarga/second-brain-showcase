This is a portfolio showcase project inspired by [Reflect](https://reflect.app). The project uses `Next.js v14.x` as a full-stack framework, with `TailwindCSS` as the CSS framework and `shadcdn/ui` for more complex components. I use `Clerk`'s Next.js SDK for authentication and user management, while the rest of the backend and the database is hosted on [Railway](https://railway.app). I use `Prisma ORM` in combination with a `postgresql` DB. For the front-end deployments, I use `Vercel`.

This project was made over a weekend and has some missing features still:

- [ ] Test coverage with Vitest
- [ ] Fully functional markdown editor for notes
- [ ] Browsing notes based on tags
- [ ] Browse notes in an agenda view based on creation/update date
- [ ] Dark mode
- [ ] Skeletons for loading pages
- [ ] Home page particles refactors for better performance
- [ ] Note sentiment score assignments with ChatGTP
- [ ] Visualize sentiment score on the 3D note map
- [ ] Create own 3D mapping solution as the currently used library has some issues

## Getting Started

Before building the project, it is key to set up the required environment variables needed for the project. Make sure that you have a `.env` or `.env.local` file at the root of your project containing the following variables:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/notes
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/api/sign-up
DATABASE_URL=
```

Make sure that you have a `postgresql` database hosted somewhere (or running locally). Also, you will need a `Clerk` project in order to make the authentication flow work. More info on this can be found in the [Clerk docs](https://clerk.com/docs/quickstarts/nextjs).

This project uses `Prisma` as the ORM. If you are creating a new database, make sure that you migrate with Prisma so that you have the tables ready for the incoming requests. More info on this can be found in the [Prisma docs](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql).

## Running the project locally

```bash
# First, install the dependencies:
npm install

# The previous command should also install the Husky pre-commit hooks.
# You can make sure that the scripts initialized by running this command:
npm prepare

# To run the development server, run:
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
