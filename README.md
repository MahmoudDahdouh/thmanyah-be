# 🎙️ Thmanyah Podcast Search API

A high-performance REST API built with NestJS that searches podcasts from the iTunes API, stores them in PostgreSQL, and returns enriched results with full metadata.

## 📋 Table of Contents

- [Introduction](#📜-introduction)
- [Setup](#🛠️-setup)
- [API Endpoints](#🔌-api-endpoints)
- [Technologies](#💻-technologies)

## 📜 Introduction

Thmanyah Backend is a podcast search and storage system that integrates with the iTunes Search API.

## 🛠️ Setup

To get started with this project, follow these steps:

1. **Clone the repository:**  
   Run the following command to clone the repository to your local machine:

   ```bash
   git clone https://github.com/MahmoudDahdouh/thmanyah-be.git
   ```

2. **Install dependencies:**  
   Navigate to the project directory and run the following command to install the project dependencies:

   ```bash
   npm install
   ```

3. **Configure `.env` file:**  
   Create a `.env` file based on `.env.example` and add the necessary variables:

   ```bash
   PORT=3001
   NODE_ENV=development

   # Database
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=your_password
   DB_NAME=thmanyah_db
   DB_SSL=true
   ```

4. **Build the application:**

   ```bash
   npm run build
   ```

5. **Create database tables:**

   ```bash
   npm run db:create
   ```

6. **Run the application in development mode:**

   ```bash
   npm run start:dev
   ```

   The API will be available at `http://localhost:3001`

## 🔌 API Endpoints

### Search Podcasts and Episodes

```http
GET /api/v1/search?q={searchTerm}
```

**Query Parameters:**

- `q` (required): Search term (1-128 characters, automatically trimmed)

**Response:**

```json
{
  "podcasts": [
    {
      "trackId": 123456789,
      "trackName": "فنجان",
      "artistName": "ثمانية",
      "collectionName": "فنجان مع عبدالرحمن أبومالح",
      "feedUrl": "https://...",
      "artworkUrl600": "https://...",
      "releaseDate": "2024-01-01T00:00:00.000Z",
      "country": "SAU",
      "primaryGenreName": "Society & Culture",
      "genres": [{ "genreId": "1324", "name": "Society & Culture" }]
    }
  ],
  "episodes": [
    {
      "trackId": 987654321,
      "trackName": "Episode Title",
      "collectionName": "فنجان",
      "releaseDate": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

**Example Request:**

```bash
curl "http://localhost:3001/api/v1/search?q=فنجان"
```

## 💻 Technologies

- 🖥️ **Framework**: NestJS 11.x with TypeScript
- 🚀 **Server**: Fastify (high-performance alternative to Express)
- 📦 **Database**: PostgreSQL with JSONB support
- 🔧 **ORM**: TypeORM 0.3.x
- ✅ **Validation**: class-validator & class-transformer
- 🌐 **HTTP Client**: Axios for iTunes API integration
- 🔐 **Configuration**: @nestjs/config with environment variables
- 📝 **Code Quality**: ESLint, Prettier, Husky for git hooks

---

Built with ❤️ by [Mahmoud Dahdouh](https://github.com/MahmoudDahdouh)
