# Card Dispute - Chargeback Management Webapp

A comprehensive web application for managing chargeback disputes from Stripe and PayPal payment processors.

## 🚀 Features

- **User Authentication**: Secure login system with JWT tokens
- **Dashboard**: Real-time view of all chargeback disputes
- **Dispute Management**: View, analyze, and work on chargeback cases
- **Rebuttal System**: Create and submit rebuttals for disputes
- **API Integration**: Direct integration with Stripe and PayPal APIs
- **Case Submission**: Submit cases to payment aggregators
- **Database**: PostgreSQL database with Prisma ORM
- **Modern UI**: Material-UI based responsive interface

## 🏗️ Architecture

- **Frontend**: React.js with TypeScript, Material-UI
- **Backend**: Node.js with Express.js, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Hosting**: Docker containerization
- **Authentication**: JWT-based security

## 📋 Prerequisites

- Node.js 18+
- Docker and Docker Compose
- PostgreSQL (if running locally)
- Stripe and PayPal API credentials

## 🚀 Quick Start

### 1. Clone and Setup
```bash
git clone <repository-url>
cd card-dispute
npm install
```

### 2. Environment Configuration
Copy the environment file and configure your API keys:
```bash
cp .env.example .env
# Edit .env with your actual API keys
```

### 3. Development Mode
```bash
# Start both frontend and backend
npm run dev

# Or start individually
npm run dev:backend  # Backend on port 3001
npm run dev:frontend # Frontend on port 3000
```

### 4. Docker Deployment
```bash
# Build and start all services
npm run docker:build
npm run docker:up

# Stop services
npm run docker:down
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/card_dispute"
JWT_SECRET="your-secret-key"
STRIPE_SECRET_KEY="sk_test_..."
PAYPAL_CLIENT_ID="your-paypal-client-id"
PAYPAL_CLIENT_SECRET="your-paypal-secret"
```

#### Frontend (.env)
```bash
REACT_APP_API_URL="http://localhost:3001"
REACT_APP_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/login` - User authentication

### Disputes
- `GET /api/disputes` - Retrieve all disputes
- `GET /api/disputes/:id` - Get specific dispute
- `POST /api/disputes/sync` - Sync disputes from payment processors

### Rebuttals
- `POST /api/rebuttals` - Create new rebuttal
- `PUT /api/rebuttals/:id` - Update rebuttal
- `POST /api/rebuttals/:id/submit` - Submit rebuttal

## 🗄️ Database Schema

The application uses Prisma with the following main models:

- **User**: Authentication and user management
- **Dispute**: Chargeback dispute information
- **Rebuttal**: Dispute rebuttal documents

## 🐳 Docker

The application is containerized with Docker:

- **PostgreSQL**: Database service
- **Backend**: Node.js API service
- **Frontend**: Nginx-served React app

## 🔒 Security Features

- JWT-based authentication
- Rate limiting
- CORS protection
- Helmet security headers
- Input validation

## 📱 User Interface

- Responsive Material-UI design
- Real-time data updates
- Intuitive dispute management
- Mobile-friendly interface

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Docker Production
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For support and questions, please open an issue in the repository.

## 🔄 Roadmap

- [ ] Advanced dispute analytics
- [ ] Automated rebuttal suggestions
- [ ] Multi-language support
- [ ] Advanced reporting
- [ ] Mobile app
