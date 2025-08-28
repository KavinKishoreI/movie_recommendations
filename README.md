# 🎬 Movie Finder App

A simple React application that helps you discover and search for movies using [The Movie Database (TMDb)](https://www.themoviedb.org/) API.  
You can search movies by title or keywords, view posters, ratings, release year, and language in an elegant UI.

---

## 🚀 Features
- Search movies by keywords (supports OR logic between multiple words).
- Browse trending/discovered movies by default.
- View movie details such as:
  - Poster
  - Title
  - Rating
  - Release Year
  - Original Language
- Smooth search with debounced input.

---

## 🛠️ Getting Started

Run the following commands in your terminal:

```bash
# Clone the repository
git clone <your-repo-url>
cd <your-repo-folder>

# Install dependencies
npm install

# Create environment file with your TMDb API key
echo "VITE_TMDB_API_KEY=your_api_key_here" > .env.local

# Start development server
npm run dev
