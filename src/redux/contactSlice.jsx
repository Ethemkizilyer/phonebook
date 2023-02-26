import { createSlice } from "@reduxjs/toolkit";

const contactSlice=createSlice({
    name:"contact",
    initialState:{
        contacts:[],
        filter:""
    },
    reducers:{
        addContact(state,{payload}){
            state.contacts.unshift(payload)
        },
        removeContact(state,{payload}){
            state.contacts=state.contacts.filter(contact=>contact.id!== payload)
        },
        changeFilter(state,{payload}){
            state.filter=payload;
        }
    }
})

export const { addContact,removeContact,changeFilter} = contactSlice.actions

export default contactSlice.reducer