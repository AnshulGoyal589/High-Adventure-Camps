# High Adventure Camps - Website

Professional adventure tourism website built with Next.js, TypeScript, Tailwind CSS, MongoDB, and Clerk authentication.

## Features

### Customer Pages
- **Home Page**: Hero video section, about us, image carousel
- **About Page**: Company mission, values, and statistics
- **Packages Page**: Browse adventure tours with filters
- **Activities Page**: View individual adventure activities
- **Contact Page**: Contact information and inquiry form
- **Contact Popup**: Auto-opens on site visit for lead generation

### Admin Dashboard
- **Tours Management**: Create, edit, delete adventure packages
- **Activities Management**: Manage adventure activities
- **Leads Management**: View and manage customer inquiries
- **Authentication**: Secure admin access with Clerk

### Technical Features
- **SEO Optimized**: Metadata, structured data, sitemap support
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **TypeScript**: Full type safety throughout the application
- **MongoDB**: Scalable database for storing content
- **Clerk Auth**: Secure authentication and user management
- **SSR & CSR**: Optimized rendering for performance and SEO
- **API Routes**: RESTful API for content management
- **Security**: Environment variables, middleware protection, validation

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: MongoDB
- **Authentication**: Clerk
- **Validation**: Custom validation utilities
- **API**: Next.js API Routes

## Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account
- Clerk account
- Git

### Installation

1. Clone the repository
\`\`\`bash
git clone https://github.com/yourusername/high-adventure-camps.git
cd high-adventure-camps
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Create `.env.local` file
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Add your credentials to `.env.local`

5. Run development server
\`\`\`bash
npm run dev
\`\`\`

6. Open http://localhost:3000

## Project Structure

\`\`\`
high-adventure-camps/
├── app/
│   ├── api/              # API routes for CRUD operations
│   ├── admin/            # Admin dashboard pages
│   ├── [pages]/          # Customer-facing pages
│   ├── layout.tsx        # Root layout with Clerk provider
│   ├── globals.css       # Global styles and theme
│   └── page.tsx          # Home page
├── components/
│   ├── navbar.tsx        # Navigation bar
│   ├── footer.tsx        # Footer
│   ├── hero-video.tsx    # Hero video section
│   ├── about-section.tsx # About section
│   ├── image-carousel.tsx# Image carousel
│   └── contact-popup.tsx # Contact form popup
├── lib/
│   ├── mongodb.ts        # MongoDB connection
│   ├── types.ts          # TypeScript interfaces
│   ├── constants.ts      # Application constants
│   └── utils/
│       ├── api-client.ts # API client utilities
│       └── validations.ts# Validation functions
├── middleware.ts         # Clerk middleware for route protection
└── public/               # Static assets
\`\`\`

## API Endpoints

### Tours
- `GET /api/tours` - Get all tours
- `GET /api/tours?featured=true` - Get featured tours
- `POST /api/tours` - Create new tour (admin)
- `GET /api/tours/[id]` - Get specific tour
- `PUT /api/tours/[id]` - Update tour (admin)
- `DELETE /api/tours/[id]` - Delete tour (admin)

### Activities
- `GET /api/activities` - Get all activities
- `GET /api/activities?featured=true` - Get featured activities
- `POST /api/activities` - Create new activity (admin)

### Leads
- `POST /api/leads` - Submit contact form
- `GET /api/leads` - Get all leads (admin)

## Environment Variables

See `.env.example` for full list of required variables:
- `MONGODB_URI` - MongoDB connection string
- `MONGODB_DB` - Database name
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk public key
- `CLERK_SECRET_KEY` - Clerk secret key
- `NEXT_PUBLIC_SITE_URL` - Your site URL (for emails)

## SEO & Performance

- **Metadata**: Dynamic metadata for all pages
- **Structured Data**: Schema.org markup for local business
- **Server-Side Rendering**: Pages rendered server-side for SEO
- **Image Optimization**: Next.js Image component for performance
- **Mobile-First Design**: Responsive on all devices
- **Core Web Vitals**: Optimized for performance metrics

## Admin Access

1. Sign up via Clerk at `/sign-up`
2. Admin user can access `/admin` dashboard
3. Manage tours, activities, and leads
4. View customer inquiries and leads

## Deployment

See `DEPLOYMENT.md` for detailed deployment instructions.

Quick start:
1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy!

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT License - feel free to use this project for your adventure business!

## Support

For issues or questions, please open a GitHub issue or contact support.

---

**High Adventure Camps** - Where Adventure Begins
