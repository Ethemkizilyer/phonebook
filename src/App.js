
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import './App.css';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';

function App() {
  const asd = useSelector(state=>state.contact)

  return (
    <div className="App">
      <ToastContainer/>
      <h1>Telefon Rehberi</h1>
      <ContactForm/>
      <h2>Kişiler</h2>
      <Filter/>
      <ContactList/>
    </div>
  );
}

export default App;
