import './App.css'
import Title from './components/Title'
import Inventory from './controllers/Searchbar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <main className="min-h-screen flex flex-col">
    <Title />
    <div className="flex-grow">
      <Inventory />
    </div>
    <Footer />
    <ToastContainer />
  </main>
);
}

export default App;