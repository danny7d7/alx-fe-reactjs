import { useState } from "react";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Search functionality will be implemented in next steps
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>GitHub User Search</h1>
        <p>Search for GitHub users and explore their profiles</p>
      </header>

      <main className="app-main">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            className="search-input"
            placeholder="Enter GitHub username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>

        <div className="results-container">
          {/* Search results will be displayed here */}
        </div>
      </main>
    </div>
  );
}

export default App;
