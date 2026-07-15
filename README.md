# Etrade - Full-Stack E-Commerce Platform

A modern, full-featured e-commerce web application built with Next.js, React, and Redux Toolkit. This platform provides a seamless shopping experience for users and comprehensive management capabilities for administrators.

## Features

### User Features

- **Authentication System**: Secure user registration, login, and logout with JWT authentication
- **Product Catalog**: Browse products with search, filtering, and sorting capabilities
- **Shopping Cart**: Add/remove items, update quantities, persistent cart storage
- **Wishlist**: Save favorite products for later purchase
- **Checkout Process**: Multi-step checkout with shipping and payment options
- **Order Management**: View order history and track order status
- **User Profile**: Manage personal information, addresses, and preferences
- **Multi-language Support**: English and Vietnamese language options
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices

### Admin Features (via backend API)

- Product management (CRUD operations)
- Category management
- Order management and fulfillment
- User management
- Inventory tracking

## Technology Stack

### Frontend

- **Framework**: [Next.js 15.4.1](https://nextjs.org/) with React 18.2.0
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) with RTK Query
- **Styling**: [Bootstrap 5.3.3](https://getbootstrap.com/) + Custom SCSS
- **Styling Preprocessor**: [Sass](https://sass-lang.com/)
- **State Persistence**: [Redux Persist](https://github.com/rt2zz/redux-persist)
- **Forms**: [React Hook Form](https://react-hook-form.com/) with validation
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) with JWT
- **Internationalization**: [next-intl](https://next-intl.vercel.app/) (English/Vietnamese)
- **UI Components**:
  - React Slick / Slick Carousel for product sliders
  - React Spinners for loading states
  - React Toastify for notifications
  - SweetAlert2 for beautiful modals
  - FSLightbox for image galleries
- **Icons & Images**:
  - Sharp for image processing
  - React Icons (via various packages)
- **Utilities**:
  - Gray-matter for frontmatter parsing
  - Remark & Remark-HTML for markdown processing
  - Date-fns for date formatting

### Development & DevOps

- **Language**: JavaScript (ES6+)
- **Code Quality**: ESLint with Next.js preset
- **Build Tool**: Next.js built-in compiler (SWc)
- **Styling**: CSS Modules with SCSS
- **Environment Variables**: Dotenv for configuration management
- **API Communication**: RESTful API consumption

### Backend API (Connected Service)

- **Base URL**: Configured via `NEXT_PUBLIC_API_URL` (default: `http://localhost:8080/api/v1`)
- **Authentication**: JWT-based with refresh token mechanism
- **Endpoints**:
  - Auth: `/auth/*` (register, login, logout, refresh)
  - Products: `/products/*` (CRUD operations, filtering)
  - Categories: `/categories/*`
  - Cart: `/cart/*`
  - Wishlist: `/wishlist/*`
  - Orders: `/orders/*`
  - Shipping: `/get-all-shipping`
  - Payment: `/get-all-payment`
  - Checkout: `/orders/checkout`

## Project Structure

```
src/
├── app/                 # Next.js 13+ app router
│   ├── [locale]/        # Internationalized routes
│   │   ├── (auth)/      # Authentication pages
│   │   ├── dashboard/   # User dashboard
│   │   ├── products/    # Product listing and details
│   │   ├── cart/        # Shopping cart
│   │   ├── checkout/    # Checkout process
│   │   ├── orders/      # Order history
│   │   ├── wishlist/    # Wishlist management
│   │   ├── contact/     # Contact page
│   │   └── not-found.js # 404 page
│   ├── api/             # API routes (cookie handling, auth callbacks)
│   ├── layout.js        # Root layout
│   ├── not-found.js     # Global 404
│   └── page.js          # Homepage
├── components/          # Reusable React components
│   ├── header/          # Header components
│   ├── product/         # Product-related components
│   ├── elements/        # UI elements (buttons, forms, etc.)
│   ├── widget/          # Sidebar widgets
│   ├── header/          # Header components
│   ├── testimonial/     # Testimonial components
│   ├── why-choose/      # Why choose us section
│   └── breadcrumb/      # Breadcrumb navigation
├── services/            # Service layers for API calls
│   ├── auth.service.js
│   ├── product.service.js
│   ├── cart.service.js
│   ├── order.service.js
│   ├── payment.service.js
│   ├── shipping.service.js
│   └── category.service.js
├── store/               # Redux store configuration
│   ├── slices/          # Redux slices (auth, cart, product, etc.)
│   ├── provider.js      # Store provider
│   └── storage.js       # Storage utilities
├── styles/              # SCSS stylesheets
│   ├── default/         # Default theme styles
│   ├── dark/            # Dark theme styles
│   ├── elements/        # Component-specific styles
│   ├── header/          # Header styles
│   ├── footer/          # Footer styles
│   ├── shop/            # Shop-specific styles
│   └── rtl/             # Right-to-left language support
├── data/                # Static data and content
│   ├── Products.js      # Product data (mock/fixture)
│   ├── Users.js         # User data (mock/fixture)
│   ├── Comments.js      # Comment data
│   ├── Footer.js        # Footer configuration
│   ├── Testimonial.js   # Testimonial data
│   ├── WhyChoose.js     # Why choose us content
│   └── ...              # Markdown content files
├── utils/               # Utility functions
│   ├── axios.js         # Axios instance configuration
│   ├── index.js         # Utility exports
│   └── next.auth.wrapper.jsx # Auth wrapper
├── middleware.js        # Next.js middleware (auth, i18n)
└── provider.js          # React providers wrapper
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Running backend API server (configured in `.env` file)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/etrade_fe.git
   cd etrade_fe
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env.local` file based on `.env.example`:

   ```env
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1  # Adjust to your backend URL
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Build for production**

   ```bash
   npm run build
   ```

6. **Start production server**
   ```bash
   npm start
   ```

### Environment Variables

| Variable               | Description                           | Example                                            |
| ---------------------- | ------------------------------------- | -------------------------------------------------- |
| `GOOGLE_CLIENT_ID`     | Google OAuth Client ID (optional)     | `your-google-client-id.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret (optional) | `your-google-client-secret`                        |
| `NEXTAUTH_SECRET`      | Secret for NextAuth.js encryption     | `your-super-secret-key`                            |
| `NEXT_PUBLIC_API_URL`  | Backend API URL                       | `http://localhost:8080/api/v1`                     |
| `NEXTAUTH_URL`         | NextAuth.js URL                       | `http://localhost:3000`                            |

## Responsive Design

The application is fully responsive and tested on:

- Mobile devices (320px+)
- Tablets (768px+)
- Desktops (1024px+)
- Large screens (1440px+)

## Security Features

- JWT-based authentication with HTTP-only cookies
- Protected routes middleware
- Secure HTTP headers
- Input validation and sanitization
- Protection against CSRF and XSS attacks
- Password hashing on backend (via API)

## Internationalization

- Supports English (en) and Vietnamese (vi)
- Language detection based on browser preference
- Manual language switcher in header
- All content stored in JSON format for easy translation
- RTL support ready (stylesheets included)

## Testing

While this project focuses on implementation, recommend adding:

- Unit tests with Jest and React Testing Library
- Integration tests with Cypress
- End-to-end testing for critical user flows

## Deployment

The application can be deployed to various platforms:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Traditional VPS** with Node.js support
- **Docker** (see deployment scripts)

### Docker Deployment

```bash
# Build the Docker image
docker build -t etrade-fe .

# Run the container
docker run -p 3000:3000 --env-file .env.production etrade-fe
```

## Development Scripts

- `npm run dev` - Start development server at http://localhost:3000
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality
- `npm run build:docker` - Build Docker image (if configured)

## Key Implementation Highlights

### State Management

- Redux Toolkit with RTK Query for efficient data fetching
- Redux Persist for maintaining state across sessions
- Modular slice organization (auth, cart, products, orders, etc.)

### Authentication Flow

- JWT access tokens stored in HTTP-only cookies
- Refresh token rotation for enhanced security
- Automatic token refresh on 401 responses
- Route protection via middleware

### Performance Optimizations

- Code splitting with Next.js dynamic imports
- Optimized image processing with Sharp
- Efficient CSS delivery with modular SCSS
- Strategic use of React.memo and useMemo/useCallback
- Proper loading states and skeleton UIs

### Internationalization

- Centralized message files for easy translation
- Locale detection and persistence
- SEO-friendly URL structure with locale prefixes
- Proper handling of RTL layouts

### Error Handling

- Global error boundaries
- Form validation with user-friendly messages
- API error interception and display
- Loading states for better UX
- Fallback UI for failed image loading

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Follow ESLint configuration
- Write meaningful commit messages
- Keep components small and focused
- Use TypeScript-like prop checking with PropTypes (if adding)
- Maintain consistent code formatting

**Note**: This README focuses on the frontend implementation. For a complete e-commerce solution, this frontend connects to a backend API service that handles business logic, data persistence, and server-side operations.
