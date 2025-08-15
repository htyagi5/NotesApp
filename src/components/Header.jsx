import { Link, NavLink } from "react-router-dom"
function Header(){
    return(
           <div className="taskbar">
        <div className="head">
        <ul className="tskbar">
          <li><NavLink  to="/" style={{color:"white", textDecoration:"none"}}>Home</NavLink></li>
          <li><NavLink  to="/write"  style={{color:"white", textDecoration:"none"}}>Write</NavLink></li>
          <li><NavLink  to="/read"  style={{color:"white", textDecoration:"none"}}>Read</NavLink></li>
        </ul>
        </div>
  <div className="draw">
    <NavLink to="/draw">
        <button className='btn'>Draw</button>
   </NavLink> 
 </div>
      </div>
    )
}
export default Header