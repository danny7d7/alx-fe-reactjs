import Search from "./components/Search.jsx";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>GitHub User Search</h1>
        <p>Search for GitHub users and explore their profiles</p>
      </header>

      <main className="app-main">
        <Search />
        <div className="results-container"></div>
      </main>
    </div>
  );
}

export default App;
