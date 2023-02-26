import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { addContact } from '../redux/contactSlice'

const ContactForm = () => {
    const dispatch=useDispatch()
    const contacts= useSelector(state=>state.contact.contacts)
    console.log(contacts)
  return (
    <>
      <Formik
        initialValues={{ name: "", number: "" }}
        onSubmit={(values, { resetForm }) => {
          if (
            contacts.find(
              (contact) =>
                contact.name.toLowerCase() === values.name.toLocaleLowerCase()
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
            id: Math.ceil(Math.random() * 10000),
          };
          dispatch(addContact(item));
          resetForm();
        }}
      >
        <Form>
          <label htmlFor="name">Name</label>
          <Field
            type="text"
            name="name"
            id="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Ad yalnızca harf, kesme işareti, kısa çizgi ve boşluk içerebilir. Örneğin Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <label htmlFor="number">Number</label>
          <Field
            type="tel"
            name="number"
            id="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Telefon numarası rakam olmalı ve boşluk, tire, parantez içerebilir ve + ile başlayabilir"
            required
          />
          <button type='submit'>
            Kişi Ekle
          </button>
        </Form>
      </Formik>
    </>
  );
}

export default ContactForm