
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import './App.css';
import ContactForm from './components/ContactForm';

function App() {
  const asd = useSelector(state=>state.contact)

  return (
    <div className="App">
      <ToastContainer/>
      <h1>Phonebook</h1>
      <ContactForm/>
    </div>
  );
}

export default App;
