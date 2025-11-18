# High Adventure Camps - Deployment Guide

## Environment Setup

### 1. MongoDB Setup
- Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
- Create a new cluster
- Get your connection string
- Add the connection string to `.env.local` as `MONGODB_URI`

### 2. Clerk Authentication Setup
- Sign up at https://clerk.com
- Create a new application
- Copy your API keys to `.env.local`:
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
  - `CLERK_SECRET_KEY`

### 3. Local Development
\`\`\`bash
# Install dependencies
npm install

# Create .env.local file with MongoDB and Clerk credentials
cp .env.example .env.local

# Run development server
npm run dev

# Visit http://localhost:3000
\`\`\`

### 4. Database Initialization
MongoDB collections are automatically created on first use. The app uses the following collections:
- `tours` - Adventure packages and tours
- `activities` - Adventure activities
- `leads` - Customer inquiries from contact form

### 5. Deployment to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard:
   - MONGODB_URI
   - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
   - CLERK_SECRET_KEY
   - NEXT_PUBLIC_SITE_URL
4. Deploy!

### 6. Admin Setup
1. After deployment, sign up using Clerk
2. Update your Clerk user ID in the admin access list
3. Access admin panel at /admin

## Security Checklist
- [ ] MongoDB connection string is secure
- [ ] Clerk keys are correctly configured
- [ ] Middleware is protecting admin routes
- [ ] Environment variables are set in Vercel
- [ ] CORS is properly configured for API calls
- [ ] HTTPS is enabled in production

## Performance Optimization
- Images are optimized with Next.js Image component
- Routes are cached for better performance
- API responses are optimized with proper headers
- SSR is used for SEO-critical pages
- CSR is used for interactive admin dashboard
