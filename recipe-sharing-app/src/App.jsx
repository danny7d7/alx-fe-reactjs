import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect } from "react";
import useRecipeStore from "./store/recipeStore";
import RecipeList from "./components/RecipeList";
import AddRecipeForm from "./components/AddRecipeForm";
import RecipeDetails from "./components/RecipeDetails";
import EditRecipeForm from "./components/EditRecipeForm";
import SearchBar from "./components/SearchBar";
import FavoritesList from "./components/FavoritesList";
import RecommendationsList from "./components/RecommendationsList";
import "./App.css";

function App() {
  const generateRecommendations = useRecipeStore(
    (state) => state.generateRecommendations
  );

  // Generate recommendations when the app loads
  useEffect(() => {
    generateRecommendations();
  }, [generateRecommendations]);

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <div className="header-content">
            <h1 className="app-title">
              <Link to="/" className="app-title-link">
                Recipe Sharing
              </Link>
            </h1>
            <nav className="nav-links">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/add" className="nav-link">
                Add Recipe
              </Link>
              <Link to="/favorites" className="nav-link">
                Favorites
              </Link>
            </nav>
          </div>
        </header>

        <main className="app-main">
          <Routes>
            <Route
              path="/"
              element={
                <div className="home-container">
                  <div className="search-container">
                    <SearchBar />
                  </div>
                  <RecommendationsList />
                  <RecipeList />
                </div>
              }
            />
            <Route path="/add" element={<AddRecipeForm />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/edit/:id" element={<EditRecipeForm />} />
            <Route
              path="/favorites"
              element={
                <div className="favorites-container">
                  <FavoritesList />
                </div>
              }
            />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>
            &copy; {new Date().getFullYear()} Recipe Sharing App. All rights
            reserved.
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
