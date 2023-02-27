import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { FcPhone } from "react-icons/fc";
import {
  editId,
  modalOpen,
  removeContact,
} from "../redux/contactSlice";
import style from "./Components.module.css";

const ContactList = () => {
  const dispatch = useDispatch();
  const { contacts, filter } = useSelector((state) => state.contact);

  const getFilteredContacts = (contacts, filter) => {
    return contacts.filter((contact) =>
      contact?.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  const filteredContacts = getFilteredContacts(contacts, filter);

  return (
    <ul className={style.contactListWrapper}>
      {filteredContacts.map((contact) => (
        <li key={contact.id} id={contact.id} className={style.listItem}>
          <div className={style.container}>
            <FcPhone />
            <p className={style.p1}>{contact.name + ": "}</p>
            <p className={style.p2}>{contact.number}</p>
          </div>
          <div className={style.buttons}>
            <button
              className={style.buttonc}
              type="button"
              onClick={() => dispatch(removeContact(contact.id))}
            >
              Sil
            </button>
            <button
              className={style.buttonedit}
              onClick={() => {
                dispatch(editId(contact.id));
                return dispatch(modalOpen());
              }}
            >
              Düzenle
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
