import Header from "./components/Header.jsx";
import MainContent from "./components/MainContent.jsx";
import Footer from "./components/Footer.jsx";
import UserProfile from "./components/UserProfile.jsx";
import Counter from "./components/Counter";

function App() {
  return (
    <>
      <Header />
      <MainContent />
      <UserProfile name="Danny" age={20} bio="Junior Front-end dev 💻" />
      <Footer />
      <Counter />
    </>
  );
}

export default App;
