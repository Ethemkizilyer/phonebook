import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    contacts: [],
    filter: "",
    isOpen: false,
    editId: "",
  },
  reducers: {
    addContact(state, { payload }) {
      const we = state.contacts?.filter(
        (contact) =>
          contact.number === payload.number ||
          contact.name.toLocaleLowerCase() === payload.name.toLocaleLowerCase()
      );

      if (we?.length > 0) {
        toast.info(
          `Kişilerinizde zaten ${we[0].name} adıyla kayıtlı ${we[0].number} tel numarası var.`,
          {
            position: toast.POSITION.TOP_CENTER,
            theme: "colored",
          }
        );
      } else {
        state.contacts.unshift(payload);
      }
    },
    removeContact(state, { payload }) {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== payload
      );
    },
    editContact(state, { payload }) {
      state.contacts.map((contact) => {
        if (contact.id === payload.id) {
          contact.id = payload.id;
          contact.name = payload.name;
          contact.number = payload.number;
        }
      });
    },
    changeFilter(state, { payload }) {
      state.filter = payload;
    },
    editId(state, { payload }) {
      state.editId = payload;
    },
    modalOpen(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const {
  addContact,
  removeContact,
  changeFilter,
  modalOpen,
  editContact,
  editId,
} = contactSlice.actions;

export default contactSlice.reducer;
