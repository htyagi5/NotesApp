import { useContext } from "react"
import { noteContext } from "./Notes"
import { useParams } from "react-router-dom"

function Read(){

  const {notes}=useContext(noteContext)
  const {id}=useParams()
  console.log(notes)

  // const Notes=JSON.stringify(notes[id]);  
    const Notes=String(notes[id]);
    console.log("Read pe ",Notes)
     const parts=Notes.split(',');
        const Title=parts[0];
        const Content = parts.slice(1).join(',');
    const structuredNotes=Content.split("\n")
    console.log("struct==",structuredNotes)
 
  return (
    <>
      <h2>{Title}</h2>
      <div className="dashboard">
        {structuredNotes}
      </div>
    </>
  )
}

export default Read