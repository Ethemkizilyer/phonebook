import { createSlice } from "@reduxjs/toolkit";

const contactSlice=createSlice({
    name:"contact",
    initialState:{
        contacts:[],
        filter:"",
        isOpen:false,
        editId:""
    },
    reducers:{
        addContact(state,{payload}){
            state.contacts.unshift(payload)
        },
        removeContact(state,{payload}){
            state.contacts=state.contacts.filter(contact=>contact.id!== payload)
        },
        editContact(state,{payload}){
            console.log(payload)
           state.contacts.map(
             (contact) =>{
             if(contact.id == payload.id){ 
                contact.id = payload.id
                contact.name=payload.name 
                contact.number=payload.number}

             }
           );
        },
        changeFilter(state,{payload}){
            state.filter=payload;
        },
        editId(state,{payload}){
            state.editId=payload;
        },
        modalOpen(state){
            state.isOpen = !state.isOpen;
        }
    }
})

export const {
  addContact,
  removeContact,
  changeFilter,
  modalOpen,
  editContact,
  editId,
} = contactSlice.actions;

export default contactSlice.reducer