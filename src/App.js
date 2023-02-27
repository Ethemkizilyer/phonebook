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
import { useEffect, useState } from "react";
import axios from "axios";
import { FcPhone } from "react-icons/fc";

function App() {
  const [test, setTest] = useState({ name: "", number: "" });
  const [toplu, setToplu] = useState();
  const [open, setOpen] = useState(false);
  const [nam, setNam] = useState();
  const [filter, setFilter] = useState("");
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

  const getApi = async () => {
    try {
      const response = await axios.get(
        "https://63878fb8d9b24b1be3f44043.mockapi.io/users"
      );
      const users = response.data;
      setToplu(users);
      return users;
    } catch (error) {
      console.log(error.message);
    }
  };

  const postApi = async () => {
    try {
      const isDuplicate = toplu?.some(
        (user) =>
          user.name.toLocaleLowerCase() == test.name.toLocaleLowerCase() ||
          user.number == test.number
      );

      if (isDuplicate) {
        toast.info(`${test.name} is already in your contacts.`, {
          position: toast.POSITION.TOP_CENTER,
          theme: "colored",
        });
      } else if (test.name !== "" && test.number !== "" && !isDuplicate) {
        const response = await axios.post(
          "https://63878fb8d9b24b1be3f44043.mockapi.io/users",
          test
        );
        const data = response.data;

        setTest({ name: "", number: "" });
      }

      getApi();
    } catch (error) {
      console.log(error.message);
    }
  };

  const putApi = async (item, id) => {
    try {
      await axios.put(
        `https://63878fb8d9b24b1be3f44043.mockapi.io/users/${id}`,
        item
      );

      getApi();
    } catch (error) {
      console.log(error.message);
    }
  };
  const deleteApi = async (id) => {
    try {
      await axios.delete(
        `https://63878fb8d9b24b1be3f44043.mockapi.io/users/${id}`
      );

      getApi();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  const aç = (id) => {
    setNam(toplu.filter((item) => item.id == id));
    setOpen(!open);
    open && putApi(id);
  };

  const getFilteredContacts = (toplu, filter) => {
    return toplu?.filter((contact) =>
      contact?.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  const filteredContacts = getFilteredContacts(toplu, filter);

  return (
    <div className="App">
      <ToastContainer />
      <div>
        <h1 style={{ display: "inline-block", marginTop: "2rem" }}>
          {" "}
          Telefon Rehberi
        </h1>
        <h3 style={{ display: "inline" }}>(Axios)</h3>
        <div className={style.main}>
          <div>
            <div className={style.form}>
              <label htmlFor="" className={style.label}>
                Ad
              </label>
              <input
                className={style.input}
                type="text"
                value={test.name}
                onChange={(e) => setTest({ ...test, name: e.target.value })}
              />
              <label htmlFor="" className={style.label}>
                Number
              </label>
              <input
                className={style.input}
                type="number"
                value={test.number}
                onChange={(e) => setTest({ ...test, number: e.target.value })}
              />
              <button onClick={postApi} className={style.button}>
                Kişi Ekle
              </button>
            </div>
          </div>
          <div>
            <h2>Kişiler</h2>
            <label htmlFor="filter" className={style.filterLabel}>
              Kişi Ara
              <input
                className={style.filterInput}
                onChange={(e) => setFilter(e.target.value)}
                type="text"
                name="filter"
                id="filter"
                value={filter}
                pattern="^[a-zA-ZğüşıöçĞÜŞİÖÇ]+(([' -][a-zA-ZğüşıöçĞÜŞİÖÇ ])?[a-zA-ZğüşıöçĞÜŞİÖÇ]*)*$"
              ></input>{" "}
            </label>
            <ul className={style.contactListWrapper}>
              {filteredContacts?.length ? (
                filteredContacts?.map((item) => (
                  <li
                    className={style.listItem}
                    key={item.id}
                  >
                    <div className={style.container}>
                      <FcPhone />
                      <p className={style.p1}>{item.name + ": "}</p>
                      <p className={style.p2}>{item.number}</p>
                    </div>
                    <div className={style.buttons}>
                      <button
                        className={style.buttonedit}
                        onClick={() => aç(item.id)}
                      >
                        {open ? "Kaydet" : "Düzenle"}{" "}
                      </button>
                      <button
                        className={style.buttonc}
                        onClick={() => deleteApi(item.id)}
                      >
                        Sil{" "}
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <p>Rehberiniz Boş</p>
              )}
            </ul>
          </div>
        </div>

        {open && (
          <div className={style.modalwrapper}>
            <div className={style.modal}>
              <div className={style.modalcontent}>
                <span className={style.close} onClick={() => setOpen(!open)}>
                  &times;
                </span>
                <Formik
                  initialValues={{
                    name: nam[0].name,
                    number: nam[0].number,
                    id: nam[0].id,
                  }}
                  onSubmit={(values, { resetForm }) => {
                    if (
                      toplu.find(
                        (contact) =>
                          contact.name.toLowerCase() ===
                          values.name.toLocaleLowerCase()
                      )
                    ) {
                      toast.info(
                        `${values.name} is already in your contacts.`,
                        {
                          position: toast.POSITION.TOP_CENTER,
                          theme: "colored",
                        }
                      );
                      resetForm();
                      return "";
                    }
                    const item = {
                      ...values,
                    };
                    putApi(item, item.id);
                    setOpen(!open);
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
      <h1 style={{ display: "inline-block", marginTop: "10rem" }}>
        {" "}
        Telefon Rehberi
      </h1>
      <h3 style={{ display: "inline" }}>(React Persist)</h3>
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
