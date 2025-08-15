import { createContext, useEffect, useState } from "react";

export const noteContext=createContext();

export function NoteProvider({children}){
   let keys=Object.keys(localStorage)
     const [notes,setNotes]=useState([])
     const addNote=(note)=>{
      if(note=='') return ;
      else{
        setNotes((prev)=>[...prev,note])
        console.log("Notes me",notes)
      }
     }
     useEffect(()=>{
        setNotes([])
        const keys=Object.keys(localStorage)
        keys.forEach(key => {
             const value=localStorage.getItem(key);
             try {
                const parsed=JSON.parse(value);
                addNote(parsed)
             } catch (e) {
                 addNote(value)
             }
        });
   },[])
     return(
        <noteContext.Provider value={{notes,addNote}}>
            {children}
        </noteContext.Provider>
     )
}