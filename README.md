# Content Playlist Application

A production-ready Next.js 15 application featuring Auth.js v5 authentication with middleware and Cusdis comments. Built with TypeScript, Tailwind CSS v4, and designed with GDPR compliance in mind.

## Features

- **🔐 Authentication**: Auth.js v5 with GitHub and Google OAuth providers
- **🛡️ Middleware Protection**: Route-based authentication with Next.js middleware
- **💬 Comments**: Cusdis for lightweight, privacy-first commenting
- **⚡ Modern Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS v4
- **🎨 Dark Mode**: Automatic dark mode support
- **📦 Turbopack**: Fast development and build times
- **✨ Code Quality**: Biome for linting and formatting

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Authentication**: Auth.js v5 (NextAuth.js)
- **Comments**: Cusdis (Hosted Service)
- **Bundler**: Turbopack
- **Linting**: Biome

## Architecture & Design Decisions

This application implements recommendations from the comprehensive analysis document (`CLAUDE.md`) comparing authentication and social widget solutions for Next.js applications.

### Why Auth.js v5?

Auth.js v5 was chosen for authentication because:

- **Zero Cost**: Completely free with no MAU limits or pricing surprises
- **80+ OAuth Providers**: Support for GitHub, Google, and many more
- **No Vendor Lock-in**: Complete control over authentication logic
- **TypeScript Support**: Excellent type safety with module augmentation
- **Production Ready**: Large community with extensive documentation

**Alternatives Considered**:
- **Clerk**: Faster setup (7-15 min) but expensive ($125/month for 50k MAUs)
- **Supabase Auth**: Great value ($25/month for 100k MAUs) but requires Supabase backend
- **Auth0**: Enterprise features but problematic pricing (hard 30k MAU cap)

### Why Cusdis?

Cusdis was selected for comments because:

- **Lightweight**: Minimal JavaScript footprint, fast loading
- **Privacy-First**: No tracking, no ads, GDPR-compliant
- **Simple Setup**: Just an app ID required, no complex configuration
- **Hosted Service**: No infrastructure to maintain
- **Open Source**: Self-hosting option available if needed

**Alternatives Considered**:
- **Giscus**: Free but requires GitHub account and repository setup
- **Hyvor Talk**: Better for general audiences ($5/month) but requires payment
- **Disqus**: Industry standard but privacy concerns and expensive ($99/month Pro)

### Security Implementation

Following the CVE-2025-29927 disclosure, this application implements the **Data Access Layer (DAL) pattern** where:

1. **Middleware serves as optimistic check**: Prevents rendering protected pages for unauthenticated users
2. **DAL provides actual security**: Every data access point independently verifies authentication
3. **Defense in depth**: Never trust middleware alone - always validate at the data layer

## Getting Started

### Prerequisites

- Node.js 20+ installed
- GitHub account (for OAuth)
- Google Cloud account (optional, for Google OAuth)
- Cusdis account (sign up at https://cusdis.com)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd felippe
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```

4. **Configure your `.env.local`** file following the guide below.

5. **Run the development server**:
   ```bash
   npm run dev
   ```

6. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Environment Variables Setup Guide

### Step 1: Generate AUTH_SECRET

The `AUTH_SECRET` is used to encrypt JWT tokens and session data.

```bash
openssl rand -base64 32
```

Add to `.env.local`:
```env
AUTH_SECRET=<generated-secret>
```

### Step 2: Configure GitHub OAuth

1. **Go to GitHub Settings**:
   - Visit https://github.com/settings/developers
   - Click "OAuth Apps" → "New OAuth App"

2. **Fill in the application details**:
   - **Application name**: Content Playlist (or your app name)
   - **Homepage URL**: `http://localhost:3000` (for development)
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`

3. **Get your credentials**:
   - After creating the app, copy the **Client ID**
   - Generate a new **Client Secret**

4. **Add to `.env.local`**:
   ```env
   AUTH_GITHUB_ID=your-client-id
   AUTH_GITHUB_SECRET=your-client-secret
   ```

**For Production**:
- Create a separate OAuth app for production
- Use your production URL (e.g., `https://yourapp.com`)
- Update callback URL to `https://yourapp.com/api/auth/callback/github`

### Step 3: Configure Google OAuth (Optional)

1. **Go to Google Cloud Console**:
   - Visit https://console.cloud.google.com/
   - Create a new project or select an existing one

2. **Enable Google+ API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API" and enable it

3. **Create OAuth Credentials**:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Choose "Web application"

4. **Configure OAuth consent screen** (if prompted):
   - User type: External
   - Add your app name and contact email
   - Add scopes: `email`, `profile`, `openid`

5. **Set authorized redirect URIs**:
   - Add: `http://localhost:3000/api/auth/callback/google`

6. **Get your credentials**:
   - Copy the **Client ID** and **Client Secret**

7. **Add to `.env.local`**:
   ```env
   AUTH_GOOGLE_ID=your-client-id.apps.googleusercontent.com
   AUTH_GOOGLE_SECRET=your-client-secret
   ```

**For Production**:
- Add your production URL to authorized redirect URIs
- Example: `https://yourapp.com/api/auth/callback/google`

### Step 4: Configure Cusdis

1. **Sign up for Cusdis**:
   - Visit https://cusdis.com
   - Create an account or sign in with GitHub

2. **Create a new site**:
   - Click "Add new site" in the dashboard
   - Enter your website name and URL
   - Click "Create"

3. **Get your App ID**:
   - After creating the site, copy the **App ID**
   - It looks like: `dde9509f-da1b-408f-8551-14124f2578af`

4. **Add to `.env.local`**:
   ```env
   NEXT_PUBLIC_CUSDIS_APP_ID=your-app-id-here
   ```

**Important Notes**:
- The variable must start with `NEXT_PUBLIC_` to be available in the browser
- Comments are stored on Cusdis servers (or self-hosted if you prefer)
- You can moderate comments through the Cusdis dashboard

### Complete `.env.local` Example

```env
# Auth.js Configuration
AUTH_SECRET=your-generated-secret-32-chars

# GitHub OAuth
AUTH_GITHUB_ID=Iv1.abc123def456
AUTH_GITHUB_SECRET=abc123def456ghi789jkl012mno345pqr678stu

# Google OAuth (Optional)
AUTH_GOOGLE_ID=123456789-abc123def456.apps.googleusercontent.com
AUTH_GOOGLE_SECRET=GOCSPX-abc123def456ghi789

# Cusdis Configuration
NEXT_PUBLIC_CUSDIS_APP_ID=dde9509f-da1b-408f-8551-14124f2578af
```

## Available Scripts

```bash
# Start development server with Turbopack
npm run dev

# Create production build
npm run build

# Start production server (requires build first)
npm start

# Run linter
npm run lint

# Format code
npm run format
```

## Project Structure

```
felippe/
├── src/
│   ├── app/
│   │   ├── api/auth/[...nextauth]/  # Auth.js API routes
│   │   ├── auth/signin/             # Custom sign-in page
│   │   ├── dashboard/               # Protected page example
│   │   ├── layout.tsx               # Root layout with fonts
│   │   ├── page.tsx                 # Home page
│   │   └── globals.css              # Global styles
│   └── components/
│       ├── auth-button.tsx          # Authentication UI
│       └── comments.tsx             # Cusdis comments widget
├── auth.config.ts                   # Edge-compatible auth config
├── auth.ts                          # Auth.js configuration
├── middleware.ts                    # Route protection middleware
├── .env.example                     # Environment variables template
├── .env.local                       # Your local environment (git-ignored)
└── CLAUDE.md                        # Project documentation & analysis
```

## How It Works

### Authentication Flow

1. **User clicks "Sign in with GitHub/Google"**
2. **Auth.js redirects to OAuth provider**
3. **User authorizes the application**
4. **Provider redirects back with authorization code**
5. **Auth.js exchanges code for user information**
6. **JWT session token is created and stored in cookies**
7. **User is redirected to dashboard or requested page**

### Middleware Protection

The `middleware.ts` file intercepts all requests and:

1. Checks if user has a valid session
2. If accessing `/dashboard/*` without authentication → redirects to `/auth/signin`
3. If authenticated → allows access to protected routes
4. Public routes (home, sign-in) are always accessible

### Comments System

1. **Cusdis widget loads** on the page via script injection
2. **User can comment** with name/email (no account required)
3. **Comments are stored on Cusdis servers** (or self-hosted instance)
4. **Moderation dashboard** available at https://cusdis.com
5. **Privacy-focused** - no tracking or third-party analytics

## Deployment

### Vercel (Recommended)

1. **Push your code to GitHub**

2. **Import project in Vercel**:
   - Visit https://vercel.com/new
   - Import your repository
   - Vercel auto-detects Next.js

3. **Configure environment variables**:
   - Add all variables from `.env.local` to Vercel
   - Update OAuth redirect URLs to use your production domain
   - Example: `https://yourapp.vercel.app/api/auth/callback/github`

4. **Deploy**:
   - Vercel will automatically deploy on push to main branch

### Other Platforms

This app can be deployed to any platform supporting Node.js:

- **Netlify**: Use Next.js runtime
- **Railway**: Supports Next.js out of the box
- **Cloudflare Pages**: Compatible with edge runtime
- **Self-hosted**: Use `npm run build` then `npm start`

**Important**: Update OAuth callback URLs in GitHub/Google settings to match your production domain.

## GDPR Compliance

This application is designed with privacy and GDPR compliance in mind:

### Data Collection

- **Authentication**: Only collects necessary OAuth data (email, name, profile image)
- **Comments**: Stored in GitHub Discussions (user controls their own data)
- **No Analytics**: No Google Analytics or third-party tracking by default
- **No Cookies** (except necessary):
  - Auth.js session cookie (necessary for authentication)
  - No advertising or tracking cookies

### User Rights

- **Right to Access**: Users can view their data in GitHub
- **Right to Deletion**: Users can delete their GitHub account
- **Right to Portability**: Comments are in GitHub Discussions (portable)
- **Right to Object**: Users can sign out and delete sessions

### Recommendations for Production

1. **Add Privacy Policy**: Document what data you collect and why
2. **Add Terms of Service**: Set rules for using your platform
3. **Cookie Consent** (if required): Add banner if you add analytics
4. **Data Processing Agreement**: If processing EU citizen data

## Troubleshooting

### Authentication Issues

**Problem**: "Error: Configuration" when signing in

**Solution**:
- Verify `AUTH_SECRET` is set in `.env.local`
- Ensure OAuth credentials are correct
- Check callback URLs match exactly (no trailing slashes)

**Problem**: "Access Denied" after OAuth

**Solution**:
- Verify OAuth app is active
- Check if email is verified on GitHub/Google
- Ensure OAuth app has correct permissions

### Cusdis Not Loading

**Problem**: Comments section is empty

**Solution**:
- Verify `NEXT_PUBLIC_CUSDIS_APP_ID` is set correctly
- Check browser console for JavaScript errors
- Ensure the script is loading from https://cusdis.com/js/cusdis.es.js
- Verify your app ID exists in the Cusdis dashboard

**Problem**: Comments not appearing in dashboard

**Solution**:
- Check that you're logged into the correct Cusdis account
- Verify the app ID matches your site
- Wait a few moments as there may be a delay

### Build Errors

**Problem**: "Module not found" errors

**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
```

**Problem**: TypeScript errors

**Solution**:
```bash
npm run lint
# Fix any reported issues
```

## Contributing

This is a template project. Feel free to:

- Fork and customize for your needs
- Add more OAuth providers
- Implement additional features
- Improve styling and UX

## License

MIT License - feel free to use this project as a template for your own applications.

## Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Auth.js Documentation](https://authjs.dev/)
- [Cusdis Documentation](https://cusdis.com/doc)
- [Tailwind CSS v4](https://tailwindcss.com/docs)

### OAuth Setup
- [GitHub OAuth Apps](https://github.com/settings/developers)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Cusdis Dashboard](https://cusdis.com)

### Analysis & Decisions
- See `CLAUDE.md` for the complete analysis of authentication and social widget options
- Includes pricing comparisons, security considerations, and GDPR compliance details

## Support

If you encounter issues:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review your `.env.local` configuration
3. Verify OAuth app settings
4. Check the [Auth.js documentation](https://authjs.dev/)
5. Open an issue in this repository

---

Built with ❤️ using Next.js 15, Auth.js v5, and Cusdis
