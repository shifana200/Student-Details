import { createSlice } from "@reduxjs/toolkit";
const todos=[]


function listSlice =createSlice({
    name:'to-do list',
    initialState:{value:[]},
    reducers:{
        adding:return [...todos] ,
    }
})

const {adding} = listSlice.reducers;
export default listSlice;