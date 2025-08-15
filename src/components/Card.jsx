import { useContext } from "react"
function Card({content,no,color,title}){
    const Delete=()=>{
        localStorage.removeItem(no)
    }
    return (
        <>
        <div className="card" style={{backgroundColor:color}}>
            <div className="delete">
            <button className="delbtn" onClick={Delete}>Delete</button>
            </div>
            {/* <h1>{no}{title}</h1> */}
            <h1>{title}</h1>
            <p className="preview">
                {content}
            </p>
        </div>
        </>
    )
}

export default Card