
import { useSelector } from 'react-redux';
import './App.css';

function App() {
  const asd = useSelector(state=>state.contact)

  return (
    <div className="App">
      <h1>Phonebook</h1>
    </div>
  );
}

export default App;
