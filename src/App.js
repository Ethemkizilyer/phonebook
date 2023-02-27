import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "./App.css";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";
import { editContact, modalOpen } from "./redux/contactSlice";
import style from "./components/Components.module.css";

function App() {
  const dispatch = useDispatch();
  const { isOpen, contacts, editId } = useSelector((state) => state.contact);

  const edit = () => {
    const asd = editId && contacts.filter((contact) => contact.id === editId);

    return asd;
  };
  const contactall = () => {
    const asd = editId && contacts.filter((contact) => contact.id !== editId);

    return asd;
  };

  return (
    <div className="App">
      <ToastContainer />
      <h1>Telefon Rehberi</h1>
      <div className={style.main}>
        <div>
          <ContactForm />
        </div>
        <div>
          <h2>Kişiler</h2>
          <Filter />
          <ContactList />
        </div>
      </div>
      {isOpen && (
        <div className={style.modalwrapper}>
          <div className={style.modal}>
            <div className={style.modalcontent}>
              <span
                className={style.close}
                onClick={() => dispatch(modalOpen())}
              >
                &times;
              </span>
              <Formik
                initialValues={{
                  name: edit()[0].name,
                  number: edit()[0].number,
                }}
                onSubmit={(values, { resetForm }) => {
                  if (
                    contactall().find(
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
                  dispatch(modalOpen());
                  dispatch(editContact(item));
                  resetForm();
                }}
              >
                <Form className={style.form}>
                  <label htmlFor="name">İsim</label>
                  <Field
                    className={style.input}
                    type="text"
                    name="name"
                    id="name"
                    pattern="^[a-zA-ZğüşıöçĞÜŞİÖÇ]+(([' -][a-zA-ZğüşıöçĞÜŞİÖÇ ])?[a-zA-ZğüşıöçĞÜŞİÖÇ]*)*$"
                    title="Ad yalnızca harf, kesme işareti, kısa çizgi ve boşluk içerebilir. Örneğin Charles de Batz de Castelmore d'Artagnan"
                    required
                  />
                  <label htmlFor="number" className={style.label}>
                    Telefon Numarası
                  </label>
                  <Field
                    className={style.input}
                    type="tel"
                    name="number"
                    id="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Telefon numarası rakam olmalı ve boşluk, tire, parantez içerebilir ve + ile başlayabilir"
                    required
                  />
                  <button type="submit" className={style.button}>
                    Kaydet
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
