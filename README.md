# SolIndexer: Blockchain Indexing Platform on Helius
# Cryptracker : Blockchain whale alert tracker

SolIndexer is a robust blockchain indexing platform that enables developers to seamlessly integrate and index Solana blockchain data into PostgreSQL databases. By leveraging Helius webhooks, CrypTracker eliminates the complexity of managing RPC nodes, Geyser plugins, validators, or custom webhook infrastructure.

![SolIndexer Architecture](https://github.com/ketan27j/cryptracker/docs/architecture.png)

## Features

- **Simplified Blockchain Indexing**: Connect directly to your PostgreSQL database and start indexing blockchain data with minimal setup
- **Customizable Data Tracking**: Select specific data categories to track based on your application needs
- **Real-time Updates**: Leverages Helius webhooks for real-time blockchain data synchronization
- **User-friendly Interface**: Intuitive dashboard for managing database connections and indexing configurations
- **Scalable Architecture**: Designed to handle multiple users and high data throughput

## Data Indexing Categories

CrypTracker supports indexing various blockchain data categories, including:

- NFT market data (bids, listings, floor prices)
- Token pricing from multiple DEXs
- DeFi lending pool availability
- Transaction histories for specific wallets/programs
- Custom event tracking for specific programs

## Project Structure

```
CRYPTRACKER/
├── backend/                # Main backend server
├── cryptracker-web/        # Frontend web application
├── indexing-backend/       # Blockchain indexing service
├── prisma-shared/          # Shared Prisma schema and DB utilities
├── .env                    # Environment variables
├── .env.example            # Example environment configuration
├── .gitignore              # Git ignore file
├── docker-compose.yml      # Docker configuration
├── README.md               # Project documentation
```

## Technical Stack

- **Backend**: Node.js, Express
- **Frontend**: React, TypeScript
- **Database**: PostgreSQL, Prisma ORM
- **Blockchain Integration**: Helius API, Solana Web3.js
- **Authentication**: JWT, OAuth2
- **Deployment**: Docker, Kubernetes support

## Getting Started

### Prerequisites

- Node.js (v16+)
- PostgreSQL (v14+)
- Helius API key (get one at [https://helius.dev](https://helius.dev))
- Solana wallet (for submitting test transactions)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ketan27j/cryptracker.git
   cd cryptracker
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configurations
   ```

3. Install dependencies:
   ```bash
   # Install root dependencies
   npm install
   
   # Install dependencies for each package
   cd backend && npm install
   cd ../cryptracker-web && npm install
   cd ../indexing-backend && npm install
   ```

4. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development servers:
   ```bash
   # In separate terminals
   cd backend && npm run dev
   cd indexing-backend && npm run dev
   cd cryptracker-web && npm run dev
   ```

### Using Docker

Alternatively, you can use Docker to run the entire stack:

```bash
docker-compose up
```

## Configuration

### Environment Variables

Key environment variables to configure:

```
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/cryptracker

# Helius API
HELIUS_API_KEY=your_helius_api_key
HELIUS_WEBHOOK_SECRET=your_webhook_secret

# Authentication
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret

# Solana
SOLANA_NETWORK=devnet  # or mainnet-beta
```

## Usage Guide

### 1. Sign Up and Database Configuration

1. Create an account on the CrypTracker platform
2. Navigate to the "Database Configuration" section
3. Enter your PostgreSQL database credentials
4. Test and save the connection

### 2. Setting Up Data Indexing

1. Go to the "Indexing Configuration" dashboard
2. Select data categories you want to track:
   - NFT market data
   - Token pricing
   - Lending pool availability
   - Custom program events
3. Configure specific parameters for each category
4. Click "Start Indexing" to begin the process

### 3. Monitoring and Management

1. View real-time indexing status on the dashboard
2. Check synchronization logs for any issues
3. Modify indexing parameters as needed

## Development

### Architecture Overview

CrypTracker consists of three main components:

1. **Backend API Server**: Handles user authentication, database credential management, and configuration storage
2. **Indexing Backend**: Processes blockchain data from Helius webhooks and populates the user's database
3. **Web Interface**: Provides an intuitive UI for managing the platform

### Adding New Indexing Categories

To add support for new data categories:

1. Define the schema in `prisma-shared/schema.prisma`
2. Create a new indexer module in `indexing-backend/src/indexers/`
3. Implement the corresponding API endpoints in `backend/src/controllers/`
4. Add UI components in the web interface

## Testing

Run tests with:

```bash
# Run all tests
npm test

# Run specific tests
npm test -- --grep "Database Integration"
```

### Testing with Solana Devnet

To validate functionality against Solana devnet:

1. Configure your environment to use devnet
2. Run the provided test scripts:
   ```bash
   npm run test:devnet
   ```

## Deployment

### Production Deployment

For production deployment, we recommend:

1. Using Docker containers with orchestration (Kubernetes/Docker Swarm)
2. Setting up proper monitoring and alerting
3. Implementing database backups
4. Using a reverse proxy for SSL termination

Example deployment command:

```bash
# Build production images
docker-compose -f docker-compose.production.yml build

# Deploy
docker-compose -f docker-compose.production.yml up -d
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Helius](https://helius.dev) for providing the webhook infrastructure
- [Solana](https://solana.com) for the blockchain platform
- All contributors and supporters of this project