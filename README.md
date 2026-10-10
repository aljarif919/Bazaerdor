# বাজার দর (BazarDor)

বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর এক নজরে দেখার জন্য responsive Bengali-language web application.

## Technologies
- Next.js App Router + React + TypeScript
- Tailwind CSS v4 and custom responsive styles
- Better Auth (email/password, optional Google and GitHub OAuth)
- SQLite via `better-sqlite3` (v13 includes bundled prebuilds for current Node versions)
- `react-hot-toast` for feedback
- Lucide React icons
- BazarDor product API with alternate API fallback

## Key features
1. Responsive homepage with a slower, continuously scrolling API-backed price ticker and the basket illustration extracted from the supplied Figma file.
2. Rising/falling product sections and category-based browsing.
3. Product detail route with summary, minimum/maximum/average prices and market comparison.
4. Category sorting: default, low-to-high and high-to-low numeric price sorting.
5. Better Auth sign up/sign in/sign out, optional Google/GitHub OAuth, protected profile and update-name page.
6. Loading skeletons, toast notifications and friendly 404 page.
7. Bengali digits and currency formatting.
8. Vercel-compatible Next.js App Router dynamic routes.

## Run locally
1. Install Node.js 22 LTS or Node.js 24 LTS (64-bit Windows).
2. Extract `BazarDor-API-Integrated.zip` and open the folder containing `package.json` in VS Code.
3. Run `npm install`. The project pins `better-sqlite3` v13 to avoid the Node 24/Python build failure seen with v11.
4. Copy `.env.example` to `.env.local`.
5. Set a secure `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL=http://localhost:3000`.
6. Run `npm run dev` and open `http://localhost:3000`.

## Better Auth OAuth setup
Email/password works without OAuth credentials. To enable Google and GitHub:
- Create OAuth apps in the Google Cloud Console and GitHub Developer settings.
- Set `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`.
- Configure the callback URL to `http://localhost:3000/api/auth/callback/google` and `http://localhost:3000/api/auth/callback/github`; use your production URL after deployment.
- For production, use a persistent database and set a unique secret. The included SQLite file is suitable for local development; serverless deployment may require a persistent SQL provider/adapter.

## Product API
Primary: `https://api.api-store.workers.dev/api/bazardor`
Alternative: `https://api.abcz.workers.dev/api/bazardor`
Expected endpoints: `/products`, `/products?category=chal`, `/products/:id`, `/categories`, `/categories/:slug`. The UI does not substitute sample prices when the API is unavailable. It shows a clear unavailable/empty state instead of presenting made-up values as real market prices. Product images and market/district price rows are shown when the API provides them; missing values are not invented.

## Deployment
Push to GitHub and import the repository into Vercel. Add all environment variables in Vercel Project Settings. Confirm auth callback URLs and use a persistent database before production deployment. Then fill in:
- Live Link: `https://your-project.vercel.app`
- GitHub Repository Link: `https://github.com/your-username/bazardor`
