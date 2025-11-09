import Header from "./Header.jsx";
import MainContent from "./MainContent.jsx";
import Footer from "./Footer.jsx";
import UserProfile from "./UserProfile.jsx";
import Counter from "Counter.jsx";  // ← THIS LINE

function App() {
  return (
    <>
      <Header />
      <MainContent />
      <UserProfile name="Danny" age={20} bio="Junior Front-end dev" />
      <Footer />
      <Counter />
    </>
  );
}

export default App;
