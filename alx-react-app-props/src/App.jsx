import Header from "./Header.jsx";
import MainContent from "./MainContent.jsx";
import Footer from "./Footer.jsx";
import UserContext from "./UserContext.js";
import ProfilePage from "./ProfilePage";

function App() {
  const userData = { name: "Danny", email: "danny0988lewis@gmail.com" };

  return (
    <UserContext.Provider value={userData}>
      <ProfilePage />
      <Header />
      <MainContent />
      <Footer />
    </UserContext.Provider>
  );
}

export default App;
