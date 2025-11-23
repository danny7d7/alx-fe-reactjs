import { useState } from "react";
import { fetchUserData } from "../services/githubService";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      return;
    }

    setLoading(true);
    setError(null);
    setUserData(null);

    try {
      const data = await fetchUserData(searchQuery);
      setUserData(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Enter GitHub username..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      <div className="results-container">
        {loading && (
          <div className="loading-message">
            <p>Loading...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>Looks like we can't find the user</p>
          </div>
        )}

        {userData && !loading && !error && (
          <div className="user-card">
            <img
              src={userData.avatar_url}
              alt={`${userData.name || userData.login} Avatar`}
              className="user-avatar"
            />

            <div className="user-info">
              <h2 className="user-name">{userData.name || userData.login}</h2>
              <p className="user-username">{userData.login}</p>
              <a
                href={userData.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="user-link"
              >
                View GitHub Profile →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
