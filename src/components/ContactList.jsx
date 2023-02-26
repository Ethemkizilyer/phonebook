import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {FcPhone} from "react-icons/fc"
import { editContact, editId, modalOpen, removeContact } from '../redux/contactSlice'

const ContactList = () => {

    const dispatch = useDispatch();
    const { isOpen, contacts, filter } = useSelector((state) => state.contact);

  const getFilteredContacts = (contacts, filter) => {
    return contacts.filter((contact) =>
      contact?.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  const filteredContacts = getFilteredContacts(contacts, filter);
  
  return (
    <ul>
      {filteredContacts.map((contact) => (
        <li key={contact.id} id={contact.id}>
          <div>
            <FcPhone />
            <p>{contact.name + ": " + contact.number}</p>
          </div>
          <button
            type="button"
            onClick={() => dispatch(removeContact(contact.id))}
          >
            Sil
          </button>
          <button
           
            onClick={() => {
              dispatch(editId(contact.id))
              return dispatch(modalOpen());
            }}
          >
            Düzenle
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList