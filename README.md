# MyApp - Modern Next.js Application

A modern, full-stack Next.js application built with TypeScript, featuring authentication, payments, and a beautiful dark theme UI.

## 🚀 Features

- **Authentication**: Google OAuth with NextAuth.js
- **Payments**: Stripe integration for subscriptions
- **Database**: PostgreSQL with Prisma ORM
- **State Management**: Zustand for client-side state
- **API**: tRPC for type-safe client-server communication
- **UI**: shadcn/ui components with dark theme
- **Styling**: Tailwind CSS with minimal color palette
- **Type Safety**: Full TypeScript support

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Authentication**: NextAuth.js with Google Provider
- **Database**: PostgreSQL with Prisma
- **Payments**: Stripe
- **State Management**: Zustand
- **API**: tRPC
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Google OAuth credentials
- Stripe account (for payments)

## 🚀 Getting Started

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd your-project
npm install
```

### 2. Environment Setup

Copy the `.env.local` file and update the variables:

```bash
cp .env.local .env.local.example
```

Update the following variables in `.env.local`:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/your_database_name"

# NextAuth.js
NEXTAUTH_SECRET="your-nextauth-secret-key-here-make-it-long-and-random"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Stripe
STRIPE_PUBLISHABLE_KEY="pk_test_your-stripe-publishable-key"
STRIPE_SECRET_KEY="sk_test_your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="whsec_your-stripe-webhook-secret"
STRIPE_PRICE_ID="price_your-stripe-price-id"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your-stripe-publishable-key"
NEXT_PUBLIC_STRIPE_PRICE_ID="price_your-stripe-price-id"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Optional: View database in Prisma Studio
npx prisma studio
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth.js routes
│   │   ├── trpc/          # tRPC routes
│   │   └── webhooks/      # Stripe webhooks
│   ├── auth/              # Authentication pages
│   ├── subscription/      # Subscription pages
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── auth/              # Authentication components
│   ├── layout/            # Layout components
│   ├── providers/         # Context providers
│   ├── subscription/      # Subscription components
│   └── ui/                # shadcn/ui components
├── lib/                   # Utility libraries
│   ├── auth.ts            # NextAuth configuration
│   ├── prisma.ts          # Prisma client
│   ├── stripe.ts          # Stripe server config
│   ├── stripe-client.ts   # Stripe client config
│   ├── stripe-utils.ts    # Stripe utilities
│   ├── trpc.ts            # tRPC client config
│   └── utils.ts           # General utilities
├── server/                # tRPC server
│   └── api/               # API routers
├── stores/                # Zustand stores
├── types/                 # TypeScript type definitions
└── globals.css            # Global styles
```

## 🔧 Configuration Details

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`

### Stripe Setup

1. Create a [Stripe account](https://stripe.com/)
2. Get your API keys from the dashboard
3. Create a product and price in Stripe dashboard
4. Set up webhook endpoint: `http://localhost:3000/api/webhooks/stripe`
5. Subscribe to these events: `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`

### Database Setup

The application uses PostgreSQL with Prisma. The schema includes:
- User authentication tables (NextAuth.js)
- Stripe customer and subscription data

## 🎨 UI Components

The application uses shadcn/ui components with a dark theme and minimal color palette:
- Consistent neutral/grayscale colors
- Dark theme by default
- Responsive design
- Accessible components

## 🔒 Authentication Flow

1. User clicks "Sign in with Google"
2. NextAuth.js handles OAuth flow
3. User data stored in PostgreSQL via Prisma
4. Session management with JWT tokens

## 💳 Payment Flow

1. User clicks subscription button
2. tRPC creates Stripe checkout session
3. User redirected to Stripe Checkout
4. Webhook updates user subscription status
5. User redirected back to success/cancel page

## 🚀 Deployment

### Environment Variables

Make sure to set all environment variables in your deployment platform.

### Database Migration

```bash
npx prisma migrate deploy
```

### Build and Start

```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues, please check the following:

1. All environment variables are set correctly
2. Database is running and accessible
3. Google OAuth credentials are configured
4. Stripe webhook is properly set up

For additional help, please open an issue in the repository.
