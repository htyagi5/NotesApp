import {  useContext, useRef, useState } from "react";
import { noteContext } from "./Notes";
function Writing(){
  const [content,setContent]=useState("")
  const [title,setTitle]=useState("")
  let len=localStorage.length;
  const keya=useRef(len);
   const {addNote}=useContext(noteContext)
   const handler=(e)=>{
    e.preventDefault(); 
    localStorage.setItem(keya.current,[title,content])
    addNote(content)
    keya.current++;
    // console.log(content);
    // setContent("");
    // setTitle("");
    window.location.href = '/';
   }
    return (
        <>
        <h2>Notes</h2>
      <div className='content' >
      {/* <div className='content' style={{marginLeft:"110px"}}> */}
        <input className="title" placeholder="Title" type="text" value={title} onChange={(e)=>setTitle(e.target.value)} />
        <textarea name="content" placeholder='write your notes ....' value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
        <button className="save" type='submit' onClick={handler}>Save</button>
      </div>
        </>
    )
}
export default Writing