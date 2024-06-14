import './App.css'
import Title from './components/Title'
import Inventory from './controllers/Searchbar'
import Footer from './components/Footer'

function App() {

  return (
    <main className="min-h-screen flex flex-col">
    <Title />
    <div className="flex-grow">
      <Inventory />
    </div>
    <Footer />
  </main>
);
}

export default App;