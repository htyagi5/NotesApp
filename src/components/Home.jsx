import { createContext, useContext, useState } from 'react'
import Card from './Card'
import Header from './Header'
import { noteContext } from './Notes'
import {NavLink} from'react-router-dom'
// const val=createContext()
function Home(){
  const [colors,setColors]=useState(["babypink","yellow","rgb(242, 142, 3)","springgreen","rgb(52, 221, 207)"," rgb(247, 10, 212)"])
  const {notes}=useContext(noteContext)
  //  console.log("Home pe=",notes)
    return (
            <>
      <div className="box">
       {notes.map((note,index) => {
        if(note=='') return null;
        let change=index%6;
        console.log(index,":",note,":",note[index]) 
        const parts=note.split(',');
        const Title=parts[0];
        const Content = parts.slice(1).join(',');
        return(
       <NavLink to={`/read/${index}`} key={index}>
        <Card  content={Content} no={index} color={colors[change]} title={Title} />
        </NavLink>
)})}
        
      </div>
    </>
    )
}

export default Home