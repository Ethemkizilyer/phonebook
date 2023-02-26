
import { Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import './App.css';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import { editContact, modalOpen } from './redux/contactSlice';

function App() {
  const dispatch=useDispatch()
  const { isOpen, contacts, editId } = useSelector((state) => state.contact);

  const edit=()=>{
     const asd= editId && contacts.filter(contact=>contact.id==editId)
    
    return asd
  }

console.log(edit())
  return (
    <div className="App">
      <ToastContainer />
      <h1>Telefon Rehberi</h1>
      <ContactForm />
      <h2>Kişiler</h2>
      <Filter />
      <ContactList />
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close"
              onClick={() => dispatch(modalOpen())}
            >
              &times;
            </span>
            <Formik
              initialValues={{ name: edit()[0].name, number: edit()[0].number }}
              onSubmit={(values, { resetForm }) => {
                if (
                  contacts.find(
                    (contact) =>
                      contact.name.toLowerCase() ===
                      values.name.toLocaleLowerCase()
                  )
                ) {
                  toast.info(`${values.name} is already in your contacts.`, {
                    position: toast.POSITION.TOP_CENTER,
                    theme: "colored",
                  });
                  resetForm();
                  return "";
                }
                const item = {
                  ...values,
                  id: edit()[0].id,
                };
dispatch(modalOpen())
                dispatch(editContact(item));
                resetForm();
              }}
            >
              <Form>
                <label htmlFor="name">İsim</label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  pattern="^[a-zA-ZğüşıöçĞÜŞİÖÇ]+(([' -][a-zA-ZğüşıöçĞÜŞİÖÇ ])?[a-zA-ZğüşıöçĞÜŞİÖÇ]*)*$"
                  title="Ad yalnızca harf, kesme işareti, kısa çizgi ve boşluk içerebilir. Örneğin Charles de Batz de Castelmore d'Artagnan"
                  required
                />
                <label htmlFor="number">Telefon Numarası</label>
                <Field
                  type="tel"
                  name="number"
                  id="number"
                  pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                  title="Telefon numarası rakam olmalı ve boşluk, tire, parantez içerebilir ve + ile başlayabilir"
                  required
                />
                <button type="submit">Kişi Ekle</button>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
