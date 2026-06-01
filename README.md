# ReviewHub — Meta Ray-Ban Smart Glasses Review Intelligence Platform

> **Tagline:** *"Every Voice. Every Signal. Every Insight."*
>
> **Admin Dashboard:** ReviewHub Command Center
>
> **Analyst Panel:** ReviewHub Insights Studio

A full-stack review intelligence platform that ingests, analyzes, and visualizes **10,000+ Amazon reviews** for Meta Ray-Ban Smart Glasses. The backend provides RESTful APIs for CRUD operations, advanced filtering, pagination, analytics aggregation, and JWT-authenticated admin access. The frontend (Phase 2) will surface these insights through interactive dashboards.

**Brand Colors:** Deep Navy `#0A0F1E` · Electric Blue `#2563EB` · Signal White `#F8FAFC` · Amber Alert `#F59E0B`

---

## Table of Contents

- [Dataset Summary](#dataset-summary)
- [Features at a Glance](#features-at-a-glance)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Database Schema](#database-schema)
- [Backend Setup](#backend-setup)
- [Architecture](#architecture)
- [API Endpoints](#api-endpoints)
- [Authentication Flow](#authentication-flow)
- [Error Response Format](#error-response-format)
- [Good-to-Have Features](#good-to-have-features)
- [Postman Testing](#postman-testing)
- [Seeding the Database](#seeding-the-database)
- [Testing](#testing)
- [Frontend (Phase 2)](#frontend-phase-2)
- [Git Workflow](#git-workflow)
- [License](#license)

---

## Dataset Summary

The dataset contains **10,000 Amazon reviews** for Meta Ray-Ban Smart Glasses across **35 unique reviewer profiles** with intentional duplication to simulate real-world review score drift over time.

| Attribute | Details |
|---|---|
| **Total Records** | 10,000 |
| **Unique Reviewers** | 35 |
| **Rating Distribution** | 1★ (294) · 3★ (1,423) · 4★ (3,380) · 5★ (4,903) |
| **Sentiment Split** | 82.8% Positive · 17.2% Negative |
| **Reviews with Images** | 1,158 of 10,000 |

**Assumption:** The 10,000-record dataset contains intentional duplicates of 35 base reviews with varied `helpful_aug` and `helpfulness_score` values — each row is treated as a standalone document in MongoDB.

---

## Features at a Glance

### Backend (Complete)

| Feature | Status |
|---|---|
| Express.js server on port 5000 | ✓ |
| MongoDB connection with retry logic | ✓ |
| Mongoose schemas (Review + User) with validation | ✓ |
| 10,000-record dataset seeding with data transformation | ✓ |
| Review CRUD (Create, Read, Update, Soft Delete) | ✓ |
| JWT authentication (register, login, token verification) | ✓ |
| Role-based access control (admin, analyst) | ✓ |
| Dynamic filtering (rating, sentiment, date range, country, name, hasImage) | ✓ |
| Sorting (date, rating, helpfulness_score, helpful_aug) | ✓ |
| Full-text search on title + review | ✓ |
| Pagination with metadata (page, limit, total, totalPages, hasNext, hasPrev) | ✓ |
| 7 MongoDB aggregation pipelines (analytics) | ✓ |
| Rate limiting (100 req / 15 min per IP) | ✓ |
| Request logging middleware | ✓ |
| Global error handling with consistent error format | ✓ |
| CORS configuration | ✓ |
| 41 comprehensive tests (Jest + Supertest) | ✓ |
| Postman collection with auto-token capture | ✓ |
| 18 of 20 "Good-to-Have" features implemented | ✓ |

### Frontend (Phase 2)

| Feature | Status |
|---|---|
| React + Vite project setup | — |
| Tailwind CSS + MUI | — |
| Redux Toolkit state management | — |
| Login/Register auth UI | — |
| Dashboard layout (sidebar, navbar, dark mode) | — |
| Analytics dashboard with Recharts | — |
| Reviews list with pagination, filters, search, sort | — |
| Review CRUD forms | — |
| Admin user management | — |
| Error/loading/empty state system | — |
| SEO (Helmet, OG tags, sitemap, schema.org) | — |
| E2E integration testing | — |

---

## Project Structure

```
meta_glasses_reviews_vineet_prajapati/            # Root
├── README.md                                      # Project documentation
│
├── reviewhub-backend/                             # Backend API (Node.js + Express + MongoDB)
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js                              # MongoDB connection with retry logic
│   │   │   └── env.js                             # Environment configuration (dev/prod)
│   │   ├── controllers/
│   │   │   ├── auth.controller.js                 # Register, login, me handlers
│   │   │   ├── review.controller.js               # Review CRUD handlers
│   │   │   └── analytics.controller.js            # Analytics aggregation handlers
│   │   ├── services/
│   │   │   ├── auth.service.js                    # Auth business logic
│   │   │   ├── review.service.js                  # Review business logic
│   │   │   └── analytics.service.js               # Aggregation pipelines
│   │   ├── models/
│   │   │   ├── review.model.js                    # Review schema (15 fields)
│   │   │   └── user.model.js                      # User schema (auth)
│   │   ├── routes/
│   │   │   ├── auth.routes.js                     # POST /auth/register, /auth/login, GET /auth/me
│   │   │   ├── review.routes.js                   # CRUD + search endpoints
│   │   │   ├── analytics.routes.js                # 7 analytics endpoints
│   │   │   └── health.routes.js                   # GET /health
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js                 # JWT verification
│   │   │   ├── role.middleware.js                 # RBAC guard (admin/analyst)
│   │   │   ├── validate.middleware.js             # Joi validation runner
│   │   │   ├── logger.middleware.js               # Request logging
│   │   │   ├── error.middleware.js                # Global error handler
│   │   │   └── rateLimiter.middleware.js          # 100 req/15min per IP
│   │   ├── validators/
│   │   │   ├── auth.validator.js                  # Joi: register/login validation
│   │   │   └── review.validator.js                # Joi: review create/update validation
│   │   ├── utils/
│   │   │   ├── apiResponse.js                     # Standardized success/error responses
│   │   │   ├── asyncHandler.js                    # Centralized async error wrapper
│   │   │   ├── pagination.js                      # Reusable pagination utility
│   │   │   └── filterBuilder.js                   # Dynamic MongoDB filter builder
│   │   └── scripts/
│   │       └── seed.js                            # 10,000-record dataset seeding script
│   ├── tests/
│   │   ├── setup.js                               # Test DB setup (separate database, cleanup)
│   │   ├── auth.test.js                           # 13 auth tests
│   │   ├── review.test.js                         # 20 review tests
│   │   └── analytics.test.js                      # 8 analytics tests
│   ├── postman_collection.json                    # Complete Postman collection
│   ├── app.js                                     # Express app configuration
│   ├── server.js                                  # Server entry point
│   ├── jest.config.js                             # Jest configuration
│   ├── package.json                               # Backend dependencies
│   ├── .env                                       # Environment variables (gitignored)
│   ├── .env.example                               # Environment template
│   └── .gitignore                                 # Git ignore rules
│
└── reviewhub-frontend/                            # Frontend (Phase 2 — coming)
```

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Runtime** | Node.js 22.x | JavaScript runtime |
| **Framework** | Express.js 5.2.1 | HTTP server and routing |
| **Database** | MongoDB 9.6+ | NoSQL document store |
| **ODM** | Mongoose 9.6.2 | Schema modeling and validation |
| **Authentication** | JWT (jsonwebtoken) + bcrypt 6.x | Token-based auth with password hashing (12 rounds) |
| **Validation** | Joi | Schema-based input validation |
| **Rate Limiting** | express-rate-limit 8.x | 100 requests / 15 min per IP |
| **Testing** | Jest 30.x + Supertest 7.x | API integration testing |
| **Utilities** | dotenv, cors | Environment config, cross-origin support |

---

## Database Schema

### Reviews Collection (10,000 documents)

The `Review` schema stores all 15 fields from the dataset plus system timestamps and soft-delete support:

| Field | Type | Constraints | Indexed |
|---|---|---|---|
| `reviewID` | String | Required | ✓ |
| `name` | String | Required, trimmed | ✓ |
| `date` | Date | Required — parsed from "March 9, 2025" | ✓ |
| `verifiedPurchase` | Boolean | Cast from "True"/"False" | ✗ |
| `rating` | Number | Enum: 1, 3, 4, 5 | ✓ |
| `helpful` | Number | Parsed from comma-formatted string (e.g., "1,075" → 1075) | ✗ |
| `title` | String | Trimmed, default '' | ✓ (text index with review) |
| `review` | String | Default '' | ✓ (text index with title) |
| `profile` | String | Reviewer profile URL | ✗ |
| `country` | String | Default 'United States' | ✗ |
| `reviewLink` | String | Original Amazon review URL | ✗ |
| `reviewImage` | String | Optional image URL | ✗ |
| `helpful_aug` | Number | Indexed | ✓ |
| `is_positive_review` | Number | 0 or 1 | ✓ |
| `helpfulness_score` | Number | 0.0–10.0 | ✓ |
| `isDeleted` | Boolean | Soft-delete flag, default false | ✓ |
| `createdAt` | Date | Auto timestamp (Mongoose timestamps) | ✗ |
| `updatedAt` | Date | Auto timestamp (Mongoose timestamps) | ✗ |

### Users Collection (Authentication)

| Field | Type | Constraints |
|---|---|---|
| `name` | String | Required, max 100 chars |
| `email` | String | Required, unique, lowercase, indexed |
| `password` | String | Required, min 8 chars, bcrypt hashed (12 rounds), excluded from query results |
| `role` | String | Enum: `admin`, `analyst` — default: `analyst` |
| `isActive` | Boolean | Default: true |
| `createdAt` | Date | Auto timestamp |
| `updatedAt` | Date | Auto timestamp |

### Indexing Strategy

| Collection | Field(s) | Index Type | Purpose |
|---|---|---|---|
| `reviews` | `reviewID` | Single | Frequent lookups by reviewID |
| `reviews` | `rating` | Single | Rating-based filters and aggregation |
| `reviews` | `date` | Single | Date range queries and sorting |
| `reviews` | `is_positive_review` | Single | Sentiment filtering |
| `reviews` | `helpfulness_score` | Single | Sort by helpfulness |
| `reviews` | `name` | Single | Reviewer-based filtering |
| `reviews` | `isDeleted` | Single | Exclude soft-deleted records |
| `reviews` | `title`, `review` | Text | Full-text search on review content |
| `users` | `email` | Unique | Login uniqueness guarantee |

> **Note:** `createdAt` and `updatedAt` are auto-managed via Mongoose `{ timestamps: true }`.

---

## Backend Setup

### Prerequisites

- Node.js (v18 or later)
- MongoDB (local instance or MongoDB Atlas)
- npm

### Installation

```bash
cd reviewhub-backend
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and configure:

| Variable | Description | Default |
|---|---|---|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/reviewhub` |
| `JWT_SECRET` | Secret key for JWT tokens | *(change in production)* |
| `NODE_ENV` | Environment mode (`development` / `production`) | `development` |

### Running the Server

```bash
# Development mode (with auto-reload via --watch)
npm run dev

# Production mode
npm start
```

Server starts at `http://localhost:5000`

### Health Check

```bash
curl http://localhost:5000/api/v1/health
```

Expected response:
```json
{
  "success": true,
  "message": "ReviewHub API is running",
  "timestamp": "2026-05-13T12:00:00.000Z",
  "uptime": 42.5
}
```

---

## Architecture

```
Client (React — Phase 2)
     │
     ▼
  Express Server (port 5000)
     │
     ├── Middleware Layer
     │
     ├── Routes → Controllers → Services → Models → MongoDB
     │
     └── /api/v1/health (public)
```

The backend follows an **MVC-inspired layered architecture**:

- **Models** — Define Mongoose schemas with validation, indexes, and timestamps
- **Services** — Contain all business logic (CRUD operations, auth workflows, aggregation pipelines)
- **Controllers** — Handle HTTP request/response only; delegate all logic to services
- **Routes** — Define endpoints and wire middleware chains (auth → role → validate → controller)
- **Middlewares** — Handle cross-cutting concerns (JWT auth, RBAC, input validation, error handling, request logging, rate limiting)
- **Validators** — Provide Joi schema definitions for input validation
- **Utils** — Provide reusable helpers (pagination, response formatting, filter building, async error handling)

### Middleware Chain

```
Request
  └─ CORS middleware
  └─ Rate Limiter (100 req/15min per IP)
  └─ JSON Body Parser (built-in Express)
  └─ Logger (method, URL, IP, timestamp)
  └─ authMiddleware (JWT verify) ← on protected routes
  └─ roleMiddleware (admin/analyst check) ← on role-restricted routes
  └─ validateMiddleware (Joi schema validation)
  └─ Controller (delegates to Service)
  └─ asyncHandler wrapper (catches errors, forwards to global error handler)
  └─ Global Error Middleware (formats consistent error response)
```

### Aggregation Pipelines

Analytics endpoints use MongoDB aggregation pipelines for real-time data analysis:

| Pipeline | Stages | Output |
|---|---|---|
| **Overview** | `$match` (isDeleted: false), `$group` with `$sum`, `$avg`, `$cond` | Total reviews, avg rating, sentiment split, image count, avg helpfulness |
| **Rating Distribution** | `$match`, `$group` by rating, `$sort` | Count per star value (1, 3, 4, 5) |
| **Sentiment Trend** | `$match`, `$group` by `$year`/`$month`, `$sort` | Positive/negative count per month |
| **Top Reviewers** | `$match`, `$group` by name with `$sum` + `$avg`, `$sort` by totalHelpfulAug, `$limit` 10 | Top 10 reviewers ranked by helpful_aug |
| **Helpfulness Distribution** | `$match`, `$bucket` (0–2, 2–4, 4–6, 6–8, 8–10) | Score distribution across 5 buckets |
| **Monthly Volume** | `$match`, `$group` by `$year`/`$month`, `$sort` | Review count grouped by month/year |
| **Image vs No Image** | `$match`, `$group` with `$cond` on reviewImage | With image vs without image counts |

---

## API Endpoints

### Authentication

| Method | Endpoint | Auth Required | Role | Description |
|---|---|---|---|---|
| POST | `/api/v1/auth/register` | No | — | Register new admin/analyst account |
| POST | `/api/v1/auth/login` | No | — | Login, receive JWT token |
| GET | `/api/v1/auth/me` | Yes | any | Get current authenticated user profile |

### Reviews

| Method | Endpoint | Auth Required | Role | Description |
|---|---|---|---|---|
| GET | `/api/v1/reviews` | Yes | any | List reviews (paginated, filtered, sorted) |
| GET | `/api/v1/reviews/:id` | Yes | any | Get single review by MongoDB `_id` |
| GET | `/api/v1/reviews/search?q=keyword` | Yes | any | Full-text search on title + review body |
| POST | `/api/v1/reviews` | Yes | admin | Create new review |
| PUT | `/api/v1/reviews/:id` | Yes | admin | Update existing review |
| DELETE | `/api/v1/reviews/:id` | Yes | admin | Soft-delete review (sets `isDeleted: true`) |

#### Query Parameters for `GET /api/v1/reviews`

| Param | Type | Description |
|---|---|---|
| `page` | Number | Page number (default: 1) |
| `limit` | Number | Records per page (default: 20, max: 100) |
| `rating` | Number | Filter by star rating (1, 3, 4, 5) |
| `is_positive_review` | Number | Filter by sentiment (0 = negative, 1 = positive) |
| `country` | String | Filter by reviewer country |
| `name` | String | Filter by reviewer name (case-insensitive regex) |
| `startDate` | String | Date range start (ISO 8601 or parseable date string) |
| `endDate` | String | Date range end (ISO 8601 or parseable date string) |
| `hasImage` | Boolean | Filter reviews with images (`true`) or without (`false`) |
| `sortBy` | String | Field to sort by (`date`, `rating`, `helpfulness_score`, `helpful_aug`) |
| `order` | String | Sort order (`asc` or `desc`) |

### Analytics

All analytics endpoints require authentication (any role).

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/analytics/overview` | Total reviews, avg rating, sentiment split, image count, avg helpfulness |
| GET | `/api/v1/analytics/rating-distribution` | Count per star rating |
| GET | `/api/v1/analytics/sentiment-trend` | Positive/negative trend grouped by month |
| GET | `/api/v1/analytics/top-reviewers` | Top 10 reviewers ranked by total helpful_aug |
| GET | `/api/v1/analytics/helpfulness-distribution` | Score buckets (0–2, 2–4, 4–6, 6–8, 8–10) |
| GET | `/api/v1/analytics/monthly-volume` | Review count grouped by month/year |
| GET | `/api/v1/analytics/image-vs-no-image` | Reviews with images vs without images |

### System

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| GET | `/api/v1/health` | No | Server + database health status |

---

## Authentication Flow

```
Registration:
  POST /api/v1/auth/register
    → Validate input (Joi: name, email, password min 8 chars, role)
    → Hash password (bcrypt, 12 salt rounds)
    → Save user to MongoDB
    → Sign JWT (payload: { userId, email, role }, expires in 7d)
    → Return { success, token, user }

Login:
  POST /api/v1/auth/login
    → Validate input (Joi: email, password)
    → Find user by email
    → Compare password with bcrypt
    → Sign JWT (payload: { userId, email, role }, expires in 7d)
    → Return { success, token, user }

Protected Route Access:
  Request with Authorization: Bearer <token>
    → authMiddleware verifies JWT
      → If valid: attaches req.user, proceeds
      → If expired: returns 401 "Token expired"
      → If invalid: returns 401 "Invalid token"
    → roleMiddleware checks req.user.role against required role
      → If authorized: proceeds
      → If unauthorized: returns 403 "Forbidden"

Token Storage (Frontend):
  → Saved to localStorage on login success
  → Auto-restored on app load via GET /auth/me
  → Cleared on logout

Roles:
  admin   → Full CRUD on reviews + analytics access + user management
  analyst → Read-only on reviews + analytics access
```

---

## Error Response Format

All API errors follow a consistent format:

```json
// Validation Error (400)
{
  "success": false,
  "message": "\"rating\" must be one of [1, 3, 4, 5]"
}

// Authentication Error (401)
{
  "success": false,
  "message": "Invalid token"
}

// Token Expired (401)
{
  "success": false,
  "message": "Token expired"
}

// Authorization Error (403)
{
  "success": false,
  "message": "Forbidden"
}

// Not Found (404)
{
  "success": false,
  "message": "Review not found"
}

// Duplicate Email (409)
{
  "success": false,
  "message": "Email already registered"
}

// Server Error (500)
{
  "success": false,
  "message": "Internal server error"
}
// In development (NODE_ENV=development), stack trace is included
```

---

## Good-to-Have Features

The following "Good to Have" checklist items have been implemented (18 of 20):

| # | Feature | Implementation |
|---|---|---|
| 1 | **API Response Standardization** | `utils/apiResponse.js` — all controllers use `sendSuccess`/`sendError` with consistent `{ success, message }` format |
| 2 | **Request Logging Middleware** | `middlewares/logger.middleware.js` — logs `[METHOD] /path — IP — timestamp` on every request |
| 3 | **Centralized Async Error Handler** | `utils/asyncHandler.js` — wraps all async controllers, eliminates repetitive try-catch blocks |
| 4 | **Environment-based Configuration** | `config/env.js` + `.env` / `.env.example` — `NODE_ENV` controls debug logging, stack traces |
| 5 | **Custom Data Validation Layer** | `validators/` — Joi schemas for auth and review data; `validate.middleware.js` runs validation |
| 6 | **Soft Delete Feature** | `isDeleted: true` flag on all delete operations; queries exclude deleted records via `$match` |
| 7 | **Timestamp Tracking System** | Mongoose `{ timestamps: true }` on all schemas — auto-managed `createdAt` + `updatedAt` |
| 8 | **Basic Rate Limiting** | `express-rate-limit` — 100 requests per 15 minutes per IP |
| 9 | **Advanced Search** | MongoDB `$text` index on `title` + `review`; dedicated `/reviews/search` endpoint |
| 10 | **Database Seeding Script** | `scripts/seed.js` — transforms and inserts all 10,000 records with type casting |
| 11 | **Reusable Pagination Utility** | `utils/pagination.js` — consistent pagination metadata across all list endpoints |
| 12 | **Dynamic Filter Builder** | `utils/filterBuilder.js` — builds MongoDB `$match` object from query parameters |
| 13 | **Role-Based Access Control** | `middlewares/role.middleware.js` — `requireRole('admin')` guard on restricted routes |
| 14 | **API Versioning Structure** | All routes under `/api/v1/` prefix for future API evolution |
| 15 | **Health Check API** | `GET /api/v1/health` — server uptime + database connection status |
| 16 | **Password Hashing (bcrypt)** | 12 salt rounds for all user passwords; `password` field excluded from query results |
| 17 | **JWT Token Expiry Handling** | Token expiry set to 7 days; `TokenExpiredError` caught and returns 401 with clear message |
| 18 | **Enhanced API Documentation in Postman** | Complete Postman collection with auto-token capture, pre-filled bodies, example queries |

---

## Postman Testing

A complete Postman collection is included at `reviewhub-backend/postman_collection.json` with:

- All endpoints organized by folder: **Health**, **Auth**, **Reviews**, **Analytics**
- Collection variables for `base_url` (default: `http://localhost:5000`) and `token`
- **Auto-capture of JWT token** on login via test script — token is automatically stored as a collection variable
- Pre-filled request bodies for register, login, and create review
- Example query parameters for paginated and filtered review requests
- Sequential folder ordering for logical test flow

**How to use:**

1. Open Postman → Import → Select `postman_collection.json`
2. Ensure `base_url` collection variable points to your server
3. Run **Auth → Register** to create a user
4. Run **Auth → Login** — the token auto-captures
5. Test all endpoints in any order

---

## Seeding the Database

```bash
cd reviewhub-backend
npm run seed
```

The seeding script (`src/scripts/seed.js`):

1. Reads the raw 10,000-record JSON dataset from `Meta-Glasses-Reviews.json`
2. Transforms each record:
   - `date`: `"March 9, 2025"` → JavaScript `Date` object
   - `rating`: `"4.0"` → `4.0` (Float)
   - `helpful`: `"1,075"` → `1075` (Integer, comma-stripped)
   - `verifiedPurchase`: `"True"` → `true` (Boolean)
   - `helpful_aug`: `"150"` → `150` (Integer)
   - `is_positive_review`: `"1"` → `1` (Integer)
   - `helpfulness_score`: `"7.5"` → `7.5` (Float)
3. Clears the existing `reviews` collection
4. Bulk inserts all transformed documents
5. Ensures all indexes are created
6. Prints a sample document for verification

---

## Testing

The backend includes a comprehensive test suite using **Jest 30.x** and **Supertest 7.x**.

### Running Tests

```bash
cd reviewhub-backend

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Test Configuration

| Setting | Value |
|---|---|
| Test environment | `node` |
| Test database | Separate `reviewhub_test` database (auto-created, auto-cleaned) |
| Timeout per test | 15 seconds |
| Force exit after suite | Yes |
| Test file pattern | `**/tests/**/*.test.js` |

The test database is configured via `tests/setup.js`:
- Before all tests: Connects to `TEST_MONGO_URI` (or `mongodb://localhost:27017/reviewhub_test`)
- After each test: Cleans all collections for isolation
- After all tests: Disconnects and drops the test database

### Test Coverage (41 tests, all passing)

| Suite | File | Test Count | Scenarios |
|---|---|---|---|
| **Auth** | `tests/auth.test.js` | **13** | Register (success, missing fields, short password, duplicate email, default role), Login (success, wrong password, non-existent email, missing fields), Get Me (valid token, no token, invalid token) |
| **Reviews** | `tests/review.test.js` | **20** | Create (admin success, analyst forbidden, invalid rating, invalid date, out-of-range score, no auth), List (pagination, rating filter, sentiment filter, name filter, image filter, sort, no auth), Get by ID (success, 404), Update (admin success, analyst forbidden, invalid rating), Delete (admin success, soft delete exclusion, analyst forbidden) |
| **Analytics** | `tests/analytics.test.js` | **8** | Overview, Rating Distribution, Sentiment Trend, Top Reviewers, Helpfulness Distribution, Monthly Volume, Image vs No Image, Auth rejection |

---

## Frontend (Phase 2)

The frontend will include:

- **React 18 + Vite** build tooling
- **Tailwind CSS** with custom brand color tokens
- **MUI** component library for UI consistency
- **Redux Toolkit** for state management (auth, reviews, analytics, UI slices)
- **Axios** API service layer with JWT interceptors
- **React Router v6** with protected routes and role-based routing
- **Recharts** for analytics visualizations (bar, line, area, pie, donut charts)
- **Formik + Yup** for form validation
- **React Helmet Async** for SEO metadata

Screens planned: Login, Register, Analytics Dashboard, Reviews List (with filters/search/sort/pagination), Review Detail, Create/Edit Review, Admin User Management, Profile, 404.

---

## Git Workflow

### Commit Conventions

```
feat:    new feature
fix:     bug fix
docs:    documentation
test:    test suite
chore:   maintenance, config
perf:    performance improvement
refactor: code restructuring
```

### Branching

- `main` — production-ready code
- Feature branches: named after the feature (e.g., `feat/auth-ui`)

### Pull Requests

Each PR includes:
- **Title:** `[Category] Brief description`
- **Description:** What was built, APIs added, key decisions

---

## License

ISC
