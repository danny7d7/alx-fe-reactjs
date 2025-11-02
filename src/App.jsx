import Header from './Header';
import MainContent from './MainContent';
import Footer from './Footer';
import UserProfile from './UserProfile';
import WelcomeMessage from './components/WelcomeMessage';

function App() {
  return (
    <>
      <Header />
      <MainContent />
      <WelcomeMessage />
      <UserProfile 
        name="Alice" 
        age={25} 
        bio="Loves hiking and photography" 
      />
      <Footer />
    </>
  );
}

export default App;
